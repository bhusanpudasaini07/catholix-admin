import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import { IProjectUserStories } from "@/interface/project-interface";
import { getProjectStories } from "@/services/project/project-service";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Badge } from "@/shared/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { calculateTimeLog } from "@/shared/utils/rp-utils";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";

const useProjectStories = () => {
  const router = useRouter();
  const { code } = router.query;

  const [perPage, setPerPage] = useState(10);

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
  // project details page column
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
            className="block font-medium truncate text-primary hover:text-blue-800"
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
        <div
          className={cn(
            row?.getValue("task_count") ? "text-blue-500 font-medium" : ""
          )}
        >
          {row?.getValue("task_count") !== 0 ? (
            <Dialog>
              <DialogTrigger>
                <div className={"font-medium text-blue-500"}>
                  {row?.getValue("task_count")} Task/s
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[1200px]">
                <DialogHeader>
                  <DialogTitle>{row?.getValue("title")}</DialogTitle>
                </DialogHeader>
                <div className="flex gap-8 justify-end items-center">
                  <p className="text-sm text-zinc-500">
                    Task #{" "}
                    <span className="text-base font-medium text-zinc-700">
                      {row?.original?.task_count}
                    </span>
                  </p>
                  <p className="text-sm text-zinc-500">
                    Bugs #{" "}
                    <span className="text-base font-medium text-zinc-700">
                      {row?.original?.bug_count}
                    </span>
                  </p>
                </div>
                <div className="">
                  <DataTable
                    border={true}
                    columns={taskColumns}
                    loading={isLoading}
                    headerSticky={true}
                    height="max-h-[400px]"
                    data={row?.original?.tasks ?? []}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <p className="font-medium">{row?.getValue("task_count")} Task/s</p>
          )}
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
          className={cn(
            row?.getValue("bug_count") ? "text-orange-500 font-medium" : ""
          )}
        >
          {row.getValue("bug_count")} Bug/s
        </div>
      ),
      enableHiding: false,
    },
  ];

  const taskColumns: ColumnDef<any>[] = [
    // Date
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="max-w-[300px] min-w-0">
          <p className="text-sm font-medium text-zinc-700">
            {moment(row.getValue("date"))?.format("YYYY-MM-DD")}
          </p>
          <p className="text-sm font-normal text-zinc-700">
            {moment(row.getValue("date"))?.format("HH:mm:ss")}
          </p>
        </div>
      ),
    },
    // Task
    {
      id: "title",
      accessorKey: "title",
      header: "Task",
      cell: ({ row }) => (
        <div className="max-w-[400px] min-w-0">
          <Link
            href={row?.original?.url}
            target="_blank"
            className="block font-medium text-primary hover:text-blue-800"
          >
            {row.getValue("title")}
          </Link>
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
              row?.getValue("status") === "Closed" &&
                "bg-green-100 border-green-500 text-green-500 rounded-md",
              row?.getValue("status") === "Open" &&
                "bg-blue-100 border-blue-500 text-blue-500 rounded-md"
            )}
          >
            {row.getValue("status")}
          </Badge>
        </div>
      ),
    },
    //Estimated Time
    {
      id: "estimated_time",
      accessorKey: "estimated_time",
      header: "Estimated Time",
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(
          row.getValue("estimated_time")
        );
        return (
          <div className="max-w-[300px] min-w-0">
            {hours}H {minutes}M
          </div>
        );
      },
    },
    // Spent Time
    {
      id: "spent_time",
      accessorKey: "spent_time",
      header: "Time Spent",
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(row.getValue("spent_time"));
        return (
          <div className="max-w-[300px] min-w-0">
            {hours}H {minutes}M
          </div>
        );
      },
    },
  ];

  // inner page column
  const storiesDetailsColumns: ColumnDef<IProjectUserStories>[] = [
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
        <div className="max-w-[800px] min-w-0">
          <Link
            href={row?.original?.repo_issue_url}
            target="_blank"
            className="block font-medium truncate text-primary hover:text-blue-800"
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
        <div className="">
          {row?.getValue("task_count") !== 0 ? (
            <Dialog>
              <DialogTrigger>
                <div className={"font-medium text-blue-500"}>
                  {row?.getValue("task_count")} Task/s
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[1200px]">
                <DialogHeader>
                  <DialogTitle>{row?.getValue("title")}</DialogTitle>
                </DialogHeader>
                <div className="flex gap-8 justify-end items-center">
                  <p className="text-sm text-zinc-500">
                    Task #{" "}
                    <span className="text-base font-medium text-zinc-700">
                      {row?.original?.task_count}
                    </span>
                  </p>
                  <p className="text-sm text-zinc-500">
                    Bugs #{" "}
                    <span className="text-base font-medium text-zinc-700">
                      {row?.original?.bug_count}
                    </span>
                  </p>
                </div>
                <div className="">
                  <DataTable
                    border={true}
                    columns={taskColumns}
                    loading={isLoading}
                    headerSticky={true}
                    height="max-h-[400px]"
                    data={row?.original?.tasks ?? []}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <p className="font-medium">{row?.getValue("task_count")} Task/s</p>
          )}
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
        <div>
          {row?.getValue("bug_count") ? (
            <Dialog>
              <DialogTrigger>
                <div className={"font-medium text-orange-500"}>
                  {row?.getValue("bug_count")} Bug/s
                </div>
              </DialogTrigger>
              <DialogContent className="min-w-[1200px]">
                <DialogHeader>
                  <DialogTitle>{row?.getValue("title")}</DialogTitle>
                </DialogHeader>
                <div className="flex gap-8 justify-end items-center">
                  <p className="text-sm text-zinc-500">
                    Task #{" "}
                    <span className="text-base font-medium text-zinc-700">
                      {row?.original?.task_count}
                    </span>
                  </p>
                  <p className="text-sm text-zinc-500">
                    Bugs #{" "}
                    <span className="text-base font-medium text-zinc-700">
                      {row?.original?.bug_count}
                    </span>
                  </p>
                </div>
                <div className="">
                  <DataTable
                    border={true}
                    columns={taskColumns}
                    loading={isLoading}
                    height="max-h-[400px]"
                    data={row?.original?.tasks ?? []}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <p className="font-medium">{row?.getValue("bug_count")} Bug/s</p>
          )}
        </div>
      ),
      enableHiding: false,
    },
  ];
  return {
    columns,
    projectStories,
    isLoading,
    storiesDetailsColumns,
    perPage,
    setPerPage,
  };
};

export default useProjectStories;
