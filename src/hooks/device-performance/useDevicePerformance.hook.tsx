import { IRegionProps } from "@/interface/common-interface";
import {
  IDevicePerformance,
  IDevicePerformanceChart,
  IDevicePerformanceData,
} from "@/interface/device-interface";
import { getRegions } from "@/services/admin/admin-service";
import {
  getDevicePerformance,
  getDevicePerformanceChart,
} from "@/services/devices/devices-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import { EChartsOption } from "echarts-for-react";
import moment from "moment";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

const useDevicePerformance = () => {
  const { profileData } = useCommonStore();
  // STATES
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: moment().subtract(1, "months").toDate(),
    to: moment().toDate(),
  });

  const [regionId, setRegionId] = useState<string>("all");
  const [stateId, setStateId] = useState<string>("all");
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
      if (lga) {
        return await getDevicePerformance(
          page,
          perPage,
          moment(dateRange?.from).format("YYYY-MM-DD"),
          moment(dateRange?.to).format("YYYY-MM-DD"),
          regionId,
          stateId,
          lga.length > 0 ? lga.join(",") : "all"
        );
      }
    },
    queryKey: ["device-performance", page, perPage, searchTrigger],
  });

  const {
    data: devicePerformanceChart,
    isLoading: devicePerformanceChartLoading,
  } = useQuery<IDevicePerformanceChart>({
    queryFn: async () => {
      if (lga) {
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
      cell: ({ row }) => <p>{row.original.region || "-"}</p>,
    },

    // STATE
    {
      id: "state_code",
      accessorKey: "state_code",
      header: "State",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="whitespace-nowrap">{row.original.state || "-"}</p>
      ),
    },

    // LGA
    {
      id: "lg_code",
      accessorKey: "lg_code",
      header: "LGA",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.lga || "-"}</p>,
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
      cell: ({ row }) => <p>{row.original.onboarded_percent || "-"}</p>,
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

    // COlumns
    devicePerformanceColumns,

    // Chart
    gaChartOption,

    // API
    devicePerformanceTable,
    devicePerformanceTableLoading,
  };
};

export default useDevicePerformance;
