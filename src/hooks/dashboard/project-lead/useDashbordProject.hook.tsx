import { IProjectDetail, IProjectProps } from "@/interface/project-interface";
import {
  getProjectDetail,
  getProjectList,
} from "@/services/project/project-service";
import { Button } from "@/shared/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";

interface IProjectDetailProps {
  data: IProjectDetail;
}

const useProjectViewDashboard = () => {
  // STATES
  const [projectStatus, setProjectStatus] = useState("all");
  const [projectCode, setProjectCode] = useState("");

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
    });

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

  const deadlineColumn: ColumnDef<any>[] = [
    {
      accessorKey: "task",
      header: "Task",
      cell: ({ row }) => (
        <div className="min-w-[300px]">{row?.getValue("task")}</div>
      ),
    },
    {
      accessorKey: "assignee",
      header: "Assignee",
      cell: ({ row }) => <div>{row?.getValue("assignee")}</div>,
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }) => <div>{row?.getValue("deadline")}</div>,
    },
    {
      accessorKey: "completion_chances",
      header: "Completion Chances",
      cell: ({ row }) => (
        <div className="max-w-[100px]">
          {row?.getValue("completion_chances")}
        </div>
      ),
    },
  ];

  const timeLogSummaryColumn: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Team Member",
      cell: ({ row }) => (
        <div className="min-w-[300px]">{row?.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "total_task",
      header: "Total Task",
      cell: ({ row }) => <div>{row?.getValue("total_task")}</div>,
    },
    {
      accessorKey: "open_task",
      header: "Open Task",
      cell: ({ row }) => <div>{row?.getValue("open_task")}</div>,
    },
    {
      accessorKey: "closed_task",
      header: "Closed Task",
      cell: ({ row }) => (
        <div className="max-w-[100px]">{row?.getValue("closed_task")}</div>
      ),
    },
    {
      accessorKey: "utilization_percent",
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
          {row?.getValue("utilization_percent")}
        </div>
      ),
    },
    {
      accessorKey: "time_log",
      header: "Time-Log",
      cell: ({ row }) => (
        <div className="max-w-[100px]">{row?.getValue("time_log")}</div>
      ),
    },
  ];

  return {
    // STATES
    projectStatus,
    setProjectStatus,
    projectCode,
    setProjectCode,

    // FUNCTIONS
    gaugeColor,

    // API
    projectList,
    projectListLoading,
    projectDetail,
    projectDetailLoading,

    // Data table columns
    deadlineColumn,
    timeLogSummaryColumn,
  };
};

export default useProjectViewDashboard;
