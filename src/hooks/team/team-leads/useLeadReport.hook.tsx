import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

import {
  ICountryProjectDetails,
  IPropsTeamLeadData,
} from "@/interface/team-lead-report-interface";
import {
  getAllStaffId,
  getLeadsList,
  getStaffRpSummary,
} from "@/services/lead-report/lead-report-service";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

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

// for default date to be one week from now date
export const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 31); // currently one mont

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
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneWeekAgo,
    to: new Date(),
  });

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

  // teamLeadStaffs ID based on all the team lead
  const { data: teamLeadStaffs, isLoading: teamLeadStaffsLoading } =
    useQuery<any>(["getTeamLeadStaffs", current_id], async () => {
      if (current_id === "all" || current_id === undefined) {
        const response = getLeadsList("2"); // there is no ALL Team Lead API (will change after that api gets implemented)

        return response;
      } else {
        const response = getLeadsList(`${current_id}`);
        return response;
      }
    });

  // allStaffId ID based on all the team lead
  const { data: allStaffId, isLoading: allStaffIdLoading } = useQuery<any>(
    ["getAllStaffId", current_id],
    async () => {
      const response = await getAllStaffId();
      return response;
    }
  );

  // getAllStaffId

  // array of staff ID
  const staffIdArray =
    current_id === "all" || current_id === undefined
      ? allStaffId?.data?.map((item: any) => item?.id)
      : teamLeadStaffs?.data[0]?.staffs?.map((item: any) => item?.id);

  const staffIdJson = JSON.stringify(staffIdArray); // Stringified Staff Array

  // Get Staff Summary Data Based on Staff ID and Date Range
  const { data: staffRpSummaryData, isLoading: staffDataLoading } =
    useQuery<any>(
      ["getStaffRpSummaryData", staffIdJson, dateRange?.to, current_id],
      async () => {
        if (staffIdJson) {
          // Check if staffIdJson is not undefined
          const response = getStaffRpSummary(
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            JSON.parse(staffIdJson)
          );
          return response;
        } else {
          return null; // or handle the scenario accordingly
        }
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
  const countryWiseGroupProject: any = useMemo(() => {
    const groupedData = staffRpSummaryData?.data?.projects.reduce(
      (acc: { [key: string]: any[] }, project: any) => {
        const { market: country } = project;
        if (!acc[country]) {
          acc[country] = [];
        }
        acc[country].push(project);

        // console.log(totalRP);

        // const totalRpForCountry = acc[country].reduce(
        //   (sum, currentProject) =>
        //     sum + parseFloat(currentProject.total_rp || "0"),
        //   0
        // );
        // const projectPercentage =
        //   (parseFloat(project?.total_rp || "0") / totalRpForCountry) * 100;
        // acc[country].push({ ...project, percentage: projectPercentage });
        return acc;
      },
      {}
    );
    // Calculate percentage within each country's projects
    groupedData &&
      Object.entries(groupedData).forEach(([_, projects]: any) => {
        const totalRpForCountry = projects.reduce(
          (accInner: number, project: any) =>
            accInner + parseFloat(project?.total_rp || "0"),
          0
        );
        projects.forEach((project: any) => {
          project.percentage = totalRpForCountry
            ? (
                (parseFloat(project.total_rp) / totalRpForCountry) *
                100
              ).toFixed(2)
            : 0;
        });
      });

    return groupedData;
  }, [staffRpSummaryData]);
  // console.log("countryWiseGroupProject", countryWiseGroupProject);

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
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Budget Consumed</p>
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                column.getIsSorted() === "desc"
                  ? 3
                  : column.getIsSorted() === "asc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "desc"
                  ? "#71717A"
                  : column.getIsSorted() === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                column.getIsSorted() === "asc"
                  ? 3
                  : column.getIsSorted() === "desc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "asc"
                  ? "#71717A"
                  : column.getIsSorted() === "desc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
              size={13}
              className="-mt-[4px]"
            />
            {/* <ChevronsUpDown size={16} /> */}
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-semibold">{row?.getValue("total_rp")}</div>
      ),
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>%</p>
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                column.getIsSorted() === "desc"
                  ? 3
                  : column.getIsSorted() === "asc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "desc"
                  ? "#71717A"
                  : column.getIsSorted() === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                column.getIsSorted() === "asc"
                  ? 3
                  : column.getIsSorted() === "desc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "asc"
                  ? "#71717A"
                  : column.getIsSorted() === "desc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
              size={13}
              className="-mt-[4px]"
            />
            {/* <ChevronsUpDown size={16} /> */}
          </Button>
        </div>
      ),
      cell: ({ row }: any) => {
        return <div>{row?.original?.percentage}%</div>;
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
    dateRange,
    dateRangeOpen,
    setDateRangeOpen,
    setDateRange,
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
