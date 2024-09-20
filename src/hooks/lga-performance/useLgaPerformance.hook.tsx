import { IRegionProps } from "@/interface/common-interface";
import {
  ILgaPerformance,
  ILgaPerformanceData,
} from "@/interface/device-interface";
import { getRegions } from "@/services/admin/admin-service";
import {
  exportPerformanceByLGA,
  fetchPerformanceByLGA,
  getPerformanceByLGA,
} from "@/services/devices/devices-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { exportToCsv } from "@/shared/utils/export-utils/export-util";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { useMutation, useQuery } from "react-query";
import { useDebounce } from "../debounce.hooks";
import config from "../../../config";
import { parseStreamedData } from "@/shared/utils/streamed-data-parse-utils";
import { Badge } from "@/shared/components/ui/badge";

const useLgaPerformance = () => {
  const { profileData } = useCommonStore();
  const { API_BASE_URL } = config;
  const { data: regionsList, isLoading: regionsLoading } =
    useQuery<IRegionProps>({
      queryKey: ["regions"],
      queryFn: () => getRegions(),
    });

  const [dateRange, setDateRange] = useState<DateRange>({
    from: moment().subtract(1, "months").toDate(),
    to: moment().toDate(),
  });
  const [regionId, setRegionId] = useState<string>("");
  const [stateId, setStateId] = useState<string>("");
  const [lga, setLga] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const [southWest, setSouthWest] = useState<string>("");
  const [northEast, setNorthEast] = useState<string>("");
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [searchTableTrigger, setSearchTableTrigger] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(12);

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
    setDateRange({
      from: moment().subtract(1, "months").toDate(),
      to: moment().toDate(),
    });
    setSearchTrigger(!searchTrigger);
    setPage(1);
  };

  const searchTextHandler = (value: string) => {
    setSearchText(value);
  };
  const searchTableTriggerHandler = () => {
    setSearchTableTrigger(!searchTableTrigger);
    setPage(1);
  };
  const { data: lgaPerformanceData, isLoading: lgaPerformanceLoading } =
    useQuery<ILgaPerformanceData>({
      queryKey: [
        "lgaPerformanceData",
        page,
        perPage,
        searchTrigger,
        searchTableTrigger,
      ],
      queryFn: async () => {
        if (regionId && stateId) {
          return await getPerformanceByLGA(
            page,
            perPage,
            moment(dateRange.from).format("YYYY-MM-DD"),
            moment(dateRange.to).format("YYYY-MM-DD"),
            regionId,
            stateId,
            lga.length > 0 ? lga.join(",") : "all",
            searchText
          );
        }
      },
    });

  const { data: lgaPerformanceMap, isLoading: lgaPerformanceMapLoading } =
    useQuery<any>({
      queryKey: ["lga-performance-map", southWest, northEast, searchTrigger],
      queryFn: async () => {
        if (profileData && regionId && stateId && southWest && northEast) {
          const body = await fetchPerformanceByLGA(
            API_BASE_URL,
            regionId,
            stateId,
            lga,
            southWest,
            northEast,
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            zoomLevel
          );
          const reader = body?.getReader();
          return await parseStreamedData(reader!);
        }
      },
    });

  // EXPORT
  const exportPerformanceLgaMutation = useMutation({
    mutationFn: () =>
      exportPerformanceByLGA(
        moment(dateRange.from).format("YYYY-MM-15"),
        moment(dateRange.to).format("YYYY-MM-15"),
        regionId,
        stateId,
        lga.length > 0 ? lga.join(",") : "all",
        searchText
      ),

    onSuccess: (data) => {
      const fileName = `lga_performance_${moment(new Date()).format(
        "YYYY-MM-DD"
      )}.csv`;
      exportToCsv(fileName, data?.data);
    },
  });

  const exportHandler = () => {
    exportPerformanceLgaMutation.mutate();
    showToast(TOAST_TYPES.success, "Download will start shortly!");
  };

  const lgaPerformanceColumns: ColumnDef<ILgaPerformance>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N.",
      enableHiding: false,
      cell: (props) => (
        <SerialNumberCell pageNumber={page} perPage={perPage} {...props} />
      ),
    },
    // Device ID
    {
      id: "device_id",
      accessorKey: "device_id",
      header: "Device ID",
      cell: ({ row }) => (
        <Badge variant={"info"}>{row.original.device_id || "-"}</Badge>
      ),
    },
    // Agent Name
    {
      id: "agent_name",
      accessorKey: "agent_name",
      header: "Agent Name",
      cell: ({ row }) => <div>{row.original.agent_name || "-"}</div>,
    },
    // No of GC Performed
    {
      id: "gc_count",
      accessorKey: "gc_count",
      header: "No of GC Performed",
      cell: ({ row }) => <div>{row.original.gc_count || "-"}</div>,
    },
  ];
  return {
    regionId,
    stateId,
    page,
    perPage,
    setRegionId,
    setStateId,
    setPage,
    setPerPage,
    lga,
    setLga,
    searchText,
    setSearchText,
    searchTrigger,
    setSearchTrigger,
    dateRange,
    setDateRange,
    southWest,
    setSouthWest,
    northEast,
    setNorthEast,
    zoomLevel,
    setZoomLevel,

    // FUNCTIONS
    perPageHandler,
    pageChangeHandler,
    resetHandler,
    searchTriggerHandler,
    exportHandler,
    searchTextHandler,
    searchTableTriggerHandler,
    // DATA TABLE
    lgaPerformanceColumns,

    // API
    lgaPerformanceData,
    lgaPerformanceLoading,
    exportPerformanceLgaMutation,
    lgaPerformanceMap,
    lgaPerformanceMapLoading,
  };
};

export default useLgaPerformance;
