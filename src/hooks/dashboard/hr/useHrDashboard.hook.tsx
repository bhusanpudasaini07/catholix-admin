import moment from "moment";
import Link from "next/link";
import { useQuery } from "react-query";

import {
  ILeaveRequest,
  ILeaveRequestDetail,
} from "@/interface/leave-request-interface";
import { getLeaveList } from "@/services/leave-request";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Badge } from "@/shared/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Progress } from "@/shared/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  ITeamMemberDetails,
  ITeamMemberList,
} from "@/interface/team-member-interface";
import { getTeamMembersList } from "@/services/user-management/team-member/team-member-service";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/debounce.hooks";
import WorkLoadChart from "@/features/User-Management/team-members/page-body/work-load-chart";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const useHrDashboard = () => {
  // STATES
  const [department, setDepartment] = useState("");
  const [searchText, setSearchText] = useState("");

  //   FUNCTIONS

  const debouncedSearch = useDebounce(searchText, 300);
  //   For serial Number
  const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
    const rowIndex = row.index;
    const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;
    return <div className="text-color">{serialNumber}</div>;
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
  // APIs and Column

  //   Staffs API
  const { data: staffLeaves, isLoading: staffLeavesLoading } =
    useQuery<ILeaveRequest>({
      queryFn: () => getLeaveList("", "Pending"),
      queryKey: ["staffLeaves"],
    });

  // API CALL
  const { data: teamMemberList, isLoading: teamMemberListLoading } =
    useQuery<ITeamMemberList>({
      queryFn: () =>
        getTeamMembersList(
          15,
          1,
          searchText, //keyword
          moment().subtract(2, "week").format("YYYY-MM-DD"), //date_to
          moment().format("YYYY-MM-DD"), //date_from
          department //department
        ),
      queryKey: ["teamMemberList", debouncedSearch, department],
    });

  const memberUtilizationData = useMemo(() => {
    if (teamMemberList && teamMemberList.data) {
      return teamMemberList.data.map((member) => {
        const availableTime = Number(member.available_time);
        const usedTime = Number(member.used_time);
        const utilizedHours = (usedTime / availableTime) * 100;
        return { ...member, utilized_hours: utilizedHours.toFixed(2) };
      });
    }
    return [];
  }, [teamMemberList]);

  const leaveReqDetailColumns: ColumnDef<ILeaveRequestDetail>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: (props) => (
        <SerialNumberCell {...props} pageNumber={1} perPage={50} />
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
        return (
          <div>
            <div className="flex flex-wrap gap-1.5 w-[350px]">
              {row?.original?.projects?.length > 0
                ? row?.original?.projects?.map((project: any) => (
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
        <>
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
        </>
      ),
    },
    // Leave Duration
    {
      id: "duration",
      accessorKey: "duration",
      header: () => (
        <div>
          Leave <br /> Duration
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
              <span className="font-medium text-zinc-500">
                {moment(row?.original?.leave?.from_date)?.format("MMM DD")}
              </span>
              {row?.original?.leave?.from_date !==
                row?.original?.leave?.to_date && (
                <>
                  <span className="text-zinc-500"> - </span>
                  <span className="font-medium text-zinc-500">
                    {moment(row?.original?.leave?.to_date).format("MMM DD")}
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 font-medium text-zinc-500">
              ({row?.original?.leave?.type})
            </p>

            <div className="mt-2">
              <Progress
                value={barValue(row?.original?.leave?.type)}
                className={cn(
                  row?.original?.leave?.type === "Second Half Leave"
                    ? "bg-yellow-400 [&>div]:bg-secondary"
                    : "[&>div]:bg-yellow-400",
                  "h-2 rounded-none w-full"
                )}
              />
            </div>
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

  const leaveReqColumns: ColumnDef<ILeaveRequestDetail>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: (props) => (
        <SerialNumberCell {...props} pageNumber={1} perPage={50} />
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
    // {
    //   id: "project_count",
    //   accessorKey: "project_count",
    //   header: () => (
    //     <div>
    //       No.of
    //       <br />
    //       Projects
    //     </div>
    //   ),
    //   cell: ({ row }) => <div>#{row?.original?.projects?.length ?? 0}</div>,
    // },
    // Projects
    // {
    //   id: "projects",
    //   accessorKey: "projects",
    //   header: "Projects",
    //   cell: ({ row }) => {
    //     const rowId = row?.original?.user_id;
    //     const maxProjectsToShow = counts[rowId] || 3; // Default to 3 if no specific count is set
    //     return (
    //       <div>
    //         <div className="flex flex-wrap gap-1.5 w-[350px]">
    //           {row?.original?.projects
    //             ? row?.original?.projects
    //                 ?.slice(0, maxProjectsToShow)
    //                 ?.map((project: any) => (
    //                   <div
    //                     className={cn(
    //                       projectBg(project?.status),
    //                       `py-0.5 px-5 border rounded-full relative text-xs`
    //                     )}
    //                     key={project?.id}
    //                   >
    //                     <Link
    //                       href={`/projects/${project?.code}`}
    //                       className="absolute top-0 right-0 bottom-0 left-0"
    //                     />
    //                     <p className="font-bold">{project?.title}</p>
    //                     <p>{project?.project_lead}</p>
    //                   </div>
    //                 ))
    //             : "N/A"}
    //         </div>
    //         {row?.original?.projects?.length > maxProjectsToShow && (
    //           <p
    //             className="mt-2 font-medium text-center cursor-pointer text-zinc-700"
    //             onClick={() =>
    //               changeCount(row?.original?.projects?.length, rowId)
    //             }
    //           >
    //             +{row?.original?.projects?.length - 3} More
    //           </p>
    //         )}
    //       </div>
    //     );
    //   },
    // },
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
      header: () => <div>Leave Duration</div>,
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
              <span className="font-medium text-zinc-500">
                {moment(row?.original?.leave?.from_date)?.format("MMM DD")}
              </span>
              {row?.original?.leave?.from_date !==
                row?.original?.leave?.to_date && (
                <>
                  <span className="text-zinc-500"> - </span>
                  <span className="font-medium text-zinc-500">
                    {moment(row?.original?.leave?.to_date).format("MMM DD")}
                  </span>
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
    // {
    //   id: "leave_reason",
    //   accessorKey: "leave_reason",
    //   header: "Leave Reason",
    //   cell: ({ row }) => (
    //     <div className="max-w-[350px]">
    //       <p className="font-medium text-zinc-500">
    //         {row?.original?.leave?.reason}
    //       </p>
    //     </div>
    //   ),
    // },
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

    {
      id: "action",
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        return (
          <div className="w-[50px] min-w-0 text-center">
            <Dialog>
              <DialogTrigger className="font-medium text-primary">
                View
              </DialogTrigger>
              <DialogContent className="max-w-7xl">
                <DialogHeader className="text-lg font-medium text-zinc-700">
                  Leave Request
                </DialogHeader>

                <DataTable
                  columns={leaveReqDetailColumns}
                  data={staffLeaves?.data?.filter(
                    (staff) => staff?.user_id === row?.original?.user_id
                  )}
                  border
                  headerSticky
                />
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];

  const memberColumns: ColumnDef<ITeamMemberDetails>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: (props) => (
        <SerialNumberCell {...props} pageNumber={1} perPage={50} />
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
    // Utilized hours percentage
    {
      id: "utilized_hours",
      accessorKey: "utilized_hours",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>
            Utilized Work
            <br />
            Hours %
          </p>
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
      cell: ({ row }) => <div>{row?.getValue("utilized_hours")}%</div>,
    },
    // Work-load Remarks
    {
      id: "work_load",
      accessorKey: "work_load",
      header: () => (
        <div>
          Work-Load
          <br />
          Time Graph
        </div>
      ),
      cell: ({ row }) => <WorkLoadChart data={row?.original} />,
    },
  ];

  return {
    // STATES
    searchText,
    setSearchText,
    department,
    setDepartment,
    // APIS
    staffLeaves,
    staffLeavesLoading,
    teamMemberList,
    teamMemberListLoading,

    // Columns
    leaveReqColumns,
    memberColumns,

    //
    memberUtilizationData,
  };
};
export default useHrDashboard;
