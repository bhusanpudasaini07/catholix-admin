import { IProjectUserStories } from "@/interface/project-interface";
import { getProjectStories } from "@/services/project/project-service";
import { calculateTimeLog } from "@/shared/utils/rp-utils";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const useProjectStories = () => {
  const router = useRouter();
  const { code } = router.query;

  const SerialNumberCell = ({ row }: any) => {
    const rowIndex = row.index;
    const serialNumber = rowIndex + 1;
    return <div className="text-color">{serialNumber}.</div>;
  };

  const { data: projectStories, isLoading } = useQuery({
    queryFn: async () => {
      if (code) {
        const response = await getProjectStories(code);
        return response;
      }
    },
    queryKey: ["projectStories", code],
  });
  const columns: ColumnDef<IProjectUserStories>[] = [
    // S.N
    {
      id: "sn",
      accessorKey: "S_N",
      header: "S. No.",
      cell: (props) => <SerialNumberCell {...props} />,
      enableHiding: false,
    },
    // Stories
    {
      id: "title",
      accessorKey: "title",
      header: "Stories",
      cell: ({ row }) => (
        <div className="max-w-[300px] min-w-0">
          <Link
            href={row?.original?.repo_issue_url}
            target="_blank"
            className="block truncate text-primary hover:text-blue-800"
          >
            {row.getValue("title")}
          </Link>
        </div>
      ),
      enableHiding: false,
    },
    // Estimated
    {
      id: "estimated_time",
      accessorKey: "estimated_time",
      header: "Estimated Time",
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(
          row.getValue("estimated_time")
        );
        return <div>{`${hours}H ${minutes}M`}</div>;
      },
      enableHiding: false,
    },
    // Time Spent
    {
      id: "spent_time",
      accessorKey: "spent_time",
      header: "Time Spent",
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(row.getValue("spent_time"));
        return <div>{`${hours}H ${minutes}M`}</div>;
      },
      enableHiding: false,
    },
    // Task
    {
      id: "task_count",
      accessorKey: "task_count",
      header: "Task",
      cell: ({ row }) => (
        <div className={cn(row?.getValue("task_count") ? "text-blue-500" : "")}>
          {row?.getValue("task_count")} Task/s
        </div>
      ),
      enableHiding: false,
    },
    // Bugs
    {
      id: "bug_count",
      accessorKey: "bug_count",
      header: "Bugs",
      cell: ({ row }) => (
        <div
          className={cn(row?.getValue("bug_count") ? "text-orange-500" : "")}
        >
          {row.getValue("bug_count")} Bug/s
        </div>
      ),
      enableHiding: false,
    },
  ];
  return {
    columns,
    projectStories,
    isLoading,
  };
};

export default useProjectStories;
