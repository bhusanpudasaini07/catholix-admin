import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/shared/utils/utils";

import {
  IStaff,
  IStaffLogs,
  IStaffProjects,
  IStaffProjectsDetail,
} from "@/interface/staff-interface";
import {
  getStaffDetails,
  getStaffProjects,
  getStaffTimeLogs,
} from "@/services/staff/staff-service";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Eye } from "lucide-react";
import moment from "moment";
import { calculateTimeLog } from "@/shared/utils/rp-utils";
import { useDebounce } from "../debounce.hooks";

const useStaffDetail = () => {
  const {
    query: { username },
  } = useRouter();

  const SerialNumberCell = ({ row }: any) => {
    const rowIndex = row.index;
    const serialNumber = rowIndex + 1;
    return <div className="text-color">{serialNumber}.</div>;
  };

  // STATES
  /**
   * For staff projects API
   */
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("all");
  const debouncedValue = useDebounce(searchText, 300);

  /**
   *  For Budget Allocation
   */
  const [rpDate, setRpDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [rpDateOpen, setRpDateOpen] = useState(false);

  // FUNCTIONS
  /**
   * For staff projects API
   */
  const changeDate = (date: any) => {
    setDate(date);
  };

  /**
   *  For Budget Allocation
   */
  const changeRPDate = (date: any) => {
    setRpDate(date);
  };
  const { data: staffDetails, isLoading: staffDetailsLoading } =
    useQuery<IStaff>({
      queryFn: async () => {
        if (username) {
          const response = await getStaffDetails(username);
          return response;
        }
      },
      queryKey: ["staffDetails", username],
    });

  const { data: staffLog, isLoading: staffLogLoading } = useQuery<IStaffLogs>({
    queryFn: async () => {
      if (username) {
        const response = await getStaffTimeLogs(
          username, //username
          rpDate?.to && moment(rpDate?.from).format("YYYY-MM-DD"), //date_from
          rpDate?.to && moment(rpDate?.to).format("YYYY-MM-DD") //date_from
        );
        return response;
      }
    },
    queryKey: ["staffLog", username, rpDate?.to],
  });

  // For listing
  const { data: staffProjects, isLoading: staffProjectsLoading } =
    useQuery<IStaffProjects>({
      queryFn: async () => {
        const currentDate = moment().format("YYYY-MM-DD");
        const sixMonthsAgo = moment()
          .subtract(6, "months")
          .format("YYYY-MM-DD");
        const dateRange = { from: sixMonthsAgo, to: currentDate };
        if (username) {
          const response = await getStaffProjects(
            username, //staff id
            date?.to
              ? moment(date?.from).format("YYYY-MM-DD")
              : dateRange?.from, //date_from
            date?.to ? moment(date?.to).format("YYYY-MM-DD") : dateRange?.to, //date_to
            searchText,
            status !== "all" ? status : ""
          );

          return response;
        }
      },

      queryKey: ["staffProjects", username, date?.to, debouncedValue, status],
    });

  // Projects List Column
  const projectsOverviewColumns: ColumnDef<IStaffProjectsDetail>[] = [
    {
      id: "sn",
      header: "S.No.",
      accessorKey: "sn",
      cell: (props) => <SerialNumberCell {...props} />,
    },
    // Project name
    {
      id: "name",
      accessorKey: "name",
      header: "Project Name",
      cell: ({ row }) => (
        <Link
          href={`/projects/${row?.original?.code}`}
          className="font-medium text-primary hover:text-blue-700"
        >
          {row?.getValue("name")}
        </Link>
      ),
    },
    //  Role
    {
      id: "role_name",
      accessorKey: "role_name",
      header: "Role",
      cell: ({ row }) => <div>{row?.getValue("role_name")}</div>,
    },
    // Project Type
    {
      id: "source",
      accessorKey: "source",
      header: "Project Type",
      cell: ({ row }) => (
        <div className="w-[120px]">{row.getValue("source")}</div>
      ),
    },
    // Project Lead
    {
      id: "project_lead_name",
      accessorKey: "project_lead_name",
      header: "Project Lead",
      cell: ({ row }: any) => <div>{row?.getValue("project_lead_name")}</div>,
    },
    // Status
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => (
        <Badge
          variant={"outline"}
          className={`whitespace-nowrap 
    ${
      row.getValue("status") === "In Progress" &&
      " border-blue-500 text-blue-500 bg-blue-50 "
    }
    ${
      row.getValue("status") === "Client Support" &&
      " border-orange-500 text-orange-500 bg-orange-50"
    }
    ${
      row.getValue("status") === "On Hold" &&
      " border-red-500 text-red-500 bg-red-50"
    }
  ${
    ["Closed", "Delivered"].includes(row.getValue("status")) &&
    " border-green-500 text-green-500 bg-green-50"
  }
  ${
    row.getValue("status") === "Not Started" &&
    " border-zinc-500 text-zinc-500 bg-zinc-50"
  }
   capitalize border rounded-md`}
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
    // Sales RP
    {
      id: "sales_rp",
      accessorKey: "sales_rp",
      header: "Sales Budget",
      cell: ({ row }: any) => <div>{row?.getValue("sales_rp")}</div>,
    },
    // Used RP
    {
      id: "overall_used_rp",
      accessorKey: "overall_used_rp",
      header: "Used Budget",
      cell: ({ row }: any) => (
        <div className="font-medium">{row?.getValue("overall_used_rp")}</div>
      ),
    },
    // RP Contribution
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Contribution",
      cell: ({ row }: any) => (
        <div className="font-medium">{row?.getValue("rp")}</div>
      ),
    },
    // Time Contribution
    {
      id: "time",
      accessorKey: "time",
      header: "Time Contribution",
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(row?.getValue("time"));
        return (
          <div className="font-medium">{`${
            hours > 0 && hours + "H"
          } ${minutes}M`}</div>
        );
      },
    },
    // Review
    {
      id: "review",
      accessorKey: "review",
      header: "Review",
      cell: ({ row }: any) => (
        <Button
          variant={"ghost"}
          className="h-auto p-0 text-zinc-700 hover:text-primary"
        >
          <Eye size={20} />
        </Button>
      ),
    },
  ];

  const dailyRpColumn: ColumnDef<any>[] = [
    // Date
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // Available RP
    {
      id: "available_rp",
      accessorKey: "available_rp",
      header: "Available Budget",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // RP Provided
    {
      id: "provided_rp",
      accessorKey: "provided_rp",
      header: "Budget Provided",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // %
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // Remarks
    {
      id: "remarks",
      accessorKey: "remarks",
      header: "Remarks",
      cell: ({ row }: any) => <div>asd</div>,
    },
  ];

  const monthlyRpColumn: ColumnDef<any>[] = [
    // Month
    {
      id: "month",
      accessorKey: "month",
      header: "Month",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // Available RP
    {
      id: "available_rp",
      accessorKey: "available_rp",
      header: "Available Budget",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // RP Provided
    {
      id: "provided_rp",
      accessorKey: "provided_rp",
      header: "Budget Provided",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // %
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }: any) => <div>asd</div>,
    },
  ];

  return {
    projectsOverviewColumns,
    dailyRpColumn,
    monthlyRpColumn,
    staffDetails,
    staffDetailsLoading,
    staffLog,
    staffLogLoading,
    staffProjects,
    staffProjectsLoading,
    date,
    setDate,
    setSearchText,
    changeDate,
    dateRangeOpen,
    setDateRangeOpen,
    status,
    setStatus,
    changeRPDate,
    rpDate,
    rpDateOpen,
    setRpDateOpen,
  };
};

export default useStaffDetail;
