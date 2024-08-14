import { IRegionProps } from "@/interface/common-interface";
import {
  IDevicePerformance,
  IDevicePerformanceChart,
  IDevicePerformanceData,
  IDevicePerformanceGCChart,
} from "@/interface/device-interface";
import { getRegions } from "@/services/admin/admin-service";
import {
  exportDevicePerformance,
  exportDevicesComparison,
  getDevicePerformance,
  getDevicePerformanceChart,
  getDevicePerformanceGCChart,
} from "@/services/devices/devices-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { exportToCsv } from "@/shared/utils/export-utils/export-util";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import { EChartsOption } from "echarts-for-react";
import moment from "moment";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useMutation, useQuery } from "react-query";

const useDevicePerformance = () => {
  const { profileData } = useCommonStore();
  // STATES
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: moment().subtract(1, "months").toDate(),
    to: moment().toDate(),
  });

  const [regionId, setRegionId] = useState<string>("");
  const [stateId, setStateId] = useState<string>("");
  const [lga, setLga] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);

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
  const searchTriggerHandler = () => {
    setSearchTrigger(!searchTrigger);
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
    setPage(1);
    setDateRange({
      from: moment().subtract(1, "months").toDate(),
      to: moment().toDate(),
    });
    setSearchTrigger(!searchTrigger);
  };

  // API

  const {
    data: devicePerformanceTable,
    isLoading: devicePerformanceTableLoading,
  } = useQuery<IDevicePerformance>({
    queryFn: async () => {
      if (regionId && stateId) {
        const response = await getDevicePerformance(
          page,
          perPage,
          moment(dateRange?.from).format("YYYY-MM-DD"),
          moment(dateRange?.to).format("YYYY-MM-DD"),
          regionId,
          stateId,
          lga.length > 0 ? lga.join(",") : "all"
        );
        return response;
      }
    },
    queryKey: ["device-performance", page, perPage, searchTrigger],
  });

  const {
    data: devicePerformanceChart,
    isLoading: devicePerformanceChartLoading,
  } = useQuery<IDevicePerformanceChart>({
    queryFn: async () => {
      if (regionId && stateId) {
        return await getDevicePerformanceChart(
          moment(dateRange?.from).format("YYYY-MM-DD"),
          moment(dateRange?.to).format("YYYY-MM-DD"),
          regionId,
          stateId,
          lga.length > 0 ? lga.join(",") : "all"
        );
      }
    },
    queryKey: ["device-performance-chart", searchTrigger],
  });

  const { data: gcChartData, isLoading: gcChartLoading } =
    useQuery<IDevicePerformanceGCChart>({
      queryFn: async () => {
        if (regionId && stateId) {
          return await getDevicePerformanceGCChart(
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            regionId,
            stateId,
            lga.length > 0 ? lga.join(",") : "all"
          );
        }
      },
      queryKey: ["device-performance-gc-chart", searchTrigger],
    });

  const exportDevicePerformanceMutation = useMutation({
    mutationFn: () =>
      exportDevicePerformance(
        moment(dateRange?.from).format("YYYY-MM-DD"),
        moment(dateRange?.to).format("YYYY-MM-DD"),
        regionId,
        stateId,
        lga.length > 0 ? lga.join(",") : "all"
      ),

    onSuccess: (data) => {
      const fileName = `device_performance_${moment(new Date()).format(
        "YYYY-MM-DD"
      )}.csv`;
      exportToCsv(fileName, data?.data);
    },
  });

  const exportHandler = () => {
    exportDevicePerformanceMutation.mutate();
    showToast(TOAST_TYPES.success, "Download will start shortly!");
  };

  // COLUMNS

  const devicePerformanceColumns: ColumnDef<IDevicePerformanceData>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N.",
      enableHiding: false,
      cell: (props) => (
        <SerialNumberCell {...props} pageNumber={page} perPage={perPage} />
      ),
    },

    // REGION
    {
      id: "region_code",
      accessorKey: "region_code",
      header: "Region",
      enableHiding: false,
      cell: ({ row }) => (
        <p>{row.original.region || row.original?.region_code || "-"}</p>
      ),
    },

    // STATE
    {
      id: "state_code",
      accessorKey: "state_code",
      header: "State",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="whitespace-nowrap">
          {row.original.state || row.original.state_code || "-"}
        </p>
      ),
    },

    // LGA
    {
      id: "lg_code",
      accessorKey: "lg_code",
      header: "LGA",
      enableHiding: false,
      cell: ({ row }) => (
        <p>{row.original.lga || row.original.lg_code || "-"}</p>
      ),
    },

    // ONBOARDED NUMBER
    {
      id: "onboarded_number",
      accessorKey: "onboarded_number",
      header: "Onboarded Number",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.onboarded_number || "-"}</p>,
    },

    // ONBOARDED %
    {
      id: "onboarded_percent",
      accessorKey: "onboarded_percent",
      header: "Onboarded %",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.onboarded_percent || "0"}%</p>,
    },

    // ACTIVE
    {
      id: "active",
      accessorKey: "active",
      header: "Active",
      enableHiding: false,
      cell: ({ row }) => <p>{"-"}</p>,
    },

    // % ACTIVE
    {
      id: "activePercent",
      accessorKey: "activePercent",
      header: "% Active",
      enableHiding: false,
      cell: ({ row }) => <p>{"-"}</p>,
    },

    // ACTIVE WITH min 1 GC
    {
      id: "activeWith1GC",
      accessorKey: "activeWith1GC",
      header: () => (
        <p>
          Active with Min 1GC post <br />
          onboarding from Inception
        </p>
      ),
      enableHiding: false,
      cell: ({ row }) => <p>{"-"}</p>,
    },

    // % ACTIVE WITH min 1 GC
    {
      id: "activeWith1GCPercent",
      accessorKey: "activeWith1GCPercent",
      header: () => (
        <p>
          % Active with Min 1GC post <br />
          onboarding from Inception
        </p>
      ),
      enableHiding: false,
      cell: ({ row }) => <p>{"-"}</p>,
    },

    // INACTIVE SINCE ONBOARDING
    {
      id: "inactiveSinceOnboarding",
      accessorKey: "inactiveSinceOnboarding",
      header: () => (
        <p>
          Inactive since <br />
          Onboarding
        </p>
      ),
      enableHiding: false,
      cell: ({ row }) => <p>{"-"}</p>,
    },

    // GROSS CONNECTIONS
    {
      id: "grossConnections",
      accessorKey: "grossConnections",
      header: "Gross Connections",
      enableHiding: false,
      cell: ({ row }) => <p>{"-"}</p>,
    },

    // DEPLOYED
    {
      id: "deployed",
      accessorKey: "deployed",
      header: "Deployed",
      enableHiding: false,
      cell: ({ row }) => <p>{"-"}</p>,
    },
  ];

  const gaChartOption: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      top: 15,
      left: "10%",
      right: "10%",
      bottom: 30,
    },
    xAxis: {
      type: "category",
      data: devicePerformanceChart
        ? Object.keys(devicePerformanceChart?.data)
        : [],
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
        data: devicePerformanceChart
          ? Object.values(devicePerformanceChart?.data).map(Number)
          : [],
        color: "#0EA5E9",
        barWidth:
          Object.keys(devicePerformanceChart?.data || {}).length === 1
            ? "10%"
            : "60%",
        type: "bar",
      },
    ],
  };

  const groupedGCChartData = useMemo(() => {
    if (gcChartData) {
      const isWithinMonth =
        moment(dateRange?.to).diff(moment(dateRange?.from), "months") > 1;
      const dateFormat = isWithinMonth ? "MMM" : "DD MMM";

      const groupedData: any = Object.entries(gcChartData?.data).reduce(
        (acc, item) => {
          const date = moment(item[0]).format(dateFormat);
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += parseInt(item[1], 10);
          return acc;
        },
        {} as Record<string, number>
      );

      if (isWithinMonth) {
        // Ensure all months are included
        const allMonths = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        allMonths.forEach((month) => {
          if (!groupedData[month]) {
            groupedData[month] = 0;
          }
        });

        return {
          xAxisData: allMonths,
          seriesData: allMonths.map((month) => groupedData[month]),
        };
      } else {
        const allDates = Object.keys(groupedData);
        return {
          xAxisData: allDates,
          seriesData: allDates.map((date) => groupedData[date]),
        };
      }
    } else {
      return {
        xAxisData: [],
        seriesData: [],
      };
    }
  }, [gcChartData]);

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
          data: groupedGCChartData?.seriesData,
          type: "bar",
          itemStyle: {
            color: "#FF0000",
          },
        },
      ],
    };
  }, [groupedGCChartData]);

  return {
    // STATES
    dateRange,
    setDateRange,
    regionId,
    setRegionId,
    stateId,
    setStateId,
    page,
    setPage,
    perPage,
    setPerPage,
    lga,
    setLga,
    searchTrigger,
    setSearchTrigger,

    // FUNCTIONS
    perPageHandler,
    pageChangeHandler,
    searchTriggerHandler,
    resetHandler,
    exportHandler,

    // COlumns
    devicePerformanceColumns,

    // Chart
    gaChartOption,
    gcChartOption,

    // API
    devicePerformanceTable,
    devicePerformanceTableLoading,
    exportDevicePerformanceMutation,
    devicePerformanceChartLoading,
    gcChartLoading,
  };
};

export default useDevicePerformance;
