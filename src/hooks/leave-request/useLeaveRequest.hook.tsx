import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";

import { useDebounce } from "../debounce.hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

const useLeaveRequest = () => {
  // STATES
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState("all");
  const [perPage, setPerPage] = useState(12);
  const [pageNum, setPageNum] = useState(1);
  const [count, setCount] = useState({
    id: "",
    num: 3,
  });

  //   FUNCTIONS
  //   Stale Time for search
  const debounchedSearch = useDebounce(searchText, 300);

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
    setPageNum(1);
    setStatus(status);
  };
  //   In table for project more than 4
  const changeCount = (project_count: number, id: string) => {
    setCount({
      id: id,
      num: project_count,
    });
  };
  //   For serial Number
  const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
    const rowIndex = row.index;
    const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;
    return <div className="text-color">{serialNumber}</div>;
  };

  const columns: ColumnDef<any>[] = [
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
      id: "member_info",
      accessorKey: "member_info",
      header: "Member Info",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1 w-[150px]">
          <Link
            href={`/staffs/${row?.original?.username}`}
            className="font-semibold bock text-primary hover:text-blue-700"
          >
            {row?.original?.fullname}
          </Link>
          <div>
            <p className="text-xs font-medium text-zinc-700">
              {row?.original?.role?.name}
            </p>
            <p className="text-xs text-zinc-700">
              {row?.original?.department?.name}
            </p>
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
      cell: ({ row }) => <div>#{row?.getValue("project_count") ?? 0}</div>,
    },
    // Projects
    {
      id: "projects",
      accessorKey: "projects",
      header: "Projects",
      cell: ({ row }) => {
        return (
          <div>
            <div className="flex flex-wrap gap-1.5 w-[350px]">
              {row?.original?.projects
                ? row?.original?.projects
                    ?.slice(0, count?.id === row?.original?.id ? count?.num : 3)
                    ?.map((project: any) => (
                      <div
                        className={`py-0.5 px-5 border rounded-full relative text-xs`}
                        key={project?.id}
                      >
                        <Link
                          href={`/projects/${project?.code}`}
                          className="absolute top-0 right-0 bottom-0 left-0"
                        />
                        <p className="font-bold">{project?.name}</p>
                        <p>{project?.project_lead}</p>
                      </div>
                    ))
                : "N/A"}
            </div>
            {row?.original?.project_count > count?.num && (
              <p
                className="mt-2 font-medium text-center cursor-pointer text-zinc-700"
                onClick={() =>
                  changeCount(row?.original?.project_count, row?.original?.id)
                }
              >
                +{row?.original?.project_count - 3} More
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
          <TooltipTrigger>
            <p className="font-semibold text-primary">
              {row?.original?.leave_type}
            </p>
            <p className="text-xs font-medium text-zinc-500">{2 / 6}</p>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <p>Leave: 2/6</p>
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
      cell: ({ row }) => (
        <div>
          <div>
            <p className="font-semibold text-primary">
              {row?.original?.leave_from}
            </p>
            <p className="font-semibold text-primary">to</p>
            <p className="font-semibold text-primary">
              {row?.original?.leave_to}
            </p>
          </div>
          <p className="font-semibold text-primary">
            ({row?.original?.leave_type})
          </p>
          <Tooltip>
            <TooltipTrigger>Bar Here</TooltipTrigger>
            <TooltipContent>Leave type</TooltipContent>
          </Tooltip>
        </div>
      ),
    },
    // Leave Reason
    {
      id: "leave_reason",
      accessorKey: "leave_reason",
      header: "Leave Reason",
      cell: ({ row }) => (
        <div className="max-w-[200px]">
          <p className="font-medium text-zinc-500">
            {row?.original?.leave_reason}
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
              row?.getValue("status") === "Approved" &&
                "bg-green-100 border-green-500 text-green-500 rounded-md",
              row?.getValue("status") === "Pending" &&
                "bg-orange-100 border-orange-500 text-orange-500 rounded-md",
              row?.getValue("status") === "Cancelled" &&
                "bg-red-100 border-red-500 text-red-500 rounded-md"
            )}
          >
            {row.getValue("status")}
          </Badge>
        </div>
      ),
    },
  ];
  return {
    // STATES
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
  };
};

export default useLeaveRequest;
