import { EChartsInstance } from "echarts-for-react";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

import {
  IBurndownDetail,
  IConsumptionData,
  IEstimatedActual,
  IProjectDetail,
  ISalesRP,
  ISalesRPDetail,
  ITypeCount,
  ITypes,
} from "@/interface/project-interface";
import { IStaff } from "@/interface/staff-interface";
import {
  getEstimatedActual,
  getProjectBurndown,
  getProjectDetail,
  getProjectSales,
  getProjectTaskLabelRp,
  getRpSummary,
} from "@/services/project/project-service";
import { getStaffDetails } from "@/services/staff/staff-service";
import { changeNumberFormat } from "@/shared/utils/rp-utils";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  data: IProjectDetail;
}

export const useProjectDetail = () => {
  const router = useRouter();
  const { code } = router?.query;
  const chartRef = useRef<EChartsInstance>(null);

  // STATES
  const [gitModalOpen, setGitModalOpen] = useState(false);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  const [openLeadSheet, setOpenLeadSheet] = useState(false);
  const [tabValue, setTabValue] = useState("status");

  const { data: projectDetail, isLoading } = useQuery<IProps>({
    queryFn: async () => {
      if (code) {
        const response = await getProjectDetail(code);
        return response;
      }
    },
    queryKey: ["projectDetail", code],
  });

  // Staff Details
  const { data: staffDetails, isLoading: staffLoading } = useQuery<IStaff>({
    queryFn: async () => {
      if (projectDetail?.data?.project_lead?.username) {
        const response = await getStaffDetails(
          projectDetail?.data?.project_lead?.username
        );
        return response;
      }
    },
    queryKey: ["staffDetails", projectDetail],
  });

  //   Project TASK LABEL DATA
  const { data: projectTaskLabelData, isLoading: projectTaskLabelLoading } =
    useQuery<ITypes>({
      queryFn: async () => {
        if (code) {
          const response = await getProjectTaskLabelRp(code);
          return response;
        }
      },
      queryKey: ["projectTaskLabelData", code],
    });

  // Burndown data fetch
  const { data: burndownData, isLoading: burndownLoading } =
    useQuery<IBurndownDetail>({
      queryFn: async () => {
        if (code) {
          const response = await getProjectBurndown(code);
          return response;
        }
      },
      queryKey: ["burndownData", code],
      enabled: !!(tabValue === "burndown"),
    });

  // Estimated vs actual
  const { data: estimatedActual, isLoading: estimatedActualLoading } =
    useQuery<IEstimatedActual>({
      queryFn: async () => {
        if (code) {
          const response = await getEstimatedActual(code);
          return response;
        }
      },
      queryKey: ["estimatedActual", code],
      enabled: !!(tabValue === "estimated_actual"),
    });

  const salesColumn: ColumnDef<ISalesRPDetail>[] = [
    {
      id: "added_on",
      accessorKey: "added_on",
      header: "Added On",
      cell: ({ row }) => (
        <div className="w-[100px]">
          <p>{moment(row.getValue("added_on")).format("Do, MMM YYYY")}</p>
          <p>{moment(row.getValue("added_on")).format("hh:mm")}</p>
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Unit",
      cell: ({ row }) => (
        <div className="w-[50px]">{changeNumberFormat(row.getValue("rp"))}</div>
      ),
      enableHiding: false,
    },
    {
      id: "remarks",
      accessorKey: "remarks",
      header: "Remarks",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("remarks")}</div>
      ),
      enableHiding: false,
    },
    {
      id: "added_by",
      accessorKey: "added_by",
      header: "By",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("added_by")}</div>
      ),
      enableHiding: false,
    },
  ];

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
      header: "Budget",
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
          ? projectTaskLabelData?.data[2]?.count?.reduce(
              (total: number, item: ITypeCount) => total + Number(item?.rp),
              0
            )
          : 0;

        const utilizedPercentage = (Number(row?.original?.rp) / totalRP) * 100;
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
          ? projectTaskLabelData?.data[2]?.count?.map((item) => {
              const totalRP = projectTaskLabelData
                ? projectTaskLabelData?.data[2]?.count?.reduce(
                    (total: number, item: ITypeCount) =>
                      total + Number(item?.rp),
                    0
                  )
                : 0;

              const utilizedPercentage = (Number(item?.rp) / totalRP) * 100;
              return {
                value: utilizedPercentage?.toFixed(2),
                name: item?.title,
              };
            })
          : [],
      },
    ],
  };

  // Burndown Opotion
  const burndownOption = {
    color: ["#60a5fa", "#f87171"],

    dataset: [
      {
        // Original dataset
        id: "burndown_data",
        source: burndownData
          ? Object?.entries(burndownData?.data?.daily_data).map(
              ([key, value]: any) => {
                return [key, value?.ideal_sales_rp, value?.real_sales_rp];
              }
            )
          : [],
      },
      // ideal_data
      {
        id: "burndown_ideal_data",
        fromDatasetId: "burndown_data",
        transform: {
          type: "filter",
          config: {
            // Adjust the condition according to your needs
            and: [{ dimension: 1, ">": 0 }],
          },
        },
      },
      // real_data
      {
        id: "burndown_real_data",
        fromDatasetId: "burndown_data",
        transform: {
          type: "filter",
          config: {
            // Corrected to filter out entries where real_sales_rp (third column, hence dimension: 2) is greater than 0
            and: [{ dimension: 2, ">": 0 }],
          },
        },
      },
    ],
    series: [
      {
        type: "line", // or 'bar', depending on your chart type
        dataSetId: "burndown_ideal_data",
        encode: {
          // Assuming the first column is 'date', the second is 'ideal_sales_rp', and the third is 'real_sales_rp'
          x: 0, // date
          y: 1, // ideal_sales_rp
        },
      },
      {
        type: "line", // or 'bar', depending on your chart type
        dataSetId: "burndown_real_data", // Use the filtered dataset
        encode: {
          x: 0, // date
          y: 2, // real_sales_rp
        },
      },
    ],
    xAxis: {
      type: "category",
      nameLocation: "middle",
    },
    yAxis: {
      name: "",
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let result = params[0].axisValueLabel + "<br/>";
        params.forEach(function (item: any) {
          result +=
            item.marker +
            " " +
            (item.seriesIndex === 0 ? "Ideal" : "Utilized") +
            ": " +
            item.value[item.seriesIndex + 1] +
            "<br/>";
        });
        return result;
      },
    },
  };

  // for dynamic content more details button
  const changeRoute = () => {
    switch (tabValue) {
      case "status":
        router?.push(`/projects/${code}/more-details`);
        break;
      case "burndown":
        router?.push(`/projects/${code}/burndown-chart`);
        break;
      case "estimated_actual":
        router?.push(`/projects/${code}/estimated-actual`);
        break;
      default:
        router?.push(`/projects/${code}`);
    }
  };

  // Gauge color change
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

  // SUMMARY REPORT CONTENT
  const gaugeOption = {
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: "200px",
      width: "300px",
    },
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
          // icon: "path://M10,0 L20,40 L0,40 Z",
          // length: "12%",
          // width: 20,
          // offsetCenter: [0, "-60%"],
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
              [0.2, "#B91C1C"],
              [0.4, "#EF4444"],
              [0.6, "#FD850A"],
              [0.8, "#FACC15"],
              [1, "#22C55E"],
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
            value: projectDetail?.data?.health?.overall_completion_percentage,
            name: "",
          },
        ],
        detail: {
          show: true,
          fontSize: 18,
          fontWeight: 500,
          // color: "inherit",
          color: gaugeColor(),
          formatter: (value: number) => {
            if (value >= 80) {
              return "Doing Great";
            } else if (value >= 40 && value < 80) {
              return "Need to be watched";
            } else {
              return "In Danger";
            }
          },
        },
      },
    ],
  };

  const nestedPieOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      show: false,
    },
    series: [
      // Task Completion
      {
        name: "Project Detail",
        type: "pie",
        selectedMode: "single",
        radius: ["80%", "100%"],
        padAngle: 3,
        label: {
          show: false,
        },
        itemStyle: {
          borderRadius: 20,
        },
        color: ["#0A82FD", "#F4F4F5"],
        labelLine: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
          scale: false,
        },
        data: [
          {
            value: projectDetail?.data?.health?.task_completion_percentage ?? 0,
            name: "Task Completion",
          },
          {
            value: projectDetail?.data?.health?.task_completion_percentage
              ? 100 - projectDetail?.data?.health?.task_completion_percentage
              : 0,
            name: "Task remaining",
          },
        ],
      },

      // Project Duration
      {
        name: "Project Detail",
        type: "pie",
        selectedMode: "single",
        radius: ["70%", "55%"],
        padAngle: 3,
        label: {
          show: false,
        },
        itemStyle: {
          borderRadius: 20,
        },
        color: ["#FD850A", "#F4F4F5"],
        labelLine: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
          scale: false,
        },
        data: [
          {
            value: projectDetail?.data?.health?.time_completion_percentage ?? 0,
            name: "Project Duration",
          },
          {
            value: projectDetail?.data?.health?.time_completion_percentage
              ? 100 - projectDetail?.data?.health?.time_completion_percentage
              : 0,
            name: "Remaining Project Duration",
          },
        ],
      },

      // RP Consumption
      {
        name: "Project Detail",
        type: "pie",
        radius: ["45%", "30%"],
        padAngle: 3,
        labelLine: {
          length: 30,
        },
        label: {
          show: false,
        },
        itemStyle: {
          borderRadius: 20,
        },
        color: ["#22C55E", "#F4F4F5"],
        emphasis: {
          label: {
            show: false,
          },
          scale: false,
        },
        data: [
          {
            value: projectDetail?.data?.health?.rp_completion_percentage ?? 0,
            name: "RP Consumption",
          },
          {
            value: projectDetail?.data?.health?.rp_completion_percentage
              ? 100 - projectDetail?.data?.health?.rp_completion_percentage
              : 0,
            name: "Remaining RP",
          },
        ],
      },
    ],
  };

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

  useEffect(() => {
    const myChart = chartRef.current?.getEchartsInstance();
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

    statusOption && myChart.setOption(statusOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [statusOption]);

  return {
    code,
    gitModalOpen,
    setGitModalOpen,
    memberModalOpen,
    setMemberModalOpen,
    salesModalOpen,
    setSalesModalOpen,
    openLeadSheet,
    setOpenLeadSheet,
    tabValue,
    setTabValue,
    projectDetail,
    isLoading,
    salesColumn,
    staffDetails,
    gaugeOption,
    nestedPieOption,
    // Status
    projectTaskLabelData,
    projectTaskLabelLoading,
    statusColumn,
    statusOption,
    // Burndown
    burndownData,
    burndownLoading,
    burndownOption,
    changeRoute,
    chartRef,
    estimatedActualGraph,
    gaugeColor,
  };
};

export default useProjectDetail;
