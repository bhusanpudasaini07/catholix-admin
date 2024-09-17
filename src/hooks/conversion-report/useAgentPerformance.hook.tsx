import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import moment from "moment";
import { DateRange } from "react-day-picker";
import { ColumnDef } from "@tanstack/react-table";

import {
  IAgentPerformance,
  IAgentPerformanceResponse,
  IAgentPerformanceHeader,
} from "@/interface/conversion-rate-interface";
import {
  getAgentPerformance,
  exportAgentPerformance,
} from "@/services/conversion-rate/conversion-rate-service";
import { useCommonStore } from "@/store/common-store";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { exportToCsv } from "@/shared/utils/export-utils/export-util";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { IRegionProps } from "@/interface/common-interface";
import { getRegions } from "@/services/admin/admin-service";

interface IProps {
  data: IAgentPerformance;
}

const useAgentPerformance = () => {
  const { profileData } = useCommonStore();
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

  const { data: agentPerformanceData, isLoading: agentPerformanceLoading } =
    useQuery<IProps>({
      queryKey: ["agentPerformance", searchTrigger, page, perPage],
      queryFn: async () => {
        if (regionId && stateId) {
          return await getAgentPerformance(
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
      exportAgentPerformance(
        moment(dateRange?.from).format("YYYY-MM-DD"),
        moment(dateRange?.to).format("YYYY-MM-DD"),
        regionId,
        stateId,
        lga.length > 0 ? lga.join(",") : "all"
      ),

    onSuccess: (data) => {
      const fileName = `agent_performance_${moment(new Date()).format(
        "YYYY-MM-DD"
      )}.csv`;
      exportToCsv(fileName, data?.data);
    },
  });

  const exportHandler = () => {
    exportMutation.mutate();
    showToast(TOAST_TYPES.success, "Download will start shortly!");
  };

  const generateColumns = (
    type: "high" | "low"
  ): ColumnDef<IAgentPerformanceResponse>[] => {
    const columns: ColumnDef<IAgentPerformanceResponse>[] = [
      {
        id: "sn",
        header: "S.N",
        cell: ({ row }) => (
          <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
        ),
      },
    ];

    if (agentPerformanceData?.data?.headers) {
      agentPerformanceData.data?.headers.forEach(
        (header: IAgentPerformanceHeader) => {
          columns.push({
            id: header?.access_key,
            accessorKey: header?.access_key,
            header: header?.display_name,
            cell: ({ row }: any) => {
              const value = row.original[header?.access_key];
              if (
                header?.type === "number" &&
                header?.access_key === "conversion_rate"
              ) {
                return (
                  <Badge variant={type === "high" ? "success" : "warning"}>
                    {value}%
                  </Badge>
                );
              }
              return <p>{value || "-"}</p>;
            },
          });
        }
      );
    }

    return columns;
  };

  const highColumns = generateColumns("high");
  const lowColumns = generateColumns("low");

  return {
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
    exportHandler,
    resetHandler,
    searchHandler,
    perPageHandler,
    pageChangeHandler,
    highColumns,
    lowColumns,
    agentPerformanceData,
    agentPerformanceLoading,
    exportMutation,
  };
};

export default useAgentPerformance;
