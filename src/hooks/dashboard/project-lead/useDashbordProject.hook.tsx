import WorkLoadChart from "@/features/User-Management/team-members/page-body/work-load-chart";
import {
  IProjectDetail,
  IProjectProps,
  IProjectSprint,
  IProjectSprintTaskDetails,
  IProjectSprintTasks,
} from "@/interface/project-interface";
import { ITeamMemberList } from "@/interface/team-member-interface";
import {
  getProjectDetail,
  getProjectList,
  getProjectSprintTasks,
  getProjectSprints,
} from "@/services/project/project-service";
import { getTeamMembersList } from "@/services/user-management/team-member/team-member-service";
import GraphSkeleton from "@/shared/components/skeleton-loading/graph-skeleton";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { hoursMinuteFormatter, taskDueDeadline } from "@/shared/utils/rp-utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

interface IProjectDetailProps {
  data: IProjectDetail;
}

const useProjectViewDashboard = () => {
  // STATES
  const [projectStatus, setProjectStatus] = useState("all");
  const [projectCode, setProjectCode] = useState("");
  const [sprintId, setSprintId] = useState("");
  const [deadlineTab, setDeadlineTab] = useState("all");
  const [projectMembersId, setProjectMembersId] = useState("");

  // Projects List in side
  const { data: projectList, isLoading: projectListLoading } =
    useQuery<IProjectProps>({
      queryFn: () =>
        getProjectList(
          1,
          50,
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          projectStatus === "all" ? "" : projectStatus
        ),
      queryKey: ["projectList", projectStatus],
      onSuccess: (data) => {
        setProjectCode(data?.data[0]?.code);
      },
    });

  // Project Details
  const { data: projectDetail, isLoading: projectDetailLoading } =
    useQuery<IProjectDetailProps>({
      queryFn: async () => {
        if (projectCode) {
          const response = await getProjectDetail(projectCode);
          return response;
        }
      },
      queryKey: ["projectDetail", projectCode],
      onSuccess: (data) => {
        const idArray = data?.data?.assigned_roles_members
          ?.map((member) => member?.role_user?.id)
          .join(",");

        setProjectMembersId(idArray);
      },
    });

  // project sprints
  const { data: projectSprints, isLoading: projectSprintLoading } =
    useQuery<IProjectSprint>({
      queryFn: async () => {
        if (projectCode) {
          const response = await getProjectSprints(projectCode);
          return response;
        }
      },
      queryKey: ["projectSprints", projectCode],
      onSuccess: (data) => {
        setSprintId(data?.data[data?.data.length - 1]?.id);
      },
    });

  // Prohject sprint tasks
  const { data: projectSprintTasks, isLoading: projectSprintTaskLoading } =
    useQuery<IProjectSprintTasks>({
      queryFn: async () => {
        if (sprintId) {
          const response = await getProjectSprintTasks(
            projectCode,
            50, //data per page
            sprintId,
            "Open" //status
          );
          return response;
        }
      },
      queryKey: ["projectSprintTasks", sprintId, projectCode],
    });

  // Member time logs
  const { data: memberTimeLogs, isLoading: memberTimeLogsLoading } =
    useQuery<ITeamMemberList>({
      queryFn: async () => {
        if (projectDetail) {
          const response = await getTeamMembersList(
            20,
            1,
            "",
            moment().subtract(2, "weeks").format("YYYY-MM-DD"), //date_from
            moment().format("YYYY-MM-DD"), //date_to,
            "", //department_id
            projectMembersId //staff_ids
          );
          return response;
        }
      },
      queryKey: [
        "memberTimeLogs",
        projectCode,
        projectDetail,
        projectMembersId,
      ],
    });

  // Filtering sprint task according to deadline
  const filteredProjectSprintTasks = useMemo(() => {
    if (!projectSprintTasks?.data) return [];

    switch (deadlineTab) {
      case "all":
        return projectSprintTasks.data?.tasks;
      case "today":
        return projectSprintTasks.data?.tasks?.filter(
          (task) =>
            taskDueDeadline(task.deadline).props.className === "text-orange-500"
        );
      case "missed":
        return projectSprintTasks.data?.tasks?.filter(
          (task) =>
            taskDueDeadline(task.deadline).props.className === "text-red-500"
        );
      default:
        return [];
    }
  }, [projectSprintTasks, deadlineTab]);

  const gaugeColor = () => {
    let color = "";
    if (projectDetail?.data?.health?.overall_completion_percentage) {
      if (projectDetail?.data?.health?.overall_completion_percentage >= 80) {
        color = "#15803D";
      } else if (
        projectDetail?.data?.health?.overall_completion_percentage >= 40 &&
        projectDetail?.data?.health?.overall_completion_percentage < 80
      ) {
        color = "#FD850A ";
      } else {
        color = "#EF4444";
      }
    }

    return color;
  };

  const deadlineColumn: ColumnDef<IProjectSprintTaskDetails>[] = [
    // Task
    {
      id: "task",
      accessorKey: "task",
      header: "Task",
      cell: ({ row }) => (
        <div className="max-w-[300px]">
          <p className="text-xs text-zinc-500">
            {row?.original?.sprint_id
              ? projectSprints?.data?.find(
                  (sprint) => sprint?.id === row?.original?.sprint_id
                )?.name
              : ""}
          </p>
          <Link
            className="text-sm font-medium text-primary hover:text-blue-700"
            href={`${row?.original?.task_url}`}
            target="_blank"
          >
            {row?.original?.title}
          </Link>

          <div className="flex flex-wrap gap-2 items-center mt-0.5">
            {row?.original?.label?.map((label, index) => (
              <Badge
                style={{
                  backgroundColor: `${label?.color}20`,
                  color: label?.color,
                  borderColor: `${label?.color}4D`,
                }}
                key={index}
                className="py-0.5 rounded-md text-xs"
              >
                {label?.title}
              </Badge>
            ))}
          </div>
        </div>
      ),
    },
    // Assignee
    {
      id: "assignee",
      accessorKey: "assignee",
      header: "Assignee",
      cell: ({ row }) => (
        <Link
          href={`/staffs/${row?.original?.assignee?.username}`}
          className="font-medium hover:text-primary"
        >
          {row?.original?.assignee?.fullname}
        </Link>
      ),
    },
    // Deadline
    {
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }) => (
        <div className="font-medium w-[100px]">
          <p>
            {row?.getValue("deadline")
              ? moment(row?.getValue("deadline")).format("ll")
              : "-"}
          </p>

          <p>
            {row?.getValue("deadline")
              ? taskDueDeadline(row?.getValue("deadline"))
              : ""}
          </p>
        </div>
      ),
    },
    // Completion Chances
    // {
    //   accessorKey: "completion_chances",
    //   header: ({ column }) => (
    //     <div>
    //       Completion <br /> Chances
    //     </div>
    //   ),
    //   cell: ({ row }) => (
    //     <div className="max-w-[100px]">
    //       {row?.getValue("completion_chances")}
    //     </div>
    //   ),
    // },
    // Estimated Time
    {
      accessorKey: "estimated_time",
      header: ({ column }) => (
        <div>
          Estimated <br /> Time
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="w-[80px] font-medium">
            {hoursMinuteFormatter(row?.getValue("estimated_time") ?? 0)}
          </div>
        );
      },
    },
  ];

  const memberTimeLogRevisedData = useMemo(() => {
    const revisedData = projectDetail?.data?.assigned_roles_members?.map(
      (member) => ({
        role: member?.role_name,
        id: member?.role_user?.id,
        name: member?.role_user?.fullname,
        username: member?.role_user?.username,
        total_task:
          Number(member?.role_user?.open_task_count) +
          Number(member?.role_user?.closed_task_count),
        open_task: member?.role_user?.open_task_count,
        closed_task: member?.role_user?.closed_task_count,
        utilization_percentage: (
          (member?.role_user?.closed_task_count /
            (Number(member?.role_user?.open_task_count) +
              Number(member?.role_user?.closed_task_count))) *
          100
        ).toFixed(2),
      })
    );
    return revisedData;
  }, [projectDetail]);

  const timeLogSummaryColumn: ColumnDef<any>[] = [
    // Name
    {
      accessorKey: "name",
      header: "Team Member",
      cell: ({ row }) => (
        <div className="w-[200px]">
          <Link
            href={`/staffs/${row?.original?.username}`}
            className="font-semibold text-primary hover:text-blue-700"
          >
            {row?.original?.name}
          </Link>
          <p className="text-xs text-zinc-500">{row?.original?.role}</p>
          {/* <div></div> */}
        </div>
      ),
    },
    // Total Task
    {
      accessorKey: "total_task",
      header: "Total Task",
      cell: ({ row }) => (
        <div className="font-medium">{row?.getValue("total_task")}</div>
      ),
    },
    // Open
    {
      accessorKey: "open_task",
      header: "Open Task",
      cell: ({ row }) => (
        <div className="font-medium cursor-pointer text-primary">
          {row?.getValue("open_task")}
        </div>
      ),
    },
    // Closed
    {
      accessorKey: "closed_task",
      header: "Closed Task",
      cell: ({ row }) => (
        <div className="max-w-[100px] font-medium">
          {row?.getValue("closed_task")}
        </div>
      ),
    },
    // Utlization
    {
      accessorKey: "utilization_percentage",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>
            Utilization <br />%
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
      cell: ({ row }) => (
        <div className="max-w-[100px]">
          {isNaN(row?.getValue("utilization_percentage"))
            ? "-"
            : `${row?.getValue("utilization_percentage")}%`}
        </div>
      ),
    },
    // Time Log
    {
      accessorKey: "time_log",
      header: "Time-Log",
      cell: ({ row }) => {
        const workLoadData = memberTimeLogs?.data?.find(
          (member) => member?.id === row?.original?.id
        );
        return (
          <>
            {memberTimeLogsLoading ? (
              <Skeleton className="w-[150px] h-10" />
            ) : (
              workLoadData && <WorkLoadChart data={workLoadData} />
            )}
          </>
        );
      },
    },
  ];

  return {
    // STATES
    projectStatus,
    setProjectStatus,
    projectCode,
    setProjectCode,
    sprintId,
    setSprintId,
    deadlineTab,
    setDeadlineTab,

    // FUNCTIONS
    gaugeColor,

    // API
    projectList,
    projectListLoading,
    projectDetail,
    projectDetailLoading,
    projectSprints,
    projectSprintLoading,
    projectSprintTasks,
    projectSprintTaskLoading,
    memberTimeLogRevisedData,
    filteredProjectSprintTasks,
    memberTimeLogs,
    memberTimeLogsLoading,

    // Data table columns
    deadlineColumn,
    timeLogSummaryColumn,
  };
};

export default useProjectViewDashboard;
