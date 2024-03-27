import { EChartsInstance } from "echarts-for-react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";

import {
  IEstimatedActual,
  IProjectDetail,
  IProjectRoleRPSummary,
} from "@/interface/project-interface";
import {
  getEstimatedActual,
  getProjectDetail,
  getProjectRoleRp,
} from "@/services/project/project-service";
import { calculatePercentage } from "@/shared/utils/rp-utils";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  data: IProjectDetail;
}

const useEstimatedActual = () => {
  const {
    query: { code },
  } = useRouter();
  const overallChartRef = useRef<EChartsInstance>(null);

  const { data: projectDetail, isLoading: projectLoading } = useQuery<IProps>({
    queryFn: async () => {
      if (code) {
        const response = await getProjectDetail(code);
        return response;
      }
    },
    queryKey: ["projectDetail", code],
  });

  // Estimated vs actual api
  const { data: estimatedActual, isLoading: estimatedActualLoading } =
    useQuery<IEstimatedActual>({
      queryFn: async () => {
        if (code) {
          const response = await getEstimatedActual(code);
          return response;
        }
      },
      queryKey: ["estimatedActual", code],
    });

  // Overall Roles Estimate v actual api
  const { data: projectRoleRp, isLoading: projectRoleRPLoading } =
    useQuery<IProjectRoleRPSummary>({
      queryFn: async () => {
        if (code) {
          const response = await getProjectRoleRp(code);
          return response;
        }
      },
      queryKey: ["projectRoleRp", code],
    });

  // Estimated VS Actual Graph
  const estimatedActualGraph = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      left: "right",
      itemWidth: 16,
      itemHeight: 16,
    },
    grid: {
      left: "0%",
      right: "4%",
      bottom: "2%",
      top: "12%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
      },
    ],
    yAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        data: estimatedActual?.data?.map((item) => item?.title) ?? [],
      },
    ],
    series: [
      {
        name: "Actual Spent Budget",
        type: "bar",
        label: {
          show: true,
          position: "inside",
        },
        emphasis: {
          focus: "series",
        },
        data:
          estimatedActual?.data?.map((item) => (item?.actual).toFixed(2)) ?? [],
      },
      {
        name: "Budget",
        type: "bar",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: estimatedActual?.data?.map((item) => item?.quote) ?? [],
      },
      {
        name: "Estimated",
        type: "bar",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data:
          estimatedActual?.data?.map((item) => (item?.estimated).toFixed(2)) ??
          [],
      },
    ],
  };
  // Department wise pie chart
  const overallPieOption = {
    tooltip: {
      trigger: "item",
      valueFormatter: (value: any) => value + "%",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: (item: any) => {
            return "{a|" + item.value + "%" + "}\n{b|" + item.name + "}";
          },
          rich: {
            a: {
              fontSize: 22,
              color: "#3F3F46",
              lineHeight: 20,
              fontWeight: 600,
            },
            b: {
              fontSize: 12,
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
        },
        data: [
          {
            value: calculatePercentage(
              estimatedActual?.data?.find((item) => item?.title === "Developer")
                ?.actual ?? 0,
              projectDetail?.data?.rp?.used_rp ?? 0
            ),
            name: "Developer",
            itemStyle: {
              color: "#7C3AED",
            },
          },
          {
            value: calculatePercentage(
              estimatedActual?.data?.find((item) => item?.title === "QA")
                ?.actual ?? 0,
              projectDetail?.data?.rp?.used_rp ?? 0
            ),
            name: "Quality Assurance",
            itemStyle: {
              color: "#FB923C",
            },
          },
          {
            value: calculatePercentage(
              estimatedActual?.data?.find((item) => item?.title === "Designer")
                ?.actual ?? 0,
              projectDetail?.data?.rp?.used_rp ?? 0
            ),
            name: "Designer",
            itemStyle: {
              color: "#84CC16",
            },
          },
          {
            value: calculatePercentage(
              estimatedActual?.data?.find(
                (item) => item?.title === "Project Management"
              )?.actual ?? 0,
              projectDetail?.data?.rp?.used_rp ?? 0
            ),
            name: "Project Management",
            itemStyle: {
              color: "#F87171",
            },
          },
          {
            value: calculatePercentage(
              estimatedActual?.data?.find((item) => item?.title === "Devops")
                ?.actual ?? 0,
              projectDetail?.data?.rp?.used_rp ?? 0
            ),
            name: "Devops",
            itemStyle: {
              color: "#A8A29E",
            },
          },
        ],
      },
    ],
  };

  // Overall Roles Chart
  const overallRolesOption = {
    grid: {
      top: "10%",
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
        data: projectRoleRp?.data?.map((item) => item?.title) ?? [],

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
      {
        name: "Actual Spent Budget",
        type: "bar",
        // label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: projectRoleRp?.data?.map((item) => item?.actual) ?? [],
        backgroundStyle: {
          color: "#0A82FD",
        },
      },
      {
        name: "Budget",
        type: "bar",
        // label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: projectRoleRp?.data?.map((item) => item?.quote) ?? [],
        backgroundStyle: {
          color: "#22C55E",
        },
      },
      {
        name: "Estimated",
        type: "bar",
        // label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: projectRoleRp?.data?.map((item) => item?.estimated) ?? [],
        backgroundStyle: {
          color: "#FACC15",
        },
      },
    ],
  };

  const individualRolesOption = {
    grid: {
      top: "10%",
      bottom: "10%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    // legend: {
    //   data: ["Forest", "Steppe", "Desert", "Wetland"],
    // },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: ["Senior Node"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Estimated",
        type: "bar",
        barGap: 2,
        // label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: [320],
      },
      {
        name: "Budget",
        type: "bar",
        // label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: [220],
      },
      {
        name: "Actual",
        type: "bar",
        // label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: [150],
      },
    ],
  };

  // Table column for individual department
  const individualRoleColumn: ColumnDef<any>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: ({ row }: any) => <div>{row?.index + 1}.</div>,
    },
    // Info
    {
      id: "member_info",
      accessorKey: "member_info",
      header: "Member Info",
      cell: ({ row }) => <div>asd</div>,
    },
    // Estimate
    {
      id: "estimate",
      accessorKey: "estimate",
      header: "Estimate",
      cell: ({ row }) => <div>asd</div>,
    },
    // Budget
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget",
      cell: ({ row }) => <div>asd</div>,
    },
    // Actual Spent
    {
      id: "actual_spent",
      accessorKey: "actual_spent",
      header: () => (
        <div>
          Actual
          <br />
          Spent
        </div>
      ),
      cell: ({ row }) => <div>asd</div>,
    },
    // Logged Hours
    {
      id: "logged_hours",
      accessorKey: "logged_hours",
      header: () => (
        <div>
          Logged
          <br />
          Hours
        </div>
      ),
      cell: ({ row }) => <div>asd</div>,
    },
  ];

  /**
   * For Overall Piechart value change
   */
  useEffect(() => {
    const myChart = overallChartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return (
                  "{a|" + params.value + "%" + "}\n{b|" + params?.name + "}"
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
                  fontSize: 12,
                  color: "#3F3F46",
                  lineHeight: 30,
                },
              },
            },
          },
        ],
      });
    });

    overallPieOption && myChart.setOption(overallPieOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [overallPieOption]);

  return {
    // Chart options
    estimatedActualGraph,
    overallPieOption,
    overallRolesOption,
    individualRolesOption,
    individualRoleColumn,
    overallChartRef,

    // API Data
    projectDetail,
    projectLoading,
    estimatedActual,
    estimatedActualLoading,
    projectRoleRp,
    projectRoleRPLoading,
  };
};

export default useEstimatedActual;
