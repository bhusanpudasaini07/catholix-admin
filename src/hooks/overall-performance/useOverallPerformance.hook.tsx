import { IRegionProps } from "@/interface/common-interface";
import {
  IOverallPerformanceProps,
  IOverallPerformanceResponse,
} from "@/interface/overall-performance-interface";
import { getRegions } from "@/services/admin/admin-service";
import {
  getOverallPerformance,
  exportOverallPerformance,
} from "@/services/overall-performance/overall-performance-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { exportToCsv } from "@/shared/utils/export-utils/export-util";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { useMutation, useQuery } from "react-query";

const useOverallPerformanceHook = () => {
  const { profileData } = useCommonStore();
  // STATES
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [regionId, setRegionId] = useState<string>("");
  const [stateId, setStateId] = useState<string>("");
  const [lga, setLga] = useState<string[]>([]);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: moment().subtract(1, "months").toDate(),
    to: moment().toDate(),
  });

  const { data: regionsList, isLoading: regionsLoading } =
    useQuery<IRegionProps>({
      queryKey: ["regions"],
      queryFn: () => getRegions(),
    });

  const { data: overallPerformanceData, isLoading: overallPerformanceLoading } =
    useQuery<IOverallPerformanceProps>({
      queryKey: ["overallPerformance", searchTrigger, page, perPage],
      queryFn: async () => {
        if (regionId && stateId) {
          return await getOverallPerformance(
            page,
            perPage,
            moment(dateRange.from).format("YYYY-MM-DD"),
            moment(dateRange.to).format("YYYY-MM-DD"),
            regionId,
            stateId,
            lga.length > 0 ? lga.join(",") : "all"
          );
        }
      },
    });

  const searchHandler = () => {
    setSearchTrigger(!searchTrigger);
  };

  // Functions
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
        searchHandler && searchHandler();
      } else {
        setRegionId("all");
        setStateId("all");
        setLga([]);
      }
    }

    setSearchTrigger(!searchTrigger);
    setPage(1);
  };

  const exportMutation = useMutation({
    mutationFn: () =>
      exportOverallPerformance(
        moment(dateRange?.from).format("YYYY-MM-DD"),
        moment(dateRange?.to).format("YYYY-MM-DD"),
        regionId,
        stateId,
        lga.length > 0 ? lga.join(",") : "all"
      ),

    onSuccess: (data) => {
      const fileName = `overall_performance_${moment(new Date()).format(
        "YYYY-MM-DD"
      )}.csv`;
      exportToCsv(fileName, data?.data);
    },
  });

  const exportHandler = () => {
    exportMutation.mutate();
    showToast(TOAST_TYPES.success, "Download will start shortly!");
  };

  //   Columns
  const generateColumns = (): ColumnDef<IOverallPerformanceResponse>[] => {
    const columns: ColumnDef<IOverallPerformanceResponse>[] = [
      {
        id: "sn",
        header: "S.N",
        cell: ({ row }) => (
          <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
        ),
      },
    ];

    if (overallPerformanceData?.data?.headers) {
      overallPerformanceData?.data?.headers?.forEach((header) => {
        columns.push({
          id: header?.access_key,
          accessorKey: header?.access_key,
          header: header?.display_name,
          cell: ({ row }: any) => {
            const value = row?.original?.[header?.access_key];
            if (
              header?.type === "number" &&
              header?.access_key === "conversion_rate"
            ) {
              return <Badge variant="warning">{value}%</Badge>;
            }
            return <p>{value || "-"}</p>;
          },
        });
      });
    }

    return columns;
  };

  const columns = generateColumns();

  return {
    // STATES
    perPage,
    page,
    setPerPage,
    setPage,
    regionId,
    stateId,
    setRegionId,
    setStateId,
    lga,
    setLga,
    dateRange,
    setDateRange,

    // FUNCTIONS
    exportHandler,
    resetHandler,
    searchHandler,
    perPageHandler,
    pageChangeHandler,

    // COLUMNS
    columns,

    // API
    overallPerformanceData,
    overallPerformanceLoading,
    exportMutation,
  };
};

export default useOverallPerformanceHook;
