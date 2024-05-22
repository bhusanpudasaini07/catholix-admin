import WorkLoadChart from "@/features/User-Management/team-members/page-body/work-load-chart";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const useDhDashboard = () => {
  // Missed Deadline Columns
  const missedDeadlineColumns: ColumnDef<any>[] = [
    {
      id: "assignee",
      accessorKey: "assignee",
      header: "Assignee",
      cell: ({ row }) => <div>{row?.getValue("assignee")}</div>,
    },
    {
      id: "project_count",
      accessorKey: "project_count",
      header: "No. of Projects",
      cell: ({ row }) => <div>#{row?.getValue("project_count")}</div>,
    },
    {
      id: "missed_deadlines",
      accessorKey: "missed_deadlines",
      header: "Deadlines Missed",
      cell: ({ row }) => <div>#{row?.getValue("missed_deadlines")}</div>,
    },
  ];

  const memberTimeLogSummaryColumns: ColumnDef<any>[] = [
    {
      id: "fullname",
      accessorKey: "fullname",
      header: "Team Member",
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
            Dots here
          </div>
        </div>
      ),
    },
    // total Task
    {
      id: "total_task",
      accessorKey: "total_task",
      header: () => <div>Total Task</div>,
    },
    // Open Task
    {
      id: "open_task",
      accessorKey: "open_task",
      header: () => <div>Added Task</div>,
    },
    // Closed Task
    {
      id: "closed",
      accessorKey: "closed",
      header: () => <div>Closed Task</div>,
    },
    // Bug %
    {
      id: "bug_percentage",
      accessorKey: "bug_percentage",
      header: () => <div>Bug %</div>,
    },
    // Utilization %
    {
      id: "utilization_percentage",
      accessorKey: "utilization_percentage",
      header: () => <div>Utilization %</div>,
    },
    // Work-load Remarks
    {
      id: "work_load",
      accessorKey: "work_load",
      header: () => <div>Time-Log</div>,
      cell: ({ row }) => <WorkLoadChart data={row?.original} />,
    },
  ];

  const taskMissedDeadlinesColumns: ColumnDef<any>[] = [
    // Task
    {
      id: "title",
      accessorKey: "title",
      header: "Task",
      cell: ({ row }) => (
        <Link
          href={"/"}
          className="font-medium text-primary hover:text-blue-700"
        >
          {row?.getValue("title")}
        </Link>
      ),
    },
    // Assignee
    {
      id: "assignee",
      accessorKey: "assignee",
      header: "Assignee",
      cell: ({ row }) => (
        <div className="font-medium">{row?.getValue("assignee")}</div>
      ),
    },
    // Deadline
    {
      id: "deadline",
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }) => (
        <div className="font-medium">{row?.getValue("deadline")}</div>
      ),
    },
    // Completion CHances
    {
      id: "chances",
      accessorKey: "chances",
      header: () => (
        <div>
          Completion <br /> Chances
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row?.getValue("deadline")}</div>
      ),
    },
  ];
  return {
    // Columns
    missedDeadlineColumns,
    memberTimeLogSummaryColumns,
    taskMissedDeadlinesColumns,
  };
};

export default useDhDashboard;
