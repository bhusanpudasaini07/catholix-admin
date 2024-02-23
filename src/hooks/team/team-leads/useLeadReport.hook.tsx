import {
  ICountryProjectDetails,
  IPropsTeamLeadData,
} from "@/interface/team-lead-report-interface";
import {
  getLeadsList,
  getStaffRpSummary,
} from "@/services/lead-report/lead-report-service";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

interface IProject {
  id: string;
  title: string;
  code: string;
  risk_status: string;
  source: string;
  market_id: string;
  market: string;
  total_rp: string;
  total_time: string;
}

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

  // ----------------------------
  const [searchText, setSearchText] = useState("");

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

  // >> Client & In House Project RP Table according to country START <<

  // Total RP used By all Projects
  const sumTotalRp = staffRpSummaryData?.data?.projects?.reduce(
    (total: number, project: IProject) => total + parseFloat(project.total_rp),
    0
  );
  // In House >>
  const countryInHouseTotalRP: {
    country: string;
    totalRP: number;
    percentage: number;
  }[] = [];

  staffRpSummaryData?.data?.projects?.forEach((project: IProject) => {
    // Check if the project meets the condition (source='In-House')
    if (project.source === "In-House") {
      const existingCountryIndex = countryInHouseTotalRP.findIndex(
        (item) => item.country === project.market
      );
      const totalRPToAdd = parseFloat(project.total_rp);
      if (!isNaN(totalRPToAdd)) {
        // Ensure totalRPToAdd is a valid number
        if (existingCountryIndex === -1) {
          // Country not found, add a new entry
          countryInHouseTotalRP.push({
            country: project.market,
            totalRP: totalRPToAdd,
            percentage: (totalRPToAdd / sumTotalRp) * 100, // Calculate percentage
          });
        } else {
          // Country found, update total RP and percentage
          countryInHouseTotalRP[existingCountryIndex].totalRP += totalRPToAdd;
          countryInHouseTotalRP[existingCountryIndex].percentage =
            (countryInHouseTotalRP[existingCountryIndex].totalRP / sumTotalRp) *
            100; // Recalculate percentage
        }
      }
    }
  });

  // digit limit after .
  countryInHouseTotalRP.forEach((item) => {
    item.totalRP = parseFloat(item.totalRP.toFixed(2));
    item.percentage = parseFloat(item.percentage.toFixed(2));
  });

  // Client >>
  const countryClientTotalRP: {
    country: string;
    totalRP: number;
    percentage: number;
  }[] = [];

  staffRpSummaryData?.data?.projects?.forEach((project: IProject) => {
    if (project.source === "Client") {
      const existingCountryIndex = countryClientTotalRP.findIndex(
        (item) => item.country === project.market
      );
      const totalRPToAdd = parseFloat(project.total_rp);
      if (!isNaN(totalRPToAdd)) {
        // Ensure totalRPToAdd is a valid number
        if (existingCountryIndex === -1) {
          // Country not found, add a new entry
          countryClientTotalRP.push({
            country: project.market,
            totalRP: totalRPToAdd,
            percentage: (totalRPToAdd / sumTotalRp) * 100, // Calculate percentage
          });
        } else {
          // Country found, update total RP and percentage
          countryClientTotalRP[existingCountryIndex].totalRP += totalRPToAdd;
          countryClientTotalRP[existingCountryIndex].percentage =
            (countryClientTotalRP[existingCountryIndex].totalRP / sumTotalRp) *
            100; // Recalculate percentage
        }
      }
    }
  });
  // digit limit after .
  countryClientTotalRP.forEach((item) => {
    item.totalRP = parseFloat(item.totalRP.toFixed(2));
    item.percentage = parseFloat(item.percentage.toFixed(2));
  });

  // >> Client & In House Project RP Table according to country END <<

  const totalRP =
    staffRpSummaryData?.data?.summary?.available_rp +
    staffRpSummaryData?.data?.summary?.total_rp;

  const totalTime =
    staffRpSummaryData?.data?.summary?.available_time +
    staffRpSummaryData?.data?.summary?.total_time;

  const UsedTotalRP = staffRpSummaryData?.data?.summary?.total_time;

  const calculateUsedPercentage = (
    usedData: number,
    totalData: number
  ): number => {
    if (totalData === 0) {
      return 0; // to avoid division by zero
    }
    return (usedData / totalData) * 100;
  };

  const calculateUnusedPercentage = (
    unusedData: number,
    totalData: number
  ): number => {
    if (totalData === 0) {
      return 0; // to avoid division by zero
    }
    return (unusedData / totalData) * 100;
  };

  // --------------------- //
  /**
   * For grouping projects according to countries.
   */
  const countryWiseGroupProject: any =
    staffRpSummaryData?.data?.projects.reduce(
      (acc: { [key: string]: any[] }, project: any) => {
        const { market: country } = project;
        if (!acc[country]) {
          acc[country] = [];
        }
        acc[country].push(project);
        return acc;
      },
      {}
    );
  const SerialNumberCell = ({ row }: any) => {
    const rowIndex = row.index;
    const serialNumber = rowIndex + 1;
    return <div className="text-color">{serialNumber}.</div>;
  };

  /**
   * project-rp-consumption tables column
   */
  const countryProjectColumn: ColumnDef<ICountryProjectDetails>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: (props) => <SerialNumberCell {...props} />,
    },
    {
      id: "title",
      accessorKey: "title",
      header: "Project",
      cell: ({ row }) => (
        <Link
          className="font-semibold text-primary hover:text-blue-700"
          href={`/projects/${row?.original?.code}`}
        >
          {row?.getValue("title")}
        </Link>
      ),
    },
    {
      id: "total_rp",
      accessorKey: "total_rp",
      header: () => <div className="truncate">RP Consumed</div>,
      cell: ({ row }) => (
        <div className="font-semibold">{row?.getValue("total_rp")}</div>
      ),
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }: any) => {
        const totalRP: any = Object.entries(countryWiseGroupProject).reduce(
          (acc, [_, projects]: any) => {
            const totalRpForCountry = projects?.reduce(
              (accInner: number, project: any) =>
                accInner + parseFloat(project?.total_rp || "0"),
              0
            );
            return acc + totalRpForCountry;
          },
          0
        );
        const percentage = (row?.original?.total_rp / totalRP) * 100;
        return <div>{percentage.toFixed(2)}%</div>;
      },
    },
  ];
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
    totalRP,
    totalTime,
    calculateUsedPercentage,
    calculateUnusedPercentage,
    UsedTotalRP,
    countryInHouseTotalRP,
    countryClientTotalRP,
    sumTotalRp,

    // ----------
    countryWiseGroupProject,
    countryProjectColumn,
    searchText,
    setSearchText,
  };
};

export default useLeadReport;
