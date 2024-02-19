import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

import { getRpSummary } from "@/services/project/project-service";
import { IConsumptionData } from "@/interface/project-interface";
import useProjectDetail from "./useProjectDetail.hook";

const useRPConsumption = () => {
  const { projectDetail } = useProjectDetail();
  const {
    query: { code },
  } = useRouter();

  // STATES
  const [barType, setBarType] = useState("sum");
  const [tab, setTab] = useState("line");

  const [dateType, setDateType] = useState("daily");
  const [wiseType, setWiseType] = useState("role");

  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  //   for dateType = daily
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  //   for dateType = monthly
  const [month, setMonth] = useState<DateRange | undefined>({
    from: moment().subtract(1, "months").startOf("month").toDate(),
    to: moment().endOf("month").toDate(),
  });

  const {
    data: rpConsumption,
    isLoading,
    refetch,
  } = useQuery<IConsumptionData>({
    queryFn: async () => {
      if (code) {
        const response = await getRpSummary(
          code,
          dateType,
          dateType === "daily" ? moment(date?.from).format("YYYY-MM-DD") : "",
          dateType === "daily" ? moment(date?.to).format("YYYY-MM-DD") : "",
          dateType === "monthly" ? moment(month?.from).format("YYYY-MM") : "",
          dateType === "monthly" ? moment(month?.to).format("YYYY-MM") : ""
        );
        return response;
      }
    },
    enabled: !!date?.to,
    queryKey: ["rpConsumption", code, date, dateType],
  });

  // rolewise data processing
  const processRolesData = (rolewiseData: { [key: string]: any }) => {
    const seriesData: { [roleName: string]: number[] } = {};
    const uniqueRoleNames: Set<string> = new Set();

    Object.entries(rolewiseData).forEach(([date, roles]) => {
      roles.forEach(({ role_name, rp }: any) => {
        uniqueRoleNames.add(role_name);
        seriesData[role_name] = seriesData[role_name] || [];
        seriesData[role_name].push(Number(rp));
      });
    });

    return {
      series: Object.entries(seriesData).map(([roleName, dataPoints]) => ({
        name: roleName,
        type: "line",
        stack: barType === "sum" ? "Total" : "",
        data: dataPoints,
        smooth: true,
      })),
      uniqueRoleNames: Array.from(uniqueRoleNames),
    };
  };

  // departmentwise data processing
  const processDepartmentData = (departmentwiseData: {
    [key: string]: any;
  }) => {
    const seriesData: { [departmentName: string]: number[] } = {};
    const uniqueRoleNames: Set<string> = new Set();

    Object.entries(departmentwiseData).forEach(([date, department]) => {
      department.forEach(({ department_name, rp }: any) => {
        uniqueRoleNames.add(department_name);
        seriesData[department_name] = seriesData[department_name] || [];
        seriesData[department_name].push(Number(rp));
      });
    });

    return {
      departmentSeries: Object.entries(seriesData).map(
        ([departmentName, dataPoints]) => ({
          name: departmentName,
          type: "line",
          stack: barType === "sum" ? "Total" : "",
          data: dataPoints,
          smooth: true,
        })
      ),
      departmentUniqueNames: Array.from(uniqueRoleNames),
    };
  };

  const { series, uniqueRoleNames } = rpConsumption?.data?.rolewise
    ? processRolesData(rpConsumption.data.rolewise)
    : { series: [], uniqueRoleNames: [] };

  const { departmentSeries, departmentUniqueNames } = rpConsumption?.data
    ?.departmentwise
    ? processDepartmentData(rpConsumption?.data?.departmentwise)
    : {
        departmentSeries: [],
        departmentUniqueNames: [],
      };

  const lineOption = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: wiseType === "role" ? uniqueRoleNames : departmentUniqueNames,
      itemGap: 15,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "0%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data:
        wiseType === "role"
          ? Object.keys(rpConsumption?.data?.rolewise || {})
          : Object.keys(rpConsumption?.data?.departmentwise || {}),
      axisLabel: {
        formatter: (value: any) => {
          return `${moment(value).format("MMM DD") ?? 0}\n\n ${
            moment(value).format("ddd") ?? 0
          }`;
        },
        fontSize: 14,
      },
    },
    yAxis: {
      type: "value",
    },
    series: wiseType === "role" ? series : departmentSeries,
  };

  //   for barType == sum
  const barStackOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: wiseType === "role" ? uniqueRoleNames : departmentUniqueNames,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data:
        wiseType === "role"
          ? Object.keys(rpConsumption?.data?.rolewise || {})
          : Object.keys(rpConsumption?.data?.departmentwise || {}),
      axisLabel: {
        formatter: (value: any) => {
          return `${moment(value).format("MMM DD") ?? 0}\n ${
            moment(value).format("ddd") ?? 0
          }`;
        },
        fontSize: 14,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}",
      },
    },
    series:
      wiseType === "role"
        ? series.map((item) => ({
            ...item,
            type: "bar",
            stack: barType === "sum",
            emphasis: {
              focus: "series",
            },
            data: item.data.map((point) => ({
              value: point,
            })),
            label: {
              show: true,
              position: "insideBottom",
              formatter: "{c}",
            },
          }))
        : departmentSeries.map((item) => ({
            ...item,
            type: "bar",
            stack: barType === "sum",
            emphasis: {
              focus: "series",
            },
            data: item.data.map((point) => ({
              value: point,
            })),
            label: {
              show: true,
              position: "insideBottom",
              formatter: "{c}",
            },
          })),
  };

  //   for barType == individual
  const barLabelRotationOption = {
    ...barStackOption,
    series:
      wiseType === "role"
        ? series.map((item) => ({
            ...item,
            type: "bar",
            stack: barType === "sum",
            emphasis: {
              focus: "series",
            },
            data: item.data.map((point) => ({
              value: point,
              label: {
                show: false,
                position: "top",
                rotate: 90,
                formatter: "{c}",
                fontSize: 14,
                color: "black",
              },
            })),
          }))
        : departmentSeries.map((item) => ({
            ...item,
            type: "bar",
            stack: barType === "sum",
            emphasis: {
              focus: "series",
            },
            data: item.data.map((point) => ({
              value: point,
              label: {
                show: false,
                position: "top",
                rotate: 90,
                formatter: "{c}",
                fontSize: 14,
                color: "black",
              },
            })),
          })),
  };

  useEffect(() => {
    if (projectDetail?.data?.dates?.last_log_date) {
      setDate({
        from: moment(new Date(projectDetail?.data?.dates?.last_log_date))
          .subtract(10, "days")
          .toDate(),
        to: new Date(projectDetail?.data?.dates?.last_log_date),
      });
      setMonth({
        from: moment(new Date(projectDetail?.data?.dates?.last_log_date))
          .subtract(1, "months")
          .startOf("month")
          .toDate(),
        to: moment(new Date(projectDetail?.data?.dates?.last_log_date))
          .endOf("month")
          .toDate(),
      });
    }
  }, [projectDetail, setDate]);

  return {
    tab,
    setTab,
    wiseType,
    setWiseType,
    barType,
    setBarType,
    dateType,
    setDateType,
    dateRangeOpen,
    setDateRangeOpen,
    date,
    setDate,
    rpConsumption,
    isLoading,
    lineOption,
    barStackOption,
    barLabelRotationOption,
  };
};

export default useRPConsumption;
