import {
  exportImeiMismatchData,
  getImeiMisMatchData,
  getImeiMisMatchMapData,
} from "@/services/security/security-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useMutation, useQuery } from "react-query";
import { useDebounce } from "../debounce.hooks";
import {
  ImeiMismatch,
  ImeiMismatchDetails,
} from "@/interface/security-interface";
import { useCommonStore } from "@/store/common-store";
import { IRegionProps } from "@/interface/common-interface";
import { getRegions } from "@/services/admin/admin-service";
import config from "../../../config";
import { parseStreamedData } from "@/shared/utils/streamed-data-parse-utils";
import { exportToCsv } from "@/shared/utils/export-utils/export-util";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";

const useImeiMismatch = () => {
  const { profileData } = useCommonStore();
  const { API_BASE_URL } = config;

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
  const [searchText, setSearchText] = useState<string>("");
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [southWest, setSouthWest] = useState<string>("");
  const [northEast, setNorthEast] = useState<string>("");
  const [searchTableTrigger, setSearchTableTrigger] = useState<boolean>(false);

  const { data: regionsList, isLoading: regionsLoading } =
    useQuery<IRegionProps>({
      queryKey: ["regions"],
      queryFn: () => getRegions(),
    });
  // API
  const { data: imeiMisMatchData, isLoading: imeiMisMatchLoading } =
    useQuery<ImeiMismatch>({
      queryKey: [
        "imei-mismatch",
        page,
        perPage,
        searchTrigger,
        searchTableTrigger,
      ],
      queryFn: async () => {
        if (regionId && stateId) {
          return await getImeiMisMatchData(
            page,
            perPage,
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            regionId,
            stateId,
            lga.length > 0 ? lga.join(",") : "all",
            searchText
          );
        }
      },
    });

  const { data: imeiMisMatchMap, isLoading: imeiMisMatchMapLoading } =
    useQuery<any>({
      queryKey: ["imei-mismatch-map", southWest, northEast, searchTrigger],
      queryFn: async () => {
        if (regionId && stateId && southWest && northEast) {
          const body = await getImeiMisMatchMapData(
            API_BASE_URL,
            regionId,
            stateId,
            lga,
            southWest,
            northEast,
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD")
          );
          const reader = body?.getReader();
          return await parseStreamedData(reader!);
        }
      },
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

  const exportImeiMismatchMutation = useMutation({
    mutationFn: () =>
      exportImeiMismatchData(
        moment(dateRange?.from).format("YYYY-MM-DD"),
        moment(dateRange?.to).format("YYYY-MM-DD"),
        regionId,
        stateId,
        lga?.length > 0 ? lga.map((l) => l).join(",") : "all",
        searchText
      ),
    onSuccess: (data) => {
      const fileName = `imei_mismatch_${moment(new Date()).format(
        "YYYY-MM-DD"
      )}.csv`;
      exportToCsv(fileName, data?.data);
    },
  });

  const exportHandler = () => {
    exportImeiMismatchMutation.mutate();
    showToast(TOAST_TYPES.success, "Download will start shortly!");
  };

  // Columns
  const columns: ColumnDef<ImeiMismatchDetails>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N",
      cell: ({ row }) => (
        <SerialNumberCell pageNumber={page} perPage={perPage} row={row} />
      ),
    },
    // Agent Name
    {
      id: "agent_name",
      accessorKey: "agent_name",
      header: "Agent Name",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.agent_name}</div>
      ),
    },
    // Dealer Name
    {
      id: "dealer_name",
      accessorKey: "dealer_name",
      header: "Dealer Name",
      cell: ({ row }) => <div>{row.original.dealer_name}</div>,
    },
    // SSP IMEI
    {
      id: "imei1",
      accessorKey: "imei1",
      header: "SSP IMEI",
      cell: ({ row }) => <div>{row.original.imei1}</div>,
    },
    // MDM IMEI
    {
      id: "mdmImei",
      accessorKey: "mdmImei",
      header: "MDM IMEI",
      cell: ({ row }) => <div>{"-"}</div>,
    },
    // Device Id
    {
      id: "sim_reg_device_id",
      accessorKey: "sim_reg_device_id",
      header: "Device Id",
      cell: ({ row }) => <div>{row.original.sim_reg_device_id || "-"}</div>,
    },
    // Mis-match IMEI at
    {
      id: "updated_dt",
      accessorKey: "updated_dt",
      header: () => (
        <div>
          Mis-match
          <br /> IMEI at
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center whitespace-nowrap">
          <p>
            {moment(row.original.updated_dt).format("MMM DD, YYYY")}
            <br />
            {moment(row.original.updated_dt).format("hh:mm:a")}
          </p>
        </div>
      ),
    },
  ];

  return {
    // STATES
    dateRange,
    setDateRange,
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
    searchTrigger,
    setSearchTrigger,
    searchText,
    setSearchText,
    southWest,
    setSouthWest,
    northEast,
    setNorthEast,

    // FUNCTIONS
    perPageHandler,
    pageChangeHandler,
    resetHandler,
    searchTriggerHandler,
    exportHandler,
    searchTextHandler,
    searchTableTriggerHandler,
    // API
    imeiMisMatchData,
    imeiMisMatchLoading,
    imeiMisMatchMap,
    imeiMisMatchMapLoading,
    exportImeiMismatchMutation,

    // Columns
    columns,
  };
};

export default useImeiMismatch;
