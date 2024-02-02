import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import moment from "moment";

import { Copy, Edit, MoreVertical, Plus, Users } from "lucide-react";

import { IProjectDetail } from "@/interface/project-interface";
import { getProjectList } from "@/services/project/project-service";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { changeDateToMonthYear } from "@/shared/utils/date-utils";
import {
  calculateRpLeft,
  calculateRpSumAndColor,
  changeDateDisplay,
  getRiskStatusBgColor,
  showDeadline,
} from "@/shared/utils/rp-utils";
import { cn } from "@/shared/utils/utils";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useDebounce } from "../debounce.hooks";

const useProjectListing = () => {
  // STATES
  /**
   * For git modal to open and to set its key
   */
  const [gitModalOpen, setGitModalOpen] = useState(false);
  const [gitModalId, setGitModalId] = useState(0);
  const [gitUrl, setGitUrl] = useState<string[]>([]);

  /**
   * For filtering data in project api
   */
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const debouncedSearchValue = useDebounce(searchText, 300);

  const { data: projectList, isLoading } = useQuery({
    queryFn: () => getProjectList(pageNumber, perPage, searchText),
    queryKey: ["projectList", perPage, pageNumber, debouncedSearchValue],
  });

  const handlePageChange = (pageNum: number) => {
    setPageNumber(pageNum);
  };

  const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
    const rowIndex = row.index;
    const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;
    const bgColor = getRiskStatusBgColor(row?.original?.risk_status);
    return (
      <div className="text-color">
        <div
          className={`absolute top-2 bottom-2 rounded-e left-0 w-[4px] h-auto ${bgColor} `}
        ></div>
        {serialNumber}
      </div>
    );
  };

  const showGitUrl = (data: IProjectDetail) => {
    setGitModalId(data?.project_id);
    setGitModalOpen(true);
    setGitUrl(data?.git_urls);
  };

  const copyProjectCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(TOAST_TYPES.success, "Text Copied");
  };

  const columns: ColumnDef<IProjectDetail>[] = [
    {
      id: "sn",
      accessorKey: "S.N",
      header: "S.N",
      cell: (props) => (
        <SerialNumberCell
          {...props}
          pageNumber={pageNumber}
          perPage={perPage}
        />
      ),
      enableHiding: false,
    },
    // Project Info
    {
      id: "project_title",
      accessorKey: "project_title",
      header: "Project Info",
      cell: ({ row }) => (
        <div className="capitalize w-[240px]">
          <Tooltip>
            <TooltipTrigger className="w-full min-w-0 text-start">
              <Link
                href={`/projects/${row.original?.code}`}
                className="block mb-1 text-base font-medium truncate transition-all text-zinc-700 hover:text-primary"
              >
                {row.getValue("project_title")}
              </Link>
            </TooltipTrigger>
            <TooltipContent className="max-w-[200px]">
              {row.getValue("project_title")}
            </TooltipContent>
          </Tooltip>
          <p className="my-1 text-xs text-zinc-600">
            Fiscal year:{" "}
            <span className="font-medium">{row?.original?.fiscal_year}</span>
          </p>
          <p className="mb-2 text-xs text-zinc-600">
            Source:{" "}
            <span className="font-medium"> {row?.original?.source}</span>
          </p>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => showGitUrl(row?.original)}
            disabled={row?.original?.git_urls?.length === 0}
            className="text-green-500 border-green-500 disabled:text-zinc-300 disabled:bg-light-white disabled:border-zinc-300"
          >
            git
          </Button>
        </div>
      ),
      enableHiding: false,
    },
    // Project Detail
    {
      id: "project_detail",
      accessorKey: "project_detail",
      header: "Project Detail",
      cell: ({ row }) => (
        <div className="w-[240px] min-w-0">
          <div className="flex items-center min-w-0 gap-2 mb-1 text-xs text-zinc-600">
            <span>Code:</span>{" "}
            <div className="flex items-center gap-1 max-w-[80%]">
              <p className="font-medium truncate">{row.original?.code}</p>
              <Button
                variant={"ghost"}
                className="h-auto p-0"
                onClick={() => copyProjectCode(row.original?.code)}
              >
                <Copy
                  size={12}
                  className="stroke-zinc-500 hover:stroke-primary"
                />
              </Button>
            </div>
          </div>
          <p className="mb-1 text-xs text-zinc-600">
            Type:{" "}
            <span className="font-medium text-zinc-700">
              {row.original?.type}
            </span>
          </p>
          <p className="mb-1 text-xs text-zinc-600">
            Source: <span className="font-medium">{row.original?.source}</span>
          </p>
          <p className="mb-1 text-xs text-zinc-600">
            Market:{" "}
            <span className="font-medium">{row.original?.market_title}</span>
          </p>
          <p className="text-xs text-zinc-600">
            Techstack:{" "}
            <span className="font-medium">{row.original?.tech_stack}</span>
          </p>
        </div>
      ),
      enableHiding: true,
    },
    // Planned RP
    {
      id: "planned_rp",
      accessorKey: "planned_rp",
      header: "Planned RP",
      cell: ({ row }: any) => {
        const { sum, color, icon } = calculateRpSumAndColor(
          row?.original?.rp?.approved_rp,
          row?.original?.rp?.unapproved_rp
        );
        return (
          <div className="w-[154px]">
            <div
              className={cn(
                color,
                "flex items-center gap-1.5 text-base font-medium"
              )}
            >
              {icon}
              <span className={color}>{sum}</span>
            </div>
          </div>
        );
      },
      enableHiding: true,
    },
    // RP
    {
      id: "rp",
      accessorKey: "rp",
      header: "RP",
      cell: ({ row }) => {
        const { percentageLeft, color } = calculateRpLeft(
          row?.original?.rp?.used_rp ?? 0,
          row?.original?.rp?.approved_rp
        );
        return (
          <div className="w-[180px]">
            <p className={cn(color, "text-base font-medium")}>
              {percentageLeft}
            </p>
            <p className="my-1 text-sm text-zinc-600">
              <span>Sales RP:</span>
              <span className="font-medium">
                {row?.original?.rp?.sales_rp ?? "-"}
              </span>
            </p>
            <p className="text-sm text-zinc-600">
              <span>Used RP:</span>
              <span className="font-medium">
                {row?.original?.rp?.used_rp ?? "-"}
              </span>
            </p>
          </div>
        );
      },
      enableHiding: true,
    },
    // Deadline
    {
      id: "deadline",
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }: any) => {
        const { statusText, daysValue } = showDeadline(
          row?.original?.dates?.deadline
        );
        return (
          <div className="w-[200px]">
            <p className="mb-2 text-sm font-medium text-zinc-700">
              {statusText}
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Progress className={cn("h-1.5")} value={daysValue} />
              </TooltipTrigger>
              <TooltipContent align="center" side="right">
                {}
                <p className="mb-1">
                  Start Date:{" "}
                  {changeDateToMonthYear(row?.original?.dates?.start_date)}
                </p>
                <p>
                  End Date:{" "}
                  {changeDateToMonthYear(row?.original?.dates?.deadline)}
                </p>
              </TooltipContent>
            </Tooltip>

            <p className="mt-2 text-xs text-zinc-600">
              Deadline:{" "}
              <span className="font-medium">
                {changeDateToMonthYear(row?.original?.dates?.deadline)}
              </span>
            </p>
          </div>
        );
      },
      enableHiding: true,
    },
    // Project Lead
    {
      id: "project_lead",
      accessorKey: "project_lead",
      header: "Project Lead",
      cell: ({ row }) => (
        <div className="w-[155px]">
          <p className="text-sm font-medium text-zinc-700">
            {row?.original?.project_lead?.fullname}
          </p>
          <div className="flex flex-wrap mt-1 gap-x-2 gap-y-1">
            {Array.from({
              length:
                row?.original?.project_lead?.in_progress_project_count || 0,
            }).map((_, index) => (
              <div
                key={`progress-${index}`}
                className="w-1.5 h-1.5 bg-green-500 rounded-full"
              ></div>
            ))}
            {Array.from({
              length:
                row?.original?.project_lead?.in_support_project_count || 0,
            }).map((_, index) => (
              <div
                key={`support-${index}`}
                className="w-1.5 h-1.5 bg-orange-500 rounded-full"
              ></div>
            ))}
          </div>
        </div>
      ),
      enableHiding: true,
    },
    // Offshore membet
    {
      id: "offshore_members",
      accessorKey: "offshore_members",
      header: "Offshore Members",
      cell: ({ row }) => (
        <div className="w-[150px]">
          <div className="mb-2">
            {row?.original?.offshore_members?.length <= 3 ? (
              row.original.offshore_members.map((member: any, index) => (
                <p key={index} className="text-xs font-medium text-zinc-700">
                  {member?.fullname}
                </p>
              ))
            ) : (
              <>
                {row.original?.offshore_members
                  .slice(0, 2)
                  .map((member: any, index) => (
                    <p key={index} className="text-xs text-zinc-700">
                      {member?.fullname}
                    </p>
                  ))}
                <p className="text-xs">
                  +{row.original.offshore_members.length - 2} more
                </p>
              </>
            )}
          </div>

          <Button size={"sm"} variant={"table"} className="gap-1">
            <Plus size={16} />
            Members
          </Button>
        </div>
      ),
      enableHiding: true,
    },
    // Last time log
    {
      id: "last_time_log",
      accessorKey: "last_time_log",
      header: "Last Time Log",
      cell: ({ row }: any) => (
        <div className="w-[150px] text-zinc-600">
          <p className="text-xs ">Last Logged</p>
          <p className="mt-1 text-sm font-medium">
            {row.original.dates.last_log_date
              ? moment(row.original.dates.last_log_date).format("MMM Do, YYYY")
              : "-"}
          </p>
          <p className="mb-1 text-sm font-medium">
            {row.original.dates.last_log_date
              ? moment(row.original.dates.last_log_date).format("HH:mm:ss")
              : "-"}
          </p>
          <p className="text-xs">
            {row?.original?.dates?.last_log_date &&
              changeDateDisplay(row?.original?.dates?.last_log_date)}
          </p>
        </div>
      ),
      enableHiding: true,
    },
    // Status
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div className="w-[100px]">
            <Badge
              variant={"outline"}
              className={`${
                row.getValue("status") === "In Progress" &&
                "border border-[#FD850A] text-[#FD850A]"
              }
            ${
              row.getValue("status") === "completed" ||
              (row.getValue("status") === "delivered" &&
                "border border-[#0A82FD] text-[#0A82FD]")
            }
             capitalize rounded-md`}
            >
              {row.getValue("status")}
            </Badge>
          </div>
        );
      },
      enableHiding: true,
    },
    // Task Status
    {
      id: "task_status",
      accessorKey: "task_status",
      header: "Task Status",
      cell: ({ row }) => (
        <div className="w-[180px]">
          <p className="text-[15px] text-zinc-800 mb-1">
            Total Task {row?.original?.task?.all_task_count}
          </p>

          <Progress
            className={cn(
              row?.original?.task?.all_task_count === "0"
                ? "bg-gray-300"
                : "bg-orange-500",
              "h-1.5 [&>div]:bg-green-500"
            )}
            value={parseInt(row?.original?.task?.closed_task_count)}
          />

          <div className="mt-2">
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
              <span className="text-green-500">
                {row?.original?.task?.closed_task_count}
              </span>
              <span className="text-xs font-medium text-zinc-600">
                Closed Task
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-500 rounded-sm"></span>
              <span className="text-orange-500">
                {row?.original?.task?.open_task_count}
              </span>
              <span className="text-xs font-medium text-zinc-600">
                Open Task
              </span>
            </p>
          </div>
        </div>
      ),
      enableHiding: true,
    },
    // Action
    {
      id: "actions",
      accessorKey: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <div className="flex items-center gap-4">
            <Link href={`/projects/${rowData?.project_id}/edit`}>
              <Edit
                size={20}
                className="stroke-zinc-700 hover:stroke-primary"
              />
            </Link>
            <Link
              href={`/projects/${rowData?.project_id}/team-members`}
              className="relative "
            >
              <Badge
                size={"sm"}
                variant={"dark"}
                className="absolute -right-3 -top-3"
              >
                2
              </Badge>
              <Users
                size={20}
                className="stroke-zinc-700 hover:stroke-primary"
              />
            </Link>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <MoreVertical size={20} className="stroke-zinc-700" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="px-5">
                  Daily RP Consumption Graph
                </DropdownMenuItem>
                <DropdownMenuItem className="px-5">
                  Daily RP Consumption List
                </DropdownMenuItem>
                <DropdownMenuItem className="px-5">
                  User Stories
                </DropdownMenuItem>
                <DropdownMenuItem className="px-5">Activities</DropdownMenuItem>
                <DropdownMenuItem className="px-5">
                  Label Report & Timelog Pattern
                </DropdownMenuItem>
                <DropdownMenuItem className="px-5">
                  Task & Time Spent
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return {
    gitModalOpen,
    setGitModalOpen,
    gitModalId,
    setGitModalId,
    gitUrl,
    setGitUrl,
    searchText,
    setSearchText,
    debouncedSearchValue,
    pageNumber,
    setPageNumber,
    perPage,
    setPerPage,
    sheetOpen,
    setSheetOpen,
    projectList,
    isLoading,
    handlePageChange,
    SerialNumberCell,
    showGitUrl,
    columns,
    columnVisibility,
    setColumnVisibility,
  };
};

export default useProjectListing;
