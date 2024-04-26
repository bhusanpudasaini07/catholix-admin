import moment from "moment";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import {
  ILatestTaskTrend,
  ILatestTaskTrendDetail,
} from "@/interface/project-interface";
import { geLatestTaskTrend } from "@/services/project/project-service";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

const useLatestTrend = () => {
  const {
    query: { code },
  } = useRouter();

  const colors = ["#22C55E", "#FB923C", "#F87171"];

  const { data: trendData, isLoading: trendDataLoading } =
    useQuery<ILatestTaskTrend>({
      queryFn: async () => {
        if (code) {
          const oneWeekAgo = moment().subtract(1, "weeks").format("YYYY-MM-DD");
          const today = moment().format("YYYY-MM-DD");
          const response = await geLatestTaskTrend(code, oneWeekAgo, today);
          return response;
        }
      },
      queryKey: ["trendData", code],
    });

  const enhancedTasks = useMemo(() => {
    const tasks = [...(trendData?.data?.tasks ?? [])];
    const sortedTasks = tasks?.sort((a, b) =>
      moment(b.date).diff(moment(a.date))
    );

    return sortedTasks.map((task, index) => {
      const previousTask = sortedTasks[index + 1];
      const prevTaskClosedPercentage =
        (previousTask?.closed_task_count / previousTask?.total_task_count) *
        100;
      const newTaskClosedPercentage =
        (task?.closed_task_count / task?.total_task_count) * 100;

      const newTask = previousTask
        ? task?.total_task_count - previousTask?.total_task_count
        : 0;

      const closedTaskFromPrev = previousTask
        ? task?.closed_task_count - previousTask?.closed_task_count
        : 0;
      const openTaskFromPrev = previousTask
        ? task?.open_task_count - previousTask?.open_task_count
        : 0;
      const progressPercent = previousTask
        ? ((newTaskClosedPercentage - prevTaskClosedPercentage) /
            prevTaskClosedPercentage) *
          100
        : 0;

      return {
        ...task,
        new_task: newTask,
        closed_task_new: closedTaskFromPrev,
        open_task_new: openTaskFromPrev,
        progress_percent: "-",
        // progress_percent: "progressPercent.toFixed(2)",
      };
    });
  }, [trendData]);

  //   Graph option
  const trendOption = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      right: "20%",
      bottom: "10%",
    },
    legend: {
      left: "right",
      itemWidth: 16,
      itemHeight: 16,
      data: ["Open Task", "Closed Task", "Completion %"],
    },
    xAxis: [
      {
        type: "category",
        axisPointer: {
          type: "shadow",
        },
        // prettier-ignore
        data: trendData?.data?.tasks?.map((item) => moment( item?.date).format("ll")) ?? [],
      },
    ],
    yAxis: [
      {
        type: "value",
        position: "right",
        alignTicks: true,
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "Completion %",
        min: 0,
        max: 100,
        position: "left",
        axisLabel: {
          formatter: "{value} %",
        },
      },
    ],
    series: [
      {
        name: "Open Task",
        type: "bar",
        color: "#FC8452",
        data:
          trendData?.data?.tasks?.map((item) => item?.open_task_count) ?? [],
      },
      {
        name: "Closed Task",
        type: "bar",
        color: "#91CC75",
        data:
          trendData?.data?.tasks?.map((item) => item?.closed_task_count) ?? [],
      },
      {
        name: "Completion %",
        type: "line",
        color: "#EE6666",
        yAxisIndex: 1,
        data: trendData?.data?.tasks?.map((item) => {
          const completionPercent =
            (item?.closed_task_count / item?.total_task_count) * 100;
          return {
            value: completionPercent.toFixed(2),
          };
        }),
      },
    ],
  };

  //   task trend details page table column
  const taskHistoryColumn: ColumnDef<ILatestTaskTrendDetail>[] = [
    // Date
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="font-medium">
          {moment(row?.getValue("date")).format("ll")}
        </div>
      ),
    },
    // Total Task
    {
      id: "total_task",
      accessorKey: "total_task",
      header: "Total Task",
      cell: ({ row }) => (
        <div className="font-medium">
          {Number(row?.original?.open_task_count) +
            Number(row?.original?.closed_task_count)}
        </div>
      ),
    },

    // Open task
    {
      id: "open_task_count",
      accessorKey: "open_task_count",
      header: "Open Task",
      cell: ({ row }) => (
        <div className="font-medium">
          {row?.original?.open_task_count}{" "}
          {row?.original?.open_task_new !== 0 && (
            <span
              className={cn(
                row?.original?.open_task_new < 0
                  ? "text-red-500"
                  : "text-green-500"
              )}
            >
              ({row?.original?.open_task_new > 0 && "+"}
              {row?.original?.open_task_new})
            </span>
          )}
        </div>
      ),
    },
    // Closed Task
    {
      id: "closed_task_count",
      accessorKey: "closed_task_count",
      header: "Closed Task",
      cell: ({ row }) => (
        <div className="font-medium">
          {row?.original?.closed_task_count}{" "}
          {row?.original?.closed_task_new !== 0 && (
            <span
              className={cn(
                row?.original?.closed_task_new < 0
                  ? "text-red-500"
                  : "text-green-500"
              )}
            >
              ({row?.original?.closed_task_new > 0 && "+"}
              {row?.original?.closed_task_new})
            </span>
          )}
        </div>
      ),
    },
    // Newly added task
    {
      id: "new_task",
      accessorKey: "new_task",
      header: () => (
        <div>
          Newly <br />
          Added Task
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row?.original?.new_task}</div>
      ),
    },
    // Bugs
    {
      id: "bug_count",
      accessorKey: "bug_count",
      header: "Bugs #",
      cell: ({ row }) => (
        <div
          className={cn(
            row?.original?.bug_count > 0 ? "text-orange-500" : "text-zinc-700",
            "font-medium"
          )}
        >
          {row?.original?.bug_count} Bug/s
        </div>
      ),
    },
    // Closed Task %
    {
      id: "closed_percent",
      accessorKey: "closed_percent",
      header: () => (
        <div>
          Closed <br /> Task %
        </div>
      ),
      cell: ({ row }) => {
        const closedTaskPercent =
          (row?.original?.closed_task_count / row?.original?.total_task_count) *
          100;
        return (
          <div className="font-medium">{closedTaskPercent.toFixed(2)}%</div>
        );
      },
    },
    // Progress % Compared to Yesterday
    {
      id: "progress_precent",
      accessorKey: "progress_precent",
      header: () => (
        <div>
          Progress % <br /> Compared to Yesterday
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="font-medium">{row?.original?.progress_percent}</div>
        );
      },
    },
  ];

  return {
    trendOption,
    taskHistoryColumn,
    trendData,
    trendDataLoading,
    enhancedTasks,
  };
};

export default useLatestTrend;
