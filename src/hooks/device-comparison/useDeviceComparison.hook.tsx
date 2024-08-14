import { IRegionProps } from "@/interface/common-interface";
import {
  IDeviceComparison,
  IDeviceComparisonChart,
  IDeviceComparisonData,
  IDevicePerformanceGCChart,
} from "@/interface/device-interface";
import { getRegions } from "@/services/admin/admin-service";
import {
  exportDevicesComparison,
  getDeviceComparison,
  getDeviceComparisonChart,
  getDeviceComparisonGCChart,
  getDevicePerformanceGCChart,
} from "@/services/devices/devices-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { exportToCsv } from "@/shared/utils/export-utils/export-util";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import { EChartsOption } from "echarts-for-react";
import moment from "moment";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";

const useDeviceComparison = () => {
  const { profileData } = useCommonStore();
  const [from, setFrom] = useState<string>(
    moment().subtract(1, "months").format("MMM YYYY")
  );
  const [to, setTo] = useState<string>(moment().format("MMM YYYY"));

  const [regionId, setRegionId] = useState<string>("");
  const [stateId, setStateId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [lga, setLga] = useState<string[]>([]);

  const { data: regionsList, isLoading: regionsLoading } =
    useQuery<IRegionProps>({
      queryKey: ["regions"],
      queryFn: () => getRegions(),
    });
  // FUNCTIONS
  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const resetHandler = () => {
    if (profileData && profileData?.regionId !== null) {
      const region = regionsList?.data?.regions?.find(
        (region) => region.id === profileData?.regionId
      );
      const state = regionsList?.data?.regions
        ?.find((region) => region?.id === profileData?.regionId)
        ?.states?.find((state) => state?.id === profileData?.stateId);

      const localGovs = state?.localGovernments
        ?.filter((lg) => profileData.localGovId?.includes(lg.id))
        ?.map((lg) => lg.code);

      if (profileData?.regionId !== 0) {
        setRegionId(region?.code!);
        setStateId(profileData?.stateId !== 0 ? state?.code! : "all");
        setLga(localGovs || []);
        searchTriggerHandler && searchTriggerHandler();
      } else {
        setRegionId("all");
        setStateId("all");
        setLga([]);
      }
    }
    setFrom(moment().subtract(1, "months").format("MMM YYYY"));
    setTo(moment().format("MMM YYYY"));
    setSearchTrigger(!searchTrigger);
    setPage(1);
  };

  const searchTriggerHandler = () => {
    setSearchTrigger(!searchTrigger);
  };

  const { data: deviceComparisonData, isLoading: deviceComparisonLoading } =
    useQuery<IDeviceComparison>({
      queryKey: ["device-comparison", page, perPage, searchTrigger],
      queryFn: async () => {
        if (regionId && stateId) {
          return await getDeviceComparison(
            page,
            perPage,
            moment(from).format("YYYY-MM-15"),
            moment(to).format("YYYY-MM-15"),
            regionId,
            stateId,
            lga.length > 0 ? lga.join(",") : "all"
          );
        }
      },
    });

  const {
    data: deviceComparisonChartData,
    isLoading: deviceComparisonChartLoading,
  } = useQuery<IDeviceComparisonChart>({
    queryKey: ["device-comparison-chart", searchTrigger],
    queryFn: async () => {
      if (regionId && stateId) {
        return await getDeviceComparisonChart(
          moment(from).format("YYYY-MM-15"),
          moment(to).format("YYYY-MM-15"),
          regionId,
          stateId,
          lga.length > 0 ? lga.join(",") : "all"
        );
      }
    },
  });

  const { data: gcChartData, isLoading: gcChartLoading } =
    useQuery<IDeviceComparisonChart>({
      queryFn: async () => {
        if (regionId && stateId) {
          return await getDeviceComparisonGCChart(
            moment(from).format("YYYY-MM-15"),
            moment(to).format("YYYY-MM-15"),
            regionId,
            stateId,
            lga.length > 0 ? lga.join(",") : "all"
          );
        }
      },
      queryKey: ["device-comparison-gc-chart", searchTrigger],
    });

  const chartData = useMemo(() => {
    if (!deviceComparisonChartData) return {};

    const formattedData: any = {};

    Object.entries(deviceComparisonChartData.data).forEach(([key, value]) => {
      Object.entries(value).forEach(([innerKey, innerValue]) => {
        if (!formattedData[innerKey]) {
          formattedData[innerKey] = {};
        }
        formattedData[innerKey][key] = innerValue;
      });
    });

    return formattedData;
  }, [deviceComparisonChartData]);

  const groupedGCChartData = useMemo(() => {
    if (gcChartData) {
      const dateFormat = "DD";
      const groupedData: any = {};

      Object.entries(gcChartData?.data).forEach(([monthIndex, monthData]) => {
        Object.entries(monthData).forEach(([date, value]) => {
          const day = moment(date).format(dateFormat);
          if (!groupedData[day]) {
            groupedData[day] = [0, 0];
          }
          groupedData[day][parseInt(monthIndex, 10)] += parseInt(
            String(value),
            10
          );
        });
      });

      const allDays = Array.from({ length: moment(to).daysInMonth() }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
      );

      allDays.forEach((day) => {
        if (!groupedData[day]) {
          groupedData[day] = [0, 0];
        }
      });

      return {
        xAxisData: allDays,
        seriesData1: allDays.map((day) => groupedData[day][0]),
        seriesData2: allDays.map((day) => groupedData[day][1]),
      };
    } else {
      return {
        xAxisData: [],
        seriesData1: [],
        seriesData2: [],
      };
    }
  }, [gcChartData]);

  // Columns
  const deviceComparisonColumns: ColumnDef<IDeviceComparisonData>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N",
      cell: ({ row }) => (
        <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
      ),
    },
    // Region
    {
      id: "region",
      accessorKey: "region",
      header: "Region",
      cell: ({ row }) => (
        <div>{row.original.region || row.original.region_code || "-"}</div>
      ),
    },
    // State
    {
      id: "state",
      accessorKey: "state",
      header: "State",
      cell: ({ row }) => (
        <div>{row.original.state || row.original.state_code || "-"}</div>
      ),
    },
    // LGA
    {
      id: "lga",
      accessorKey: "lga",
      header: "Lga",
      cell: ({ row }) => (
        <div>{row.original.lga || row.original.lg_code || "-"}</div>
      ),
    },
    // Onboarded
    {
      id: "onboarded_percent",
      accessorKey: "onboarded_percent",
      header: "% Onboarded",
      cell: ({ row }) => (
        <div className="flex gap-3 items-center">
          <Badge
            className="w-[55px] justify-center"
            variant={
              row.original.onboarded_percent_range1 >
              row.original.onboarded_percent_range2
                ? "success"
                : "destructiveLight"
            }
          >
            {row.original.onboarded_percent_range1 || 0}%
          </Badge>
          <span>-</span>
          <Badge
            className="w-[55px] justify-center"
            variant={
              row.original.onboarded_percent_range1 <
              row.original.onboarded_percent_range2
                ? "success"
                : "destructiveLight"
            }
          >
            {row.original.onboarded_percent_range2 || 0}%
          </Badge>
        </div>
      ),
    },
    // Active
    {
      id: "active_percent",
      accessorKey: "active_percent",
      header: "% Active",
      cell: ({ row }) => <div>{"-"}</div>,
    },
    // GC Perform 1 to 4
    {
      id: "gc-perform_1_to_4",
      accessorKey: "gc-perform_1_to_4",
      header: ({ header }) => (
        <div>
          Device Performing 1-4 GCs <br /> Daily
        </div>
      ),
      cell: ({ row }) => <div>{"-"}</div>,
    },
    // GC Greateer than 4
    {
      id: "gc-greater_than_4",
      accessorKey: "gc-greater_than_4",
      header: ({ header }) => (
        <div>
          Device Performing <br /> Greater than 4 GCs <br /> Daily
        </div>
      ),
      cell: ({ row }) => <div>{"-"}</div>,
    },
    // Inactive Onboarded
    {
      id: "inactive_onboarded",
      accessorKey: "inactive_onboarded",
      header: ({ header }) => (
        <div>
          Inactive since <br /> Onboarded
        </div>
      ),
      cell: ({ row }) => <div>{"-"}</div>,
    },
    // Gross Connections
    {
      id: "gross_connections",
      accessorKey: "gross_connections",
      header: "Gross Connections",
      cell: ({ row }) => <div>{"-"}</div>,
    },
    // Deployed
    {
      id: "deployed",
      accessorKey: "deployed",
      header: "Deployed",
      cell: ({ row }) => <div>{"-"}</div>,
    },
  ];

  const generateChartColors = (data: any) => {
    return data
      .map((item: any) => {
        return item[1] > item[0] ? "#4ADE80" : "#F87171";
      })
      .flat();
  };

  const generateGCChartColors = (data: any) => {
    return data[0].map((_: any, i: number) =>
      data[2][i] > data[1][i] ? "#4ADE80" : "#F87171"
    );
  };

  const exportDeviceComparisonMutation = useMutation({
    mutationFn: () =>
      exportDevicesComparison(
        moment(from).format("YYYY-MM-15"),
        moment(to).format("YYYY-MM-15"),
        regionId,
        stateId,
        lga.length > 0 ? lga.join(",") : "all"
      ),

    onSuccess: (data) => {
      const fileName = `device_comparison_${moment(new Date()).format(
        "YYYY-MM-DD"
      )}.csv`;
      exportToCsv(fileName, data?.data);
    },
  });

  const exportHandler = () => {
    exportDeviceComparisonMutation.mutate();
    showToast(TOAST_TYPES.success, "Download will start shortly!");
  };
  // CHART
  const deviceComparisonChartOption: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    // legend: {
    //   data: ["Comparison 1", "Comparison 2"],
    // },
    grid: {
      top: 15,
      left: "10%",
      right: "10%",
      bottom: 30,
    },
    xAxis: {
      type: "category",
      data: deviceComparisonChartData ? Object.keys(chartData) : [],
      show: true,
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Comparison 1",
        data: deviceComparisonChartData
          ? Object.values(chartData).map((item: any) => item[0])
          : [],
        color: "#EAB308",

        type: "bar",
      },
      {
        name: "Comparison 2",
        data: deviceComparisonChartData
          ? Object.values(chartData).map((item: any) => item[1])
          : [],
        itemStyle: {
          color: (params: any) =>
            generateChartColors(Object.values(chartData))[params.dataIndex],
        },
        type: "bar",
      },
    ],
  };

  const gcChartOption = useMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "7%",
        right: "4%",
        bottom: "10%",
        top: "10%",
      },
      xAxis: {
        type: "category",
        data: groupedGCChartData?.xAxisData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Comparison 1",
          data: groupedGCChartData?.seriesData1,
          type: "bar",
          itemStyle: {
            color: "#EAB308",
          },
        },
        {
          name: "Comparison 2",
          data: groupedGCChartData?.seriesData2,
          type: "bar",
          itemStyle: {
            color: (params: any) =>
              generateGCChartColors(Object.values(groupedGCChartData))[
                params.dataIndex
              ],
          },
        },
      ],
    };
  }, [groupedGCChartData]);

  return {
    // STATES
    from,
    setFrom,
    to,
    setTo,
    regionId,
    setRegionId,
    stateId,
    setStateId,
    lga,
    setLga,
    page,
    setPage,
    perPage,
    setPerPage,

    // FUNCTIONS
    perPageHandler,
    pageChangeHandler,
    resetHandler,
    searchTriggerHandler,
    exportHandler,

    // COlumns
    deviceComparisonColumns,

    // API
    deviceComparisonLoading,
    deviceComparisonData,
    deviceComparisonChartLoading,
    exportDeviceComparisonMutation,
    gcChartLoading,

    // Chart
    deviceComparisonChartOption,
    gcChartOption,
  };
};

export default useDeviceComparison;
