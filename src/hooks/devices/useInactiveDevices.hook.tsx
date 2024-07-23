import { IRegionProps } from "@/interface/common-interface";
import { IDeviceDetail, IDevicesData } from "@/interface/device-interface";
import { getRegions } from "@/services/admin/admin-service";
import {
  fetchInactiveDevicesMap,
  getInactiveDevices,
} from "@/services/devices/devices-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { parseStreamedData } from "@/shared/utils/streamed-data-parse-utils";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";
import config from "../../../config";

const useInactiveDevices = () => {
  const { profileData } = useCommonStore();
  const { API_BASE_URL } = config;

  // STATES
  const [regionId, setRegionId] = useState<string>("");
  const [stateId, setStateId] = useState<string>("");
  const [lga, setLga] = useState<string[]>([]);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [southWest, setSouthWest] = useState<string>("");
  const [northEast, setNorthEast] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: moment().subtract(1, "months").toDate(),
    to: moment().toDate(),
  });
  const [timeFrame, setTimeFrame] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const [searchTableTrigger, setSearchTableTrigger] = useState<boolean>(false);

  // API

  const { data: regionsList, isLoading: regionsLoading } =
    useQuery<IRegionProps>({
      queryKey: ["regions"],
      queryFn: () => getRegions(),
    });

  /**
   * Get Inactive Devices
   */
  const { data: inactiveDevices, isLoading: inactiveDevicesLoading } =
    useQuery<IDevicesData>({
      queryKey: [
        "inactive-devices",
        searchTrigger,
        page,
        perPage,
        searchTableTrigger,
      ],
      queryFn: async () => {
        if (profileData && regionId && stateId) {
          const response = await getInactiveDevices(
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            regionId,
            stateId,
            lga?.length > 0 ? lga.map((l) => l).join(",") : "all",
            timeFrame,
            page,
            perPage,
            searchText
          );
          return response;
        }
      },
    });

  /**
   *  Get Inactive Devices Map
   */
  const { data: inactiveDevicesMap, isLoading: inactiveDevicesMapLoading } =
    useQuery<any>({
      queryKey: ["inactive-devices-map", southWest, northEast, searchTrigger],
      queryFn: async () => {
        if (profileData && regionId && stateId && southWest && northEast) {
          //   const response = await getInactiveDevicesMap(
          //     moment(dateRange?.from).format("YYYY-MM-DD"),
          //     moment(dateRange?.to).format("YYYY-MM-DD"),
          //     regionId,
          //     stateId,
          //     lga?.length > 0 ? lga.map((l) => l).join(",") : "all",
          //     timeFrame,
          //     southWest,
          //     northEast
          //   );
          //   return response;
          const body = await fetchInactiveDevicesMap(
            API_BASE_URL,
            regionId,
            stateId,
            lga,
            timeFrame,
            southWest,
            northEast
          );
          const reader = body?.getReader();
          return await parseStreamedData(reader!);
        }
      },
    });

  // FUNCTION
  const searchTextHandler = (value: string) => {
    setSearchText(value);
  };

  /**
   * Main Page Search trigger
   */
  const searchTriggerHandler = () => {
    setPage(1);
    setSearchTrigger(!searchTrigger);
  };

  /**
   * Table Search trigger
   */
  const searchTableTriggerHandler = () => {
    setPage(1);
    setSearchTableTrigger(!searchTableTrigger);
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
    setTimeFrame("all");
    setSearchTrigger(!searchTrigger);
  };
  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  //   inactive device columns
  const inactiveDeviceColumns: ColumnDef<IDeviceDetail>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N.",
      enableHiding: false,
      cell: ({ row }) => (
        <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
      ),
    },
    // Model Name
    {
      id: "name",
      accessorKey: "name",
      header: "Model Name",
    },
    // Identification Number
    {
      id: "identificationNumber",
      accessorKey: "identificationNumber",
      header: () => {
        return (
          <p>
            Identification <br />
            Number
          </p>
        );
      },
      cell: ({ row }) => <Badge variant={"info"}>{"N/A"}</Badge>,
    },
    // IMEI
    {
      id: "imei_no",
      accessorKey: "imei_no",
      header: "IMEI",
      cell: ({ row }) => <p>{row.original.imei_no}</p>,
    },
    // Status
    {
      id: "device_status",
      accessorKey: "device_status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={"success"}>{row.original.device_status}</Badge>
      ),
    },
  ];

  return {
    regionId,
    stateId,
    lga,
    searchTrigger,
    southWest,
    northEast,
    dateRange,
    timeFrame,
    perPage,
    page,
    searchText,
    setRegionId,
    setStateId,
    setLga,
    setSouthWest,
    setNorthEast,
    setDateRange,
    setTimeFrame,
    setPage,
    setPerPage,

    // FUNCTIONS
    searchTriggerHandler,
    resetHandler,
    perPageHandler,
    pageChangeHandler,
    searchTextHandler,
    searchTableTriggerHandler,

    // COlumns
    inactiveDeviceColumns,

    // API
    inactiveDevices,
    inactiveDevicesLoading,
    inactiveDevicesMap,
    inactiveDevicesMapLoading,
  };
};

export default useInactiveDevices;
