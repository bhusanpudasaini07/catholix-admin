import moment from "moment";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import {
  ILeaveRequest,
  ILeaveRequestDetail,
} from "@/interface/leave-request-interface";
import { getLeaveList } from "@/services/leave-request";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";

import { useDebounce } from "../debounce.hooks";

const useLeaveRequest = () => {
  // STATES
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState("all");
  const [perPage, setPerPage] = useState(12);
  const [pageNum, setPageNum] = useState(1);
  // STATE FOR PROJECT COUNT DISPLAY
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  //   FUNCTIONS
  // Function to change count for a specific row
  const changeCount = (project_count: number, id: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: project_count,
    }));
  };
  //   For pagination
  const changePageNumber = (pageNum: number) => {
    setPageNum(pageNum);
  };
  const changePerPage = (value: number) => {
    setPageNum(1);
    setPerPage(value);
  };
  //   For filters
  const searchHandler = (text: string) => {
    setSearchText(text);
  };
  const changeDate = (date: string) => {
    setPageNum(1);
    setDate(date);
  };
  const changeStatus = (status: string) => {
    setStatus(status);
  };

  //   For serial Number
  const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
    const rowIndex = row.index;
    const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;
    return <div className="text-color">{serialNumber}</div>;
  };
  // For project Background
  const projectBg = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-50 border-blue-500 text-blue-700";
        break;
      case "Client Support":
        return "bg-orange-50 border-orange-500 text-orange-700";
        break;
      case "Closed":
        return "bg-green-50 border-green-500 text-green-700";
        break;
      case "Delivered":
        return "bg-green-50 border-green-500 text-green-700";
        break;
      case "On Hold":
        return "bg-red-50 border-red-500 text-red-700";
        break;
      case "Deleted":
        return "bg-zinc-100 border-zinc-500 text-zinc-700";
        break;
    }
  };
  const leaveTextColor = (category: string) => {
    switch (category) {
      case "Yearly Leave":
        return "text-primary";
      case "Compensation Leave":
        return "text-green-500";
      case "Sick Leave":
        return "text-orange-500";
      case "Menstrual Leave":
        return "text-orange-500";
      case "Leave Without Pay":
        return "text-zinc-500";
      case "Urgent Leave":
        return "text-red-500";
    }
  };

  // APIs and Column
  const { data: staffLeaves, isLoading: staffLeavesLoading } =
    useQuery<ILeaveRequest>({
      queryFn: () => getLeaveList(date, status !== "all" ? status : ""),
      queryKey: ["staffLeaves", date, status],
    });

  const filteredStaffLeaves = useMemo(() => {
    if (!staffLeaves?.data) return [];

    return staffLeaves.data.filter((staff) => {
      const matchesKeyword = searchText
        ? staff?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          staff?.leave?.reason?.toLowerCase().includes(searchText.toLowerCase())
        : true;
      return matchesKeyword;
    });
  }, [staffLeaves, searchText, status]);

  const columns: ColumnDef<ILeaveRequestDetail>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: (props) => (
        <SerialNumberCell {...props} pageNumber={pageNum} perPage={perPage} />
      ),
    },
    // Member Info
    {
      id: "name",
      accessorKey: "name",
      header: "Member Info",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1 w-[150px]">
          <Link
            href={`/staffs/${row?.original?.username}`}
            className="font-semibold bock text-primary hover:text-blue-700"
          >
            {row?.original?.name}
          </Link>
          <div>
            <p className="text-xs font-medium text-zinc-700">
              {row?.original?.role}
            </p>
            <p className="text-xs text-zinc-700">{row?.original?.department}</p>
          </div>
        </div>
      ),
    },
    // No. of projects
    {
      id: "project_count",
      accessorKey: "project_count",
      header: () => (
        <div>
          No.of
          <br />
          Projects
        </div>
      ),
      cell: ({ row }) => <div>#{row?.original?.projects?.length ?? 0}</div>,
    },
    // Projects
    {
      id: "projects",
      accessorKey: "projects",
      header: "Projects",
      cell: ({ row }) => {
        const rowId = row?.original?.user_id;
        const maxProjectsToShow = counts[rowId] || 3; // Default to 3 if no specific count is set
        return (
          <div>
            <div className="flex flex-wrap gap-1.5 w-[350px]">
              {row?.original?.projects
                ? row?.original?.projects
                    ?.slice(0, maxProjectsToShow)
                    ?.map((project: any) => (
                      <div
                        className={cn(
                          projectBg(project?.status),
                          `py-0.5 px-5 border rounded-full relative text-xs`
                        )}
                        key={project?.id}
                      >
                        <Link
                          href={`/projects/${project?.code}`}
                          className="absolute top-0 right-0 bottom-0 left-0"
                        />
                        <p className="font-bold">{project?.title}</p>
                        <p>{project?.project_lead}</p>
                      </div>
                    ))
                : "N/A"}
            </div>
            {row?.original?.projects?.length > maxProjectsToShow && (
              <p
                className="mt-2 font-medium text-center cursor-pointer text-zinc-700"
                onClick={() =>
                  changeCount(row?.original?.projects?.length, rowId)
                }
              >
                +{row?.original?.projects?.length - 3} More
              </p>
            )}
          </div>
        );
      },
    },
    // Leave type
    {
      id: "leave_type",
      accessorKey: "leave_type",
      header: "Leave Type",
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger className="text-start">
            <p
              className={cn(
                leaveTextColor(row?.original?.leave?.category),
                "mb-1 font-semibold leading-6"
              )}
            >
              {row?.original?.leave?.category}
            </p>
            <p className="text-sm font-medium text-zinc-500">
              {row?.original?.leave?.leave_count}
            </p>
          </TooltipTrigger>
          <TooltipContent side="right">
            <div>
              <p>
                {row?.original?.leave?.category} :{" "}
                {row?.original?.leave?.leave_count}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      ),
    },
    // Leave Duration
    {
      id: "duration",
      accessorKey: "duration",
      header: () => (
        <div>
          Leave <br />
          Duration
        </div>
      ),
      cell: ({ row }) => {
        const barValue = (value: string) => {
          switch (value) {
            case "Full Day Leave":
              return 100;
            case "First Half Leave":
              return 50;
            case "Second Half Leave":
              return 50;
          }
        };
        return (
          <div>
            <div>
              <p className="font-medium text-zinc-500">
                {moment(row?.original?.leave?.from_date)?.format("MMM DD")}
              </p>
              {row?.original?.leave?.from_date !==
                row?.original?.leave?.to_date && (
                <>
                  <p className="text-zinc-500">to</p>
                  <p className="font-medium text-zinc-500">
                    {moment(row?.original?.leave?.to_date).format("ll")}
                  </p>
                </>
              )}
            </div>
            <p className="mt-1 font-medium text-zinc-500">
              ({row?.original?.leave?.type})
            </p>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <Progress
                  value={barValue(row?.original?.leave?.type)}
                  className={cn(
                    row?.original?.leave?.type === "Second Half Leave"
                      ? "bg-yellow-400 [&>div]:bg-secondary"
                      : "[&>div]:bg-yellow-400",
                    "h-2 rounded-none w-full"
                  )}
                />
              </TooltipTrigger>
              <TooltipContent>{row?.original?.leave?.type}</TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
    // Leave Reason
    {
      id: "leave_reason",
      accessorKey: "leave_reason",
      header: "Leave Reason",
      cell: ({ row }) => (
        <div className="max-w-[350px]">
          <p className="font-medium text-zinc-500">
            {row?.original?.leave?.reason}
          </p>
        </div>
      ),
    },
    // Status
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="max-w-[300px] min-w-0">
          <Badge
            className={cn(
              row?.original?.leave?.status === "approved" &&
                "bg-green-100 border-green-500 text-green-500 rounded-md",
              row?.original?.leave?.status === "Pending" &&
                "bg-orange-100 border-orange-500 text-orange-500 rounded-md",
              row?.original?.leave?.status === "Rejected" &&
                "bg-red-100 border-red-500 text-red-500 rounded-md ",
              "capitalize"
            )}
          >
            {row.original?.leave?.status}
          </Badge>
        </div>
      ),
    },
  ];
  return {
    // STATES
    searchText,
    status,
    perPage,
    pageNum,
    date,

    // FUNCTIONS
    changePerPage,
    changePageNumber,
    searchHandler,
    changeDate,
    changeStatus,

    // For API
    columns,
    staffLeavesLoading,
    filteredStaffLeaves,
  };
};

export default useLeaveRequest;
