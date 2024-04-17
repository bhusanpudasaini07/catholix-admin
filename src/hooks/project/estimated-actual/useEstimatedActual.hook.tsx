import { EChartsInstance } from "echarts-for-react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "react-query";

import { IFilterConfigRoleGroup } from "@/interface/common-interface";
import {
  IEstimatedActual,
  IProjectDetail,
  IProjectIndivRole,
  IProjectRoleRPSummary,
} from "@/interface/project-interface";
import {
  getEstimatedActual,
  getProjectDetail,
  getProjectRoleRp,
} from "@/services/project/project-service";
import {
  calculatePercentage,
  calculateTimeLog,
  changeNumberFormat,
} from "@/shared/utils/rp-utils";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/shared/utils/utils";

interface IProps {
  data: IProjectDetail;
}

const useEstimatedActual = () => {
  const {
    query: { code },
  } = useRouter();
  const { filterConfig } = useCommonStore();
  // REFS
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
          estimatedActual?.data?.map((item) => Math.round(item?.actual)) ?? [],
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
        data:
          estimatedActual?.data?.map((item) => Math.round(item?.quote)) ?? [],
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
          estimatedActual?.data?.map((item) => Math.round(item?.estimated)) ??
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
      // Estimated stack
      {
        name: "Used from Estimated",
        type: "bar",
        stack: "estimated",
        data:
          projectRoleRp?.data?.map((item) => ({
            value:
              item?.estimated === 0
                ? 0
                : item?.actual > item?.estimated
                ? Math.round(item?.estimated)
                : Math.round(item?.actual),
            itemStyle: {
              color: "#3B82F6", // Dark blue for used from estimated
            },
          })) ?? [],
      },
      {
        name: "Estimated",
        type: "bar",
        stack: "estimated",
        data:
          projectRoleRp?.data?.map((item) => ({
            value:
              item?.actual > item?.estimated
                ? 0
                : Math.round(item.estimated - item?.actual),
            itemStyle: {
              color: "#CEE6FF", // Light blue for estimated
            },
          })) ?? [],
      },
      {
        name: "Over Estimated",
        type: "bar",
        stack: "estimated",
        data:
          projectRoleRp?.data?.map((item) => ({
            value:
              item.actual > item.estimated
                ? Math.round(item.actual - item.estimated)
                : 0,
            itemStyle: {
              color: "#EF4444", // Red for over estimated
            },
          })) ?? [],
      },
      // Budget stack
      {
        name: "Used from Budget",
        type: "bar",
        stack: "budget",
        data:
          projectRoleRp?.data?.map((item) => ({
            value:
              item?.quote === 0
                ? 0
                : item?.actual > item?.quote
                ? Math.round(item?.quote)
                : Math.round(item?.actual),
            itemStyle: {
              color: "#22C55E", // Dark green for used from budget
            },
          })) ?? [],
      },
      {
        name: "Budget",
        type: "bar",
        stack: "budget",
        data:
          projectRoleRp?.data?.map((item) => ({
            value:
              item?.actual > item?.quote
                ? 0
                : Math.round(item.quote - item?.actual),
            itemStyle: {
              color: "#A7F3D0", // Light green for budget
            },
          })) ?? [],
      },
      {
        name: "Over Budget",
        type: "bar",
        stack: "budget",
        data:
          projectRoleRp?.data?.map((item) => ({
            value:
              item.actual > item.quote
                ? Math.round(item.actual - item.quote)
                : 0,
            itemStyle: {
              color: "#EF4444", // Red for over budget
            },
          })) ?? [],
      },
    ],
  };

  // Table column for individual department
  const individualRoleColumn: ColumnDef<IProjectIndivRole>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: ({ row }: any) => (
        <div className="font-medium text-zinc-500">{row?.index + 1}.</div>
      ),
    },
    // Info
    {
      id: "member_info",
      accessorKey: "member_info",
      header: "Member Info",
      cell: ({ row }) => (
        <div className="font-semibold text-primary">{row?.original?.title}</div>
      ),
    },
    // Estimate
    {
      id: "estimated",
      accessorKey: "estimated",
      header: "Estimate",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-500">
          {changeNumberFormat(row?.getValue("estimated"))}
        </div>
      ),
    },
    // Budget
    {
      id: "quote",
      accessorKey: "quote",
      header: "Budget",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-500">
          {changeNumberFormat(row?.getValue("quote"))}
        </div>
      ),
    },
    // Actual Spent
    {
      id: "actual",
      accessorKey: "actual",
      header: () => (
        <div>
          Actual
          <br />
          Spent
        </div>
      ),
      cell: ({ row }) => (
        <div
          className={cn(
            row?.original?.actual > row?.original?.estimated
              ? "text-destructive"
              : "text-zinc-500",
            "font-semibold"
          )}
        >
          {changeNumberFormat(row?.getValue("actual"))}
        </div>
      ),
    },
    // Logged Hours
    {
      id: "actual_time",
      accessorKey: "actual_time",
      header: () => (
        <div>
          Logged
          <br />
          Hours
        </div>
      ),
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(row?.original?.actual_time);
        return (
          <div className="font-semibold text-zinc-500">
            {hours > 0 && `${hours}H`} {`${minutes}M`}
          </div>
        );
      },
    },
  ];

  const groupByDepartment = useMemo(() => {
    const roleGroups: IFilterConfigRoleGroup[] = filterConfig?.role_group || [];
    const projectRoles = projectRoleRp?.data || [];

    // quicker access to projectRoles by title
    const projectRolesMap = new Map(
      projectRoles.map((role) => [role.title, role])
    );

    return roleGroups.reduce((acc: any[], group) => {
      // Filter roles directly using the map for efficiency
      const rolesData = group.roles.reduce((acc: any[], role: any) => {
        const roleData = projectRolesMap.get(role.title);
        if (roleData) {
          acc.push(roleData);
        }
        return acc;
      }, []);

      if (rolesData.length > 0) {
        acc.push({
          department_title: group.title,
          roles: rolesData,
        });
      }

      return acc;
    }, []);
  }, [filterConfig, projectRoleRp]);

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
    individualRoleColumn,
    overallChartRef,

    // API Data
    projectDetail,
    projectLoading,
    estimatedActual,
    estimatedActualLoading,
    projectRoleRp,
    projectRoleRPLoading,

    groupByDepartment,
  };
};

export default useEstimatedActual;
