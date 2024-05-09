import { EChartsInstance, EChartsOption } from "echarts-for-react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";

import {
  IProjectTaskBugRatio,
  IProjectTaskBugRatios,
  IProjectTimeMembers,
  IProjectTimeWithLabel,
  ITypeCount,
  ITypes,
} from "@/interface/project-interface";
import {
  getProjectTaskBugRatio,
  getProjectTaskLabelRp,
  getTimeLogWithLabel,
} from "@/services/project/project-service";
import { calculateTimeLog, changeNumberFormat } from "@/shared/utils/rp-utils";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/shared/utils/utils";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const useMoreDetail = () => {
  const {
    query: { code },
  } = useRouter();
  const statusChartRef = useRef<EChartsInstance>(null);
  const categoryRef = useRef<EChartsInstance>(null);
  const platformRef = useRef<EChartsInstance>(null);
  const bugsRef = useRef<EChartsInstance>(null);
  const bugTaskRef = useRef<EChartsInstance>(null);

  //   STATES
  const [selectValues, setSelectValues] = useState({
    status: "utilization",
    category: "utilization",
    platform: "utilization",
  });
  const [platId, setPlatId] = useState("");

  const setSelectValue = (
    type: "status" | "category" | "platform",
    value: string
  ) => {
    setSelectValues((prev) => ({ ...prev, [type]: value }));
  };

  //   Project TASK LABEL DATA
  const { data: projectTaskLabelData, isLoading } = useQuery<ITypes>({
    queryFn: async () => {
      if (code) {
        const response = await getProjectTaskLabelRp(code);
        return response;
      }
    },
    queryKey: ["projectTaskLabelData", code],
  });

  //   PROJECT BUG TASK RATIO
  const { data: bugTaskRatioData, isLoading: bugTaskLoading } =
    useQuery<IProjectTaskBugRatios>({
      queryFn: async () => {
        if (code) {
          const response = await getProjectTaskBugRatio(code);
          return response;
        }
      },
      queryKey: ["bugTaskRatioData", code],
      onSuccess: (data) => {
        setPlatId(data?.data?.[0]?.title);
      },
    });

  // Bug ratio > label time log data
  const { data: labelTimeLog, isLoading: labelTimeLoading } =
    useQuery<IProjectTimeWithLabel>({
      queryFn: () => getTimeLogWithLabel(code, platId),
      queryKey: ["labelTimeLog", code, platId],
      enabled: !!platId,
    });

  //   Status Column
  const statusColumn: ColumnDef<ITypeCount>[] = [
    // status
    {
      id: "title",
      accessorKey: "title",
      header: "Status",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {row.getValue("title")}
        </div>
      ),
      enableHiding: false,
    },
    // RP consumption
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Consumed",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {changeNumberFormat(row.getValue("rp"))}
        </div>
      ),
      enableHiding: false,
    },
    // Utilization
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "Utilization",
      cell: ({ row }) => {
        const totalRP = projectTaskLabelData
          ? projectTaskLabelData?.data
              ?.find((item) => item?.type === "Status")
              ?.count?.reduce(
                (total: number, item: ITypeCount) => total + Number(item?.rp),
                0
              )
          : 0;

        const utilizedPercentage =
          (Number(row?.original?.rp) / (totalRP ?? 0)) * 100;
        return (
          <div className="font-semibold text-zinc-700">
            {utilizedPercentage?.toFixed(2)}%
          </div>
        );
      },

      enableHiding: false,
    },
  ];

  // Category Column
  const categoryColumn: ColumnDef<ITypeCount>[] = [
    // status
    {
      id: "title",
      accessorKey: "title",
      header: "Status",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {row.getValue("title")}
        </div>
      ),
      enableHiding: false,
    },
    // RP consumption
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Consumed",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {changeNumberFormat(row.getValue("rp"))}
        </div>
      ),
      enableHiding: false,
    },
    // Utilization
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "Utilization",
      cell: ({ row }) => {
        const totalRP = projectTaskLabelData
          ? projectTaskLabelData?.data
              ?.find((item) => item?.type === "Category")
              ?.count?.reduce(
                (total: number, item: ITypeCount) => total + Number(item?.rp),
                0
              )
          : 0;

        const utilizedPercentage =
          (Number(row?.original?.rp) / Number(totalRP)) * 100;
        return (
          <div className="font-semibold text-zinc-700">
            {utilizedPercentage?.toFixed(2)}%
          </div>
        );
      },

      enableHiding: false,
    },
  ];

  // Category Column
  const platformColumn: ColumnDef<ITypeCount>[] = [
    // status
    {
      id: "title",
      accessorKey: "title",
      header: "Status",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {row.getValue("title")}
        </div>
      ),
      enableHiding: false,
    },
    // RP consumption
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Consumed",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {changeNumberFormat(row.getValue("rp"))}
        </div>
      ),
      enableHiding: false,
    },
    // Utilization
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "Utilization",
      cell: ({ row }) => {
        const totalRP = projectTaskLabelData
          ? projectTaskLabelData?.data
              ?.find((item) => item?.type === "Platform / Component")
              ?.count?.reduce(
                (total: number, item: ITypeCount) => total + Number(item?.rp),
                0
              )
          : 0;

        const utilizedPercentage =
          (Number(row?.original?.rp) / Number(totalRP)) * 100;
        return (
          <div className="font-semibold text-zinc-700">
            {utilizedPercentage?.toFixed(2)}%
          </div>
        );
      },

      enableHiding: false,
    },
  ];

  //   STATUS PIE OPTION
  const statusOption = {
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
        name: "Status",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: (params: any) => {
            if (selectValues?.status === "utilization") {
              return "{a|" + params.value + "%" + "}\n{b|" + params.name + "}";
            } else {
              return "{a|" + params.value + "}\n{b|" + params.name + "}";
            }
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
        emphasis: {
          label: {
            show: true,
          },
          labelLine: {
            show: false,
          },
        },
        labelLine: {
          show: true,
          length: 20,
          minTurnAngle: 0,
          maxSurfaceAngle: 360,
        },
        data: projectTaskLabelData
          ? projectTaskLabelData?.data
              ?.find((item) => item?.type === "Status")
              ?.count?.map((item) => {
                const totalRP = projectTaskLabelData
                  ? projectTaskLabelData?.data
                      ?.find((item) => item?.type === "Status")
                      ?.count?.reduce(
                        (total: number, item: ITypeCount) =>
                          total + Number(item?.rp),
                        0
                      )
                  : 0;

                const utilizedPercentage =
                  (Number(item?.rp) / Number(totalRP)) * 100;
                return {
                  value: Math.round(utilizedPercentage),
                  name: item?.title,
                };
              })
          : [],
      },
    ],
  };

  //   Category PIE OPTION
  const categoryOption = {
    tooltip: {
      trigger: "item",
    },
    // color: [
    //   "#FACC15",
    //   "#84CC16",
    //   "#2DD4BF",
    //   "#0891B2",
    //   "#818CF8",
    //   "#7C3AED",
    //   "#D8B4FE",
    //   "#F472B6",
    //   "#FB923C",
    //   "#F87171",
    //   "#A8A29E",
    // ],
    series: [
      {
        name: "Category",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: (params: any) => {
            if (selectValues?.category === "utilization") {
              return "{a|" + params.value + "%" + "}\n{b|" + params.name + "}";
            } else {
              return "{a|" + params.value + "}\n{b|" + params.name + "}";
            }
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
        emphasis: {
          label: {
            show: true,
          },
          labelLine: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: projectTaskLabelData
          ? projectTaskLabelData?.data
              ?.find((item) => item?.type === "Category")
              ?.count?.map((item) => {
                const totalRP = projectTaskLabelData
                  ? projectTaskLabelData?.data
                      ?.find((item) => item?.type === "Category")
                      ?.count?.reduce(
                        (total: number, item: ITypeCount) =>
                          total + Number(item?.rp),
                        0
                      )
                  : 0;

                const utilizedPercentage =
                  (Number(item?.rp) / Number(totalRP)) * 100;
                return {
                  value: utilizedPercentage.toFixed(2),
                  name: item?.title,
                };
              })
          : [],
      },
    ],
  };

  //   Platform/Component PIE OPTION
  const platformComponentOption = {
    tooltip: {
      trigger: "item",
    },
    // color: [
    //   "#FACC15",
    //   "#84CC16",
    //   "#2DD4BF",
    //   "#0891B2",
    //   "#818CF8",
    //   "#7C3AED",
    //   "#D8B4FE",
    //   "#F472B6",
    //   "#FB923C",
    //   "#F87171",
    //   "#A8A29E",
    // ],
    series: [
      {
        name: "Platform/Component",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: (params: any) => {
            if (selectValues?.platform === "utilization") {
              return "{a|" + params.value + "%" + "}\n{b|" + params.name + "}";
            } else {
              return "{a|" + params.value + "}\n{b|" + params.name + "}";
            }
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
        emphasis: {
          label: {
            show: true,
          },
          labelLine: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: projectTaskLabelData
          ? projectTaskLabelData?.data
              ?.find((item) => item?.type === "Platform / Component")
              ?.count?.map((item) => {
                const totalRP = projectTaskLabelData
                  ? projectTaskLabelData?.data
                      ?.find((item) => item?.type === "Platform / Component")
                      ?.count?.reduce(
                        (total: number, item: ITypeCount) =>
                          total + Number(item?.rp),
                        0
                      )
                  : 0;

                const utilizedPercentage =
                  (Number(item?.rp) / Number(totalRP)) * 100;
                return {
                  value: utilizedPercentage.toFixed(2),
                  name: item?.title,
                };
              })
          : [],
      },
    ],
  };

  // Bug Task ratio option
  const bugTaskRatioOption = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "45%"],
        radius: "90%",
        min: 0,
        max: 100,
        splitNumber: 8,
        pointer: {
          itemStyle: {
            color: "auto",
          },
          show: true,
        },
        progress: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 50,
            color: [
              [0.2, "#22C55E"],
              [0.4, "#FACC15"],
              [0.6, "#FD850A"],
              [0.8, "#EF4444"],
              [1, "#B91C1C"],
            ],
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: [
          {
            value:
              labelTimeLog?.data?.summary?.regular_task_rp === 0
                ? 0
                : (
                    (labelTimeLog?.data?.summary?.bug_task_rp! /
                      labelTimeLog?.data?.summary?.regular_task_rp!) *
                    100
                  ).toFixed(2),
            name:
              labelTimeLog?.data?.summary?.regular_task_rp === 0
                ? 0
                : (
                    (labelTimeLog?.data?.summary?.bug_task_rp! /
                      labelTimeLog?.data?.summary?.regular_task_rp!) *
                    100
                  ).toFixed(2) + "%",
          },
        ],
        detail: {
          show: false,
        },
      },
    ],
  };

  // Bug Task ratio option
  const bugOption = {
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        const { hours, minutes } = calculateTimeLog(params?.value);
        return `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${
          params?.color
        };"></span>${hours > 0 ? `${hours}H ` : ""}${minutes}M - ${
          params.name
        }`;
      },
    },
    series: [
      {
        name: "Bugs",
        type: "pie",
        radius: ["50%", "85%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: (params: any) => {
            const { hours, minutes } = calculateTimeLog(params.value);
            return hours > 0
              ? `{a|${hours}H ${minutes}M}\n{b|${params.name}}`
              : `{a|${minutes}M}\n{b|${params.name}}`;
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
        emphasis: {
          label: {
            show: true,
          },
          labelLine: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data:
          labelTimeLog?.data?.bug_task_members?.map((member) => ({
            name: member?.fullname,
            value: member?.time,
          })) ?? [],
      },
    ],
  };

  // New updated data of bug task adding ratio to the data
  const bugRatioData = useMemo(() => {
    const updatedBugTaskData = bugTaskRatioData?.data?.map((item) => ({
      ...item,
      ratio: item?.task_rp === 0 ? 0 : (item?.bug_rp / item?.task_rp) * 100,
    }));
    return updatedBugTaskData;
  }, [bugTaskRatioData]);

  //   Bug task ratio column
  const bugTaskRatioColumn: ColumnDef<IProjectTaskBugRatio>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: "Platform/Component",
      cell: ({ row }) => (
        <div
          onClick={() => setPlatId(row?.getValue("title"))}
          className={cn(
            "font-semibold cursor-pointer text-zinc-700",
            platId === row?.original?.title && "text-primary"
          )}
        >
          {row?.getValue("title")}
        </div>
      ),
    },
    {
      id: "task_rp",
      accessorKey: "task_rp",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Regular</p>
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
        <div className="font-semibold text-zinc-700">
          {changeNumberFormat(row?.getValue("task_rp"))}
        </div>
      ),
    },
    {
      id: "bug_rp",
      accessorKey: "bug_rp",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Bug</p>
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
        <div className="font-semibold text-zinc-700">
          {changeNumberFormat(row?.getValue("bug_rp"))}
        </div>
      ),
    },
    {
      id: "ratio",
      accessorKey: "ratio",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Bug to Task Ratio</p>
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
      cell: ({ row }) => {
        return (
          <div className="font-semibold text-zinc-700">
            {row?.original?.ratio.toFixed(2)}%
          </div>
        );
      },
    },
  ];

  // Individual bug task data column
  const individualBugTaskColumn: ColumnDef<IProjectTimeMembers>[] = [
    {
      accessorKey: "fullname",
      header: "Team Member",
      cell: ({ row }) => {
        return (
          <div>
            <Link
              href={`/staffs/${row?.original?.username}`}
              className="font-medium text-primary hover:text-blue-700"
            >
              {row?.getValue("fullname")}
            </Link>
            {/* <p className="text-xs text-zinc-500">{row?.original?.}</p> */}
          </div>
        );
      },
    },
    {
      accessorKey: "rp",
      header: ({ column }) => (
        <div className="flex gap-3 justify-between items-center">
          <p>
            Regular <br />
            Task
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
        <div className="font-medium">
          {changeNumberFormat(row?.getValue("rp"))}
        </div>
      ),
    },
    {
      accessorKey: "bug",
      header: ({ column }) => (
        <div className="flex gap-3 justify-between items-center">
          <p>Bugs</p>
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
      cell: ({ row }) => {
        const userBugData = labelTimeLog?.data?.bug_task_members?.find(
          (item) => item?.staff_id === row?.original?.staff_id
        );
        return (
          <div className="font-medium">
            {changeNumberFormat(userBugData?.rp ?? 0)}
          </div>
        );
      },
    },
    {
      accessorKey: "time",
      header: ({ column }) => (
        <div className="flex gap-3 justify-between items-center">
          <p>
            Regular <br />
            Task Time
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
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(row?.getValue("time"));
        return (
          <div className="font-medium">
            {hours > 0 && `${hours}H `}
            {`${minutes}M`}
          </div>
        );
      },
    },
    {
      accessorKey: "bug_time",
      header: ({ column }) => (
        <div className="flex gap-3 justify-between items-center">
          <p>
            Bug Fixing <br />
            Time
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
      cell: ({ row }) => {
        const userBugData = labelTimeLog?.data?.bug_task_members?.find(
          (item) => item?.staff_id === row?.original?.staff_id
        );
        const { hours, minutes } = calculateTimeLog(Number(userBugData?.time));
        return (
          <div className="font-medium">
            {hours > 0 && `${hours}H `}
            {`${isNaN(minutes) ? 0 : minutes}M`}
          </div>
        );
      },
    },
  ];

  // Hover effect for status piechart
  useEffect(() => {
    const myChart = statusChartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                if (selectValues?.status === "utilization") {
                  return (
                    "{a|" + params.value + "%" + "}\n{b|" + params.name + "}"
                  );
                } else {
                  return "{a|" + params.value + "}\n{b|" + params.name + "}";
                }
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

    statusOption && myChart.setOption(statusOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [statusOption]);

  // Hover effect for category piechart
  useEffect(() => {
    const myChart = categoryRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                if (selectValues?.category === "utilization") {
                  return (
                    "{a|" + params.value + "%" + "}\n{b|" + params.name + "}"
                  );
                } else {
                  return "{a|" + params.value + "}\n{b|" + params.name + "}";
                }
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

    categoryOption && myChart.setOption(categoryOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [categoryOption]);

  // Hover effect for platform/component piechart
  useEffect(() => {
    const myChart = platformRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                if (selectValues?.platform === "utilization") {
                  return (
                    "{a|" + params.value + "%" + "}\n{b|" + params.name + "}"
                  );
                } else {
                  return "{a|" + params.value + "}\n{b|" + params.name + "}";
                }
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

    platformComponentOption && myChart.setOption(platformComponentOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [platformComponentOption]);

  // Hover effect for bugs piechart in bug task ratio
  useEffect(() => {
    const myChart = bugsRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                const { hours, minutes } = calculateTimeLog(params.value);
                return hours > 0
                  ? `{a|${hours}H ${minutes}M}\n{b|${params.name}}`
                  : `{a|${minutes}M}\n{b|${params.name}}`;
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

    bugOption && myChart.setOption(bugOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [bugOption]);

  // Hover effect for bugs ratio piechart in bug task ratio
  useEffect(() => {
    const myChart = bugTaskRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return "{a|" + params.value + "}\n{b|" + params.name + "}";
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

    bugTaskRatioOption && myChart.setOption(bugTaskRatioOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [bugTaskRatioOption]);

  return {
    projectTaskLabelData,
    isLoading,
    statusColumn,
    statusOption,
    categoryOption,
    platformComponentOption,
    selectValues,
    setSelectValue,
    bugTaskRatioData,
    bugTaskLoading,
    bugTaskRatioColumn,
    statusChartRef,
    categoryRef,
    platformRef,
    categoryColumn,
    platformColumn,
    individualBugTaskColumn,
    bugTaskRatioOption,
    bugOption,
    labelTimeLog,
    labelTimeLoading,
    bugsRef,
    bugTaskRef,
    platId,
    bugRatioData,
  };
};

export default useMoreDetail;
