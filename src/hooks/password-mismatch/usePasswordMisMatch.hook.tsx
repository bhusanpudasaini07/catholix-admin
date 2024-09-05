import {
  exportPasswordMismatchData,
  getPasswordMisMatchData,
  getPasswordMisMatchMapData,
} from "@/services/security/security-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useMutation, useQuery } from "react-query";
import { useDebounce } from "../debounce.hooks";
import {
  PasswordMismatch,
  PasswordMismatchDetails,
} from "@/interface/security-interface";
import { useCommonStore } from "@/store/common-store";
import { IRegionProps } from "@/interface/common-interface";
import { getRegions } from "@/services/admin/admin-service";
import config from "../../../config";
import { parseStreamedData } from "@/shared/utils/streamed-data-parse-utils";
import { exportToCsv } from "@/shared/utils/export-utils/export-util";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { Badge } from "@/shared/components/ui/badge";

const usePasswordMismatch = () => {
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

  const debouncedValue = useDebounce(searchText, 300);

  const { data: regionsList, isLoading: regionsLoading } =
    useQuery<IRegionProps>({
      queryKey: ["regions"],
      queryFn: () => getRegions(),
    });

  // API
  const { data: passwordMisMatchData, isLoading: passwordMisMatchLoading } =
    useQuery<PasswordMismatch>({
      queryKey: [
        "password-mismatch",
        page,
        perPage,
        searchTrigger,
        searchTableTrigger,
      ],
      queryFn: async () => {
        if (regionId && stateId) {
          return await getPasswordMisMatchData(
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

  const { data: passwordMisMatchMap, isLoading: passwordMisMatchMapLoading } =
    useQuery<any>({
      queryKey: ["password-mismatch-map", southWest, northEast, searchTrigger],
      queryFn: async () => {
        if (regionId && stateId && southWest && northEast) {
          const body = await getPasswordMisMatchMapData(
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

  const exportPasswordMismatchMutation = useMutation({
    mutationFn: () =>
      exportPasswordMismatchData(
        moment(dateRange?.from).format("YYYY-MM-DD"),
        moment(dateRange?.to).format("YYYY-MM-DD"),
        regionId,
        stateId,
        lga?.length > 0 ? lga.map((l) => l).join(",") : "all",
        searchText
      ),
    onSuccess: (data) => {
      const fileName = `password_mismatch_${moment(new Date()).format(
        "YYYY-MM-DD"
      )}.csv`;
      exportToCsv(fileName, data?.data);
    },
  });

  const exportHandler = () => {
    exportPasswordMismatchMutation.mutate();
    showToast(TOAST_TYPES.success, "Download will start shortly!");
  };

  // Columns
  const columns: ColumnDef<PasswordMismatchDetails>[] = [
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
        <div className="w-[200px] break-all">
          {row.original.agent_name || "-"}
        </div>
      ),
    },
    // Dealer Name
    {
      id: "dealer_name",
      accessorKey: "dealer_name",
      header: "Dealer Name",
      cell: ({ row }) => (
        <div className="w-[200px]">{row.original.dealer_name || "-"}</div>
      ),
    },
    // Last Connected At
    {
      id: "last_connected_at",
      accessorKey: "last_connected_at",
      header: () => (
        <div>
          Last
          <br /> Connected At
        </div>
      ),
      cell: ({ row }) => (
        <Badge variant={"warning"} className="w-[120px]">
          {moment(row.original.last_connected_at).format("ll")}
        </Badge>
      ),
    },
    // Wrong attempt at
    {
      id: "wrong_attempt_at",
      accessorKey: "wrong_attempt_at",
      header: () => (
        <div>
          Wrong
          <br /> attempt at
        </div>
      ),
      cell: ({ row }) => (
        <Badge variant={"destructiveLight"} className="w-[120px] text-center">
          {moment(row.original.wrong_attempt_at).format("ll")}
          <br />
          {moment(row.original.wrong_attempt_at).format("LT")}
        </Badge>
      ),
    },
    // Device Id
    {
      id: "name",
      accessorKey: "name",
      header: "Device Id",
      cell: ({ row }) => <Badge variant={"info"}>{row.original.name}</Badge>,
    },
    // Number of wrong attempts
    {
      id: "total_count",
      accessorKey: "total_count",
      header: () => (
        <div>
          Number of
          <br /> wrong attempts
        </div>
      ),
      cell: ({ row }) => (
        <Badge variant={"destructiveLight"}>{row.original.total_count}</Badge>
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
    passwordMisMatchData,
    passwordMisMatchLoading,
    passwordMisMatchMap,
    passwordMisMatchMapLoading,
    exportPasswordMismatchMutation,

    // Columns
    columns,
  };
};

export default usePasswordMismatch;
