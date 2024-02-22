import { IPropsTeamLeadData } from "@/interface/team-lead-report-interface";
import {
  getLeadsList,
  getStaffRpSummary,
} from "@/services/lead-report/lead-report-service";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

const useLeadReport = () => {
  const router = useRouter();
  const current_id = router.query?.lead_id; // Current Team Lead ID

  // UseStates
  const [totalAvailableRP, setTotalAvailableRP] = useState<string>("0");
  const [totalLossRP, setTotalLossRP] = useState<string>("0");
  const [totalActiveStaff, setTotalActiveStaff] = useState<string>("0");
  const [totalInhouseRP, setTotalInhouseRP] = useState<string>("0");
  const [totalCommercialRP, setTotalCommercialRP] = useState<string>("0");
  const [totalProjects, setTotalProjects] = useState<string>("0");
  const [totalClientProjects, setTotalClientProjects] = useState<string>("0");
  const [totalInhouseProjects, setTotalInhouseProjects] = useState<string>("0");
  const [totalUsedRP, setTotalUsedRP] = useState<string>("0");
  const [totalHighRiskProjects, setTotalHighRiskProjects] =
    useState<string>("0");
  const [selected, setSelected] = useState<string>("");
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [activeLeads, setActiveLeads] = useState([]);

  const handleChange = (value: any) => {
    setSelected(value);
  };
  const weeklyData = [
    { value: "2022-10-10", label: "October 10, 2022" },
    { value: "2022-10-17", label: "October 17, 2022" },
    { value: "2022-10-24", label: "October 24, 2022" },
  ];

  const { data: leadList, isLoading: leadsLoading } = useQuery<any>(
    ["getTeamLeadList"],
    async () => {
      const response = getLeadsList();
      return response;
    }
  );

  // Header Name According to selected Team Lead
  const current_page = (() => {
    const foundLead = leadList?.data?.find(
      (lead: any) => lead.id === current_id?.toString()
    );
    if ((!foundLead && current_id === undefined) || current_id === "all") {
      return "All";
    }
    return leadList?.data?.map((lead: any) => {
      if (lead.id === current_id?.toString()) {
        return lead.fullname;
      } else {
        return null;
      }
    });
  })();

  // handle change team lead
  const handleLeadsId = (id: string) => {
    router.push(`/team-leads/lead-report?lead_id=${id}`);
  };

  // for default date to be one week from now date
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 31); // currently one month
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneWeekAgo,
    to: new Date(),
  });

  // teamLeadStaffs ID based on all the team lead
  const { data: teamLeadStaffs, isLoading: teamLeadStaffsLoading } =
    useQuery<any>(["getTeamLeadStaffs", current_id], async () => {
      if (current_id === "all" || current_id === undefined) {
        const response = getLeadsList(`2`); // there is no ALL Team Lead API (will change after that api gets implemented)

        return response;
      } else {
        const response = getLeadsList(`${current_id}`);
        return response;
      }
    });

  // array of staff ID
  const staffIdArray = teamLeadStaffs?.data[0]?.staffs?.map(
    (item: any) => item?.id
  );
  const staffIdJson = JSON.stringify(staffIdArray); // Stringified Staff Array

  // Get Staff Summary Data Based on Staff ID and Date Range
  const { data: staffRpSummaryData, isLoading: staffDataLoading } =
    useQuery<any>(
      ["getStaffRpSummaryData", staffIdJson, dateRange, current_id],
      async () => {
        // if (current_id) {
        // if (current_id && current_id !== "all") {
        const response = getStaffRpSummary(
          moment(dateRange?.from).format("YYYY-MM-DD"),
          moment(dateRange?.to).format("YYYY-MM-DD"),
          JSON.parse(staffIdJson)
        );
        return response;
        // }
      }
    );

  return {
    router,
    current_id,
    oneWeekAgo,
    teamLeadStaffs,
    staffIdArray,
    staffIdJson,
    staffRpSummaryData,
    setDateRange,
    dateRange,
    totalAvailableRP,
    setTotalAvailableRP,
    totalLossRP,
    setTotalLossRP,
    totalActiveStaff,
    setTotalActiveStaff,
    totalInhouseRP,
    setTotalInhouseRP,
    totalCommercialRP,
    setTotalCommercialRP,
    totalProjects,
    setTotalProjects,
    totalClientProjects,
    setTotalClientProjects,
    totalInhouseProjects,
    setTotalInhouseProjects,
    totalUsedRP,
    setTotalUsedRP,
    totalHighRiskProjects,
    setTotalHighRiskProjects,
    setSelected,
    selected,
    dateRangeOpen,
    setDateRangeOpen,
    activeLeads,
    setActiveLeads,
    handleChange,
    weeklyData,
    leadsLoading,
    leadList,
    current_page,
    handleLeadsId,
    teamLeadStaffsLoading,
    staffDataLoading,
  };
};

export default useLeadReport;
