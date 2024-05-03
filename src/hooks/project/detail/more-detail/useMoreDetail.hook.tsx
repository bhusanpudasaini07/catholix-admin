import { EChartsInstance } from "echarts-for-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

import {
  IProjectTaskBugRatio,
  IProjectTaskBugRatios,
  ITypeCount,
  ITypes,
} from "@/interface/project-interface";
import {
  getProjectTaskBugRatio,
  getProjectTaskLabelRp,
} from "@/services/project/project-service";
import { changeNumberFormat } from "@/shared/utils/rp-utils";
import { ColumnDef } from "@tanstack/react-table";

const useMoreDetail = () => {
  const {
    query: { code },
  } = useRouter();
  const statusChartRef = useRef<EChartsInstance>(null);
  const categoryRef = useRef<EChartsInstance>(null);
  const platformRef = useRef<EChartsInstance>(null);

  //   STATES
  const [selectValues, setSelectValues] = useState({
    status: "utilization",
    category: "utilization",
    platform: "utilization",
  });

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

  //   Bug task ratio column
  const bugTaskRatioColumn: ColumnDef<IProjectTaskBugRatio>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: "Platform/Component",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {row?.getValue("title")}
        </div>
      ),
    },
    {
      id: "task_rp",
      accessorKey: "task_rp",
      header: "Regular",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {changeNumberFormat(row?.getValue("task_rp"))}
        </div>
      ),
    },
    {
      id: "bug_rp",
      accessorKey: "bug_rp",
      header: "Bug",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {changeNumberFormat(row?.getValue("bug_rp"))}
        </div>
      ),
    },
    {
      id: "ratio",
      accessorKey: "ratio",
      header: "Bug to Task Ratio",
      cell: ({ row }) => {
        const ratio = (row?.original?.bug_rp / row?.original?.task_rp) * 100;
        return (
          <div className="font-semibold text-zinc-700">
            {row?.original?.task_rp === 0 ? "0.00" : ratio.toFixed(2)}%
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
  };
};

export default useMoreDetail;
