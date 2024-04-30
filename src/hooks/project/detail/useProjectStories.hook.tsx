import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { useDebounce } from "@/hooks/debounce.hooks";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Progress } from "@/shared/components/ui/progress";
import { EChartsInstance } from "echarts-for-react";

interface IProps {
  data: IProjectUserStories[];
}

const useProjectStories = () => {
  const router = useRouter();
  const { code } = router.query;
  const occupancyChartRef = useRef<EChartsInstance>(null);

  // STATES
  const [perPage, setPerPage] = useState(20);
  const [searchText, setSearchText] = useState("");
  const [sorting, setSorting] = useState({
    key: "",
    order: "",
  });
  const [status, setStatus] = useState("all");
  // REF for Chart

  const debounchedSearch = useDebounce(searchText, 300);

  // FUNCTIONS
  const SerialNumberCell = ({ row }: any) => {
    const rowIndex = row.index;
    const serialNumber = rowIndex + 1;
    return (
      <div className="whitespace-nowrap text-color">US {serialNumber}</div>
    );
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };
  const clearFilters = () => {
    setSorting({ key: "", order: "" });
    setStatus("all");
    setSearchText("");
  };

  const sortTable = (key: string, order: string) => {
    setSorting({ key, order });
  };

  // APIS and COLUMNS
  const { data: projectStories, isLoading } = useQuery<IProps>({
    queryFn: async () => {
      if (code) {
        const response = await getProjectStories(
          code,
          searchText, // keyword
          sorting?.key, // sort_key
          sorting?.order, // order asc|desc
          status === "all" ? "" : status //status
        );
        return response;
      }
    },
    queryKey: ["projectStories", code, debounchedSearch, sorting, status],
  });

  // project details page column
  const columns: ColumnDef<IProjectUserStories>[] = [
    // S.N
    {
      id: "sn",
      accessorKey: "S_N",
      header: "US",
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
    //Estimated Time
    {
      id: "percent_consumed",
      accessorKey: "percent_consumed",
      header: () => (
        <div>
          % of <br /> Estimate Consumed
        </div>
      ),
      cell: ({ row }) => {
        const estimatedTime = row.original?.estimated_time;
        const spentTime = row.original?.spent_time;
        const percentageCompletion = (spentTime / estimatedTime) * 100;
        return (
          <div className="font-medium">{percentageCompletion.toFixed(2)}%</div>
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
      header: "US",
      cell: (props) => <SerialNumberCell {...props} />,
      enableHiding: false,
    },
    // Stories
    {
      id: "title",
      accessorKey: "title",
      header: "Stories",
      cell: ({ row }) => (
        <div className="max-w-[500px] min-w-0">
          <Link
            href={row?.original?.repo_issue_url}
            target="_blank"
            className="block font-medium text-primary hover:text-blue-800"
          >
            {row.getValue("title")}
          </Link>
        </div>
      ),
      enableHiding: false,
    },
    // Status
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          className={cn(
            row?.getValue("status") === "Closed" &&
              "bg-green-100 border-green-500 text-green-500 rounded-md",
            row?.getValue("status") === "In Progress" &&
              "bg-blue-100 border-blue-500 text-blue-500 rounded-md",
            row?.getValue("status") === "Open" &&
              "bg-orange-100 border-orange-500 text-orange-700 rounded-md",
            "whitespace-nowrap"
          )}
        >
          {row.getValue("status")}
        </Badge>
      ),
      enableHiding: false,
    },
    // Task Status
    {
      id: "task_status",
      accessorKey: "task_status",
      header: "Task Status",
      cell: ({ row }) => {
        const barData =
          (Number(row?.original?.closed_task_count) /
            Number(row?.original?.task_count)) *
          100;

        return (
          <div className="w-[180px]">
            <Dialog>
              <DialogTrigger>
                <p className="mb-1 text-sm text-primary">
                  Total Task {row?.original?.task_count}
                </p>
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
                    headerSticky
                    columns={taskColumns}
                    loading={isLoading}
                    height="max-h-[400px]"
                    data={row?.original?.tasks ?? []}
                  />
                </div>
              </DialogContent>
            </Dialog>

            <Progress
              className={cn(
                row?.original?.task_count === 0
                  ? "bg-gray-300"
                  : "bg-[#5470C6]",
                "h-1.5 [&>div]:bg-green-500"
              )}
              value={isNaN(barData) ? 0 : barData}
            />

            <div className="mt-2">
              <p className="flex gap-2 items-center">
                <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
                <span className="text-green-500">
                  {row?.original?.closed_task_count}
                </span>
                <span className="text-xs font-medium text-zinc-600">
                  Closed Task
                </span>
              </p>
              p
              <p className="flex gap-2 items-center">
                <span className="w-3 h-3 bg-[#5470C6] rounded-sm"></span>
                <span className="text-[#5470C6]">
                  {row?.original?.open_task_count}
                </span>
                <span className="text-xs font-medium text-zinc-600">
                  Open Task
                </span>
              </p>
            </div>
          </div>
        );
      },
      enableHiding: true,
    },
    // Bugs
    {
      id: "bug_count",
      accessorKey: "bug_count",
      header: () => (
        <div className="flex gap-3 items-center">
          <p>Bugs</p>
          <Button
            onClick={() =>
              sortTable("bug_count", sorting.order === "asc" ? "desc" : "asc")
            }
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                sorting?.key === "bug_count" && sorting.order === "desc"
                  ? 3
                  : sorting.order === "asc"
                  ? 1
                  : 1
              }
              stroke={
                sorting?.key === "bug_count" && sorting.order === "desc"
                  ? "#71717A"
                  : sorting.order === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                sorting?.key === "bug_count" && sorting?.order === "asc"
                  ? 3
                  : sorting?.order === "desc"
                  ? 1
                  : 1
              }
              stroke={
                sorting?.key === "bug_count" && sorting?.order === "asc"
                  ? "#71717A"
                  : sorting?.order === "desc"
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
                    headerSticky
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
    // Bugs to task ratio
    {
      id: "bug_task_ratio",
      accessorKey: "bug_task_ratio",
      header: () => (
        <div className="flex gap-3 items-center">
          <p>
            Bugs to <br />
            Task Ratio %
          </p>
        </div>
      ),
      cell: ({ row }) => {
        const ratio = row?.original?.bug_count / row?.original?.task_count;
        return <div className="font-medium">{ratio.toFixed(2)}</div>;
      },
      enableHiding: false,
    },
    // Estimated
    {
      id: "estimated_time",
      accessorKey: "estimated_time",
      header: () => (
        <div className="flex gap-3 items-center">
          <p>
            Total <br />
            Estimated Time
          </p>
          <Button
            onClick={() =>
              sortTable(
                "estimated_time",
                sorting.order === "asc" ? "desc" : "asc"
              )
            }
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                sorting?.key === "estimated_time" && sorting.order === "desc"
                  ? 3
                  : sorting.order === "asc"
                  ? 1
                  : 1
              }
              stroke={
                sorting?.key === "estimated_time" && sorting.order === "desc"
                  ? "#71717A"
                  : sorting.order === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                sorting?.key === "estimated_time" && sorting?.order === "asc"
                  ? 3
                  : sorting?.order === "desc"
                  ? 1
                  : 1
              }
              stroke={
                sorting?.key === "estimated_time" && sorting?.order === "asc"
                  ? "#71717A"
                  : sorting?.order === "desc"
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
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(
          row.getValue("estimated_time")
        );
        return <div className="font-medium">{`${hours}H ${minutes}M`}</div>;
      },
      enableHiding: false,
    },
    // Time Spent
    {
      id: "spent_time",
      accessorKey: "spent_time",
      header: () => (
        <div className="flex gap-3 items-center">
          <p>
            Total <br />
            Time Spent
          </p>
          <Button
            onClick={() =>
              sortTable("spent_time", sorting.order === "asc" ? "desc" : "asc")
            }
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                sorting?.key === "spent_time" && sorting.order === "desc"
                  ? 3
                  : sorting.order === "asc"
                  ? 1
                  : 1
              }
              stroke={
                sorting?.key === "spent_time" && sorting.order === "desc"
                  ? "#71717A"
                  : sorting.order === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                sorting?.key === "spent_time" && sorting?.order === "asc"
                  ? 3
                  : sorting?.order === "desc"
                  ? 1
                  : 1
              }
              stroke={
                sorting?.key === "spent_time" && sorting?.order === "asc"
                  ? "#71717A"
                  : sorting?.order === "desc"
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
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(row.getValue("spent_time"));
        return <div className="font-medium">{`${hours}H ${minutes}M`}</div>;
      },
      enableHiding: false,
    },
    //Estimate to complete
    {
      id: "estimate_complete",
      accessorKey: "estimate_complete",
      header: () => (
        <div>
          % of Estimate <br /> Consumed
        </div>
      ),
      cell: ({ row }) => {
        const estimatedTime = row.original?.estimated_time;
        const spentTime = row.original?.spent_time;
        const percentageCompletion = (spentTime / estimatedTime) * 100;
        return (
          <div
            className={cn(
              "font-medium",
              percentageCompletion > 100 && "text-red-500"
            )}
          >
            {percentageCompletion.toFixed(2)}%
          </div>
        );
      },
    },
    // // Task
    // {
    //   id: "task_count",
    //   accessorKey: "task_count",
    //   header: () => (
    //     <div className="flex gap-3 items-center">
    //       <p>Task</p>
    //       <Button
    //         onClick={() =>
    //           sortTable("task_count", sorting.order === "asc" ? "desc" : "asc")
    //         }
    //         variant={"ghost"}
    //         className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
    //       >
    //         <ChevronUp
    //           size={13}
    //           strokeWidth={
    //             sorting?.key === "task_count" && sorting.order === "desc"
    //               ? 3
    //               : sorting.order === "asc"
    //               ? 1
    //               : 1
    //           }
    //           stroke={
    //             sorting?.key === "task_count" && sorting.order === "desc"
    //               ? "#71717A"
    //               : sorting.order === "asc"
    //               ? "#C9C9D4"
    //               : "#71717A"
    //           }
    //         />
    //         <ChevronDown
    //           strokeWidth={
    //             sorting?.key === "task_count" && sorting?.order === "asc"
    //               ? 3
    //               : sorting?.order === "desc"
    //               ? 1
    //               : 1
    //           }
    //           stroke={
    //             sorting?.key === "task_count" && sorting?.order === "asc"
    //               ? "#71717A"
    //               : sorting?.order === "desc"
    //               ? "#C9C9D4"
    //               : "#71717A"
    //           }
    //           size={13}
    //           className="-mt-[4px]"
    //         />
    //         {/* <ChevronsUpDown size={16} /> */}
    //       </Button>
    //     </div>
    //   ),
    //   cell: ({ row }) => (
    //     <div className="">
    //       {row?.getValue("task_count") !== 0 ? (
    //         <Dialog>
    //           <DialogTrigger>
    //             <div className={"font-medium text-blue-500"}>
    //               {row?.getValue("task_count")} Task/s
    //             </div>
    //           </DialogTrigger>
    //           <DialogContent className="max-w-[1200px]">
    //             <DialogHeader>
    //               <DialogTitle>{row?.getValue("title")}</DialogTitle>
    //             </DialogHeader>
    //             <div className="flex gap-8 justify-end items-center">
    //               <p className="text-sm text-zinc-500">
    //                 Task #{" "}
    //                 <span className="text-base font-medium text-zinc-700">
    //                   {row?.original?.task_count}
    //                 </span>
    //               </p>
    //               <p className="text-sm text-zinc-500">
    //                 Bugs #{" "}
    //                 <span className="text-base font-medium text-zinc-700">
    //                   {row?.original?.bug_count}
    //                 </span>
    //               </p>
    //             </div>
    //             <div className="">
    //               <DataTable
    //                 border={true}
    //                 columns={taskColumns}
    //                 loading={isLoading}
    //                 headerSticky={true}
    //                 height="max-h-[400px]"
    //                 data={row?.original?.tasks ?? []}
    //               />
    //             </div>
    //           </DialogContent>
    //         </Dialog>
    //       ) : (
    //         <p className="font-medium">{row?.getValue("task_count")} Task/s</p>
    //       )}
    //     </div>
    //   ),
    //   enableHiding: false,
    // },
  ];

  // occupancy chart option
  const storyOccupancyOption = {
    tooltip: {
      trigger: "item",
    },
    color: [
      "#0891B2",
      "#FACC15",
      "#84CC16",
      "#2DD4BF",
      "#818CF8",
      "#7C3AED",
      "#D8B4FE",
      "#F472B6",
      "#FB923C",
      "#F87171",
      "#A8A29E",
    ],
    series: [
      {
        name: "Project Stories",
        type: "pie",
        radius: ["45%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          fontSize: 20,
          formatter: (item: any) => {
            return (
              "{a|" +
              ((item?.value ? item?.value : 0) || 0) +
              "%" +
              "}\n{b|" +
              (item?.name || "") +
              "}"
            );
          },
          rich: {
            a: {
              fontSize: 25,
              color: "#3F3F46",
              lineHeight: 20,
              fontWeight: 600,
            },
            b: {
              fontSize: 14,
              color: "#3F3F46",
              lineHeight: 30,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        labelLine: {
          show: false,
          length2: 0,
          length: 10,
        },
        data: projectStories?.data.slice(0, 10).map((story, index) => {
          const totalTime = projectStories?.data
            ?.slice(0, 10)
            ?.reduce((acc, curr) => {
              return acc + curr.spent_time;
            }, 0);
          const usedPercentage = (story?.spent_time / totalTime) * 100;

          return {
            value: usedPercentage.toFixed(2),
            name: `US ${index + 1}`,
          };
        }),
      },
      {
        name: "Project Stories",
        type: "pie",
        radius: ["70%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "outer",
          bleedMargin: 0,
          distanceToLabelLine: 0,
          fontSize: 14,
          formatter: (item: any) => {
            return "{b|" + (item?.name || "") + "}";
          },
          rich: {
            b: {
              fontSize: 14,
              color: "auto",
              lineHeight: 30,
              fontWeight: 600,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
          },
        },
        labelLine: {
          show: false,
          length2: 0,
          length: 10,
        },
        data: projectStories?.data.slice(0, 10).map((story, index) => {
          const totalTime = projectStories?.data
            ?.slice(0, 10)
            ?.reduce((acc, curr) => {
              return acc + curr.spent_time;
            }, 0);

          const usedPercentage = (story?.spent_time / totalTime) * 100;

          return {
            value: usedPercentage.toFixed(2),
            name: `US ${index + 1}`,
          };
        }),
      },
    ],
  };

  const userStoryStatusOption = {
    grid: {
      top: "13%",
      bottom: "10%",
      left: "5%",
      right: "5%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params: any) => {
        let totalTasks = 0;
        params.forEach((param: { data: { value: number } }) => {
          totalTasks += param.data.value;
        });
        let result = params
          .map(
            (param: {
              seriesName: any;
              data: { value: any };
              color: string;
            }) => {
              return `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${param.color};"></span>${param.seriesName}: ${param.data.value}`;
            }
          )
          .join("<br/>");
        result += `<hr/><span style="display:block;padding-left:15px;margin-top:5px;">Total Task: ${totalTasks}</span>`;
        return result;
      },
    },
    legend: {
      left: "right",
      data: ["Closed Task", "Open Task"],
      itemWidth: 16,
      itemHeight: 16,
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data:
          projectStories?.data
            ?.slice(0, 15)
            .map((_, index) => `US ${index + 1}`) ?? [],

        axisLabel: {
          interval: 0,
          showMaxLabel: true,
          width: 80,
          overflow: "truncate",
          ellipsis: "...",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      // Closed Task
      {
        name: "Closed Task",
        type: "bar",
        stack: "task",
        color: "#22C55E",
        data:
          projectStories?.data?.slice(0, 15)?.map((item) => ({
            value: item?.closed_task_count,
          })) ?? [],
      },
      // Open Task
      {
        name: "Open Task",
        type: "bar",
        stack: "task",
        color: "#FB923C", // Orange for open

        data:
          projectStories?.data?.slice(0, 15)?.map((item) => ({
            value: item?.open_task_count,
          })) ?? [],
      },
    ],
  };

  const userStoryBugOption = {
    grid: {
      top: "5%",
      bottom: "10%",
      left: "5%",
      right: "5%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data:
          projectStories?.data
            ?.slice(0, 15)
            .map((_, index) => `US ${index + 1}`) ?? [],

        axisLabel: {
          interval: 0,
          showMaxLabel: true,
          width: 80,
          overflow: "truncate",
          ellipsis: "...",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      // Bug
      {
        name: "Bug Count",
        type: "bar",
        stack: "task",
        color: "#FB923C",
        data:
          projectStories?.data?.slice(0, 15)?.map((item) => ({
            value: item?.bug_count,
          })) ?? [],
      },
    ],
  };

  // Effect
  useEffect(() => {
    const myChart = occupancyChartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return (
                  "{a|" + params.value + "%" + "}\n{b|" + params.name + "}"
                );
              },
              rich: {
                a: {
                  fontSize: 22,
                  color: "#3F3F46",
                  lineHeight: 20,
                  fontWeight: 600,
                },
                b: {
                  fontSize: 14,
                  color: "#3F3F46",
                  lineHeight: 30,
                },
              },
            },
          },
        ],
      });
    });

    storyOccupancyOption && myChart.setOption(storyOccupancyOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [storyOccupancyOption]);

  return {
    columns,
    projectStories,
    isLoading,
    storiesDetailsColumns,
    perPage,
    setPerPage,
    searchText,
    handleSearch,
    status,
    setStatus,
    clearFilters,
    storyOccupancyOption,
    occupancyChartRef,
    userStoryStatusOption,
    userStoryBugOption,
  };
};

export default useProjectStories;
