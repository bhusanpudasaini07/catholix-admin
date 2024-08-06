import { IRegionProps } from "@/interface/common-interface";
import {
  IDeviceDetail,
  IDevicesData,
  INoHeartbeatStats,
} from "@/interface/device-interface";
import { getRegions } from "@/services/admin/admin-service";
import {
  exportNoHeartbeatDevices,
  fetchNoHeartbeatDevicesMap,
  getNoHeartbeatDevices,
  getNoHeartbeatDevicesStats,
} from "@/services/devices/devices-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { parseStreamedData } from "@/shared/utils/streamed-data-parse-utils";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useMutation, useQuery } from "react-query";
import config from "../../../config";
import { cn } from "@/shared/utils/utils";
import { exportToCsv } from "@/shared/utils/export-utils/export-util";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

const useNoHeartbeatDevices = () => {
  const { profileData } = useCommonStore();
  const { API_BASE_URL } = config;

  // STATES
  const [columns, setColumns] = useState<string>("");
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
   * Get No Heartbeat Devices
   */
  const { data: noHeartbeatDevices, isLoading: noHeartbeatDevicesLoading } =
    useQuery<IDevicesData>({
      queryKey: [
        "noheartbeat-devices",
        searchTrigger,
        page,
        perPage,
        searchTableTrigger,
        columns,
      ],
      queryFn: async () => {
        if (profileData && regionId && stateId && columns) {
          const response = await getNoHeartbeatDevices(
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            regionId,
            stateId,
            lga?.length > 0 ? lga.map((l) => l).join(",") : "all",
            timeFrame,
            page,
            perPage,
            columns,
            searchText
          );
          return response;
        }
      },
    });

  /**
   *  Get No Heartbeat Devices Map
   */
  const {
    data: noHeartbeatDevicesMap,
    isLoading: noHeartbeatDevicesMapLoading,
  } = useQuery<any>({
    queryKey: ["noheartbeat-devices-map", southWest, northEast, searchTrigger],
    queryFn: async () => {
      if (profileData && regionId && stateId && southWest && northEast) {
        const body = await fetchNoHeartbeatDevicesMap(
          API_BASE_URL,
          regionId,
          stateId,
          lga,
          timeFrame,
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

  /**
   * No Heartbeat Devices Stats
   */
  const {
    data: noHeartbeatDevicesStats,
    isLoading: noHeartbeatDevicesStatsLoading,
  } = useQuery<INoHeartbeatStats>({
    queryKey: ["no-heartbeat-devices-stats"],
    queryFn: getNoHeartbeatDevicesStats,
  });

  const exportNoHeartbeatDeviceMutation = useMutation({
    mutationFn: () =>
      exportNoHeartbeatDevices(
        moment(dateRange?.from).format("YYYY-MM-DD"),
        moment(dateRange?.to).format("YYYY-MM-DD"),
        regionId,
        stateId,
        lga?.length > 0 ? lga.map((l) => l).join(",") : "all",
        timeFrame,
        columns
      ),
    onSuccess: (data) => {
      exportToCsv("no_heartbeat_devices.csv", data?.data);
    },
  });

  const exportHandler = () => {
    exportNoHeartbeatDeviceMutation.mutate();
    showToast(TOAST_TYPES.success, "Download will start shortly!");
  };

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

  const applyColumns = (parsedColumns: string) => {
    setColumns(parsedColumns);
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

  //   No Heartbeat device columns
  const noHeartbeatDeviceColumns: ColumnDef<IDeviceDetail>[] = [
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
      enableHiding: false,
    },
    // Identification Number
    // {
    //   id: "identificationNumber",
    //   accessorKey: "identificationNumber",
    //   enableHiding: false,
    //   header: () => {
    //     return (
    //       <p>
    //         Identification <br />
    //         Number
    //       </p>
    //     );
    //   },
    //   cell: ({ row }) => <Badge variant={"info"}>{"N/A"}</Badge>,
    // },
    // IMEI
    {
      id: "imei_no",
      accessorKey: "imei_no",
      header: "IMEI",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.imei_no}</p>,
    },
    // Power Status
    {
      id: "power_status",
      accessorKey: "power_status",
      header: "Status",
      enableHiding: false,
      cell: ({ row }) => (
        <Badge variant={"success"}>
          {row.original.power_status === 1 ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    // App Version Name
    {
      id: "app_version_name",
      accessorKey: "app_version_name",
      header: "App Version Name",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.app_version_name}</p>,
    },
    // OS Version
    {
      id: "os_version",
      accessorKey: "os_version",
      header: "OS Version",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.os_version}</p>,
    },
    // License Expire At
    {
      id: "licence_expires_at",
      accessorKey: "licence_expires_at",
      header: "License Expires At",
      enableHiding: true,
      cell: ({ row }) => (
        <p className="inline-block px-2 py-1 text-sm font-medium text-yellow-700 bg-yellow-50 rounded">
          {moment(row.original.licence_expires_at).format("DD/MM/YYYY")}
        </p>
      ),
    },
    // Trial
    {
      id: "in_trial",
      accessorKey: "in_trial",
      header: "Trial",
      enableHiding: true,
      cell: ({ row }) => (
        <p className="uppercase">
          {row.original.in_trial === 0 ? "No" : "Yes"}
        </p>
      ),
    },
    // Status
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      enableHiding: true,
      cell: ({ row }) => (
        <Badge
          variant={
            row.getValue("status") === "LICENSED" ? "success" : "secondary"
          }
          className={cn("h-6 capitalize rounded border-0")}
        >
          {row.getValue("status") === "LICENSED" ? "LICENSED" : "Inactive"}
        </Badge>
      ),
    },
    // Battery Status
    {
      id: "battery_status",
      accessorKey: "battery_status",
      header: "Battery Status",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.battery_status}</p>,
    },
    // Battery Charging
    {
      id: "battery_charging",
      accessorKey: "battery_charging",
      header: "Battery Charging",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{row.original.battery_charging === 0 ? "No" : "Yes"}</p>
      ),
    },
    // Serial No
    {
      id: "serial_no",
      accessorKey: "serial_no",
      header: "Serial No",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.serial_no}</p>,
    },
    // Model
    {
      id: "model",
      accessorKey: "model",
      header: "Model",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.model}</p>,
    },
    // Make
    {
      id: "make",
      accessorKey: "make",
      header: "Make",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.make}</p>,
    },
    // Android ID
    {
      id: "android_id",
      accessorKey: "android_id",
      header: "Android ID",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.android_id}</p>,
    },
    // Licence Active
    {
      id: "licence_active",
      accessorKey: "licence_active",
      header: "Licence Active",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{row.original.licence_active === 0 ? "No" : "Yes"}</p>
      ),
    },
    // Locked
    {
      id: "locked",
      accessorKey: "locked",
      header: "Locked",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.locked === 0 ? "No" : "Yes"}</p>,
    },
    // Last Connected At
    {
      id: "last_connected_at",
      accessorKey: "last_connected_at",
      header: "Last Connected At",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{new Date(row.original.last_connected_at).toLocaleString()}</p>
      ),
    },
    // Wifi MAC Address
    {
      id: "wifi_mac_address",
      accessorKey: "wifi_mac_address",
      header: "Wifi MAC Address",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.wifi_mac_address}</p>,
    },
    // IP Address
    {
      id: "ip_address",
      accessorKey: "ip_address",
      header: "IP Address",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.ip_address}</p>,
    },
    // Public IP
    {
      id: "public_ip",
      accessorKey: "public_ip",
      header: "Public IP",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.public_ip}</p>,
    },
    // Bluetooth MAC
    {
      id: "bluetooth_mac",
      accessorKey: "bluetooth_mac",
      header: "Bluetooth MAC",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.bluetooth_mac}</p>,
    },
    // Rooted
    {
      id: "rooted",
      accessorKey: "rooted",
      header: "Rooted",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.rooted}</p>,
    },
    // Enrollment Date
    {
      id: "enrollment_date",
      accessorKey: "enrollment_date",
      header: "Enrollment Date",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{new Date(row.original.enrollment_date).toLocaleString()}</p>
      ),
    },
    // Gsuite Account
    {
      id: "gsuite_account",
      accessorKey: "gsuite_account",
      header: "Gsuite Account",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.gsuite_account}</p>,
    },
    // Build Serial No
    {
      id: "build_serial_no",
      accessorKey: "build_serial_no",
      header: "Build Serial No",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.build_serial_no}</p>,
    },
    // GSM Serial No
    {
      id: "gsm_serial_no",
      accessorKey: "gsm_serial_no",
      header: "GSM Serial No",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.gsm_serial_no}</p>,
    },
    // ICCID No
    {
      id: "iccid_no",
      accessorKey: "iccid_no",
      header: "ICCID No",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.iccid_no}</p>,
    },
    // Phone No
    {
      id: "phone_no",
      accessorKey: "phone_no",
      header: "Phone No",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.phone_no}</p>,
    },
    // OS Type
    {
      id: "os_type",
      accessorKey: "os_type",
      header: "OS Type",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.os_type}</p>,
    },
    // Unique ID
    {
      id: "unique_id",
      accessorKey: "unique_id",
      header: "Unique ID",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.unique_id}</p>,
    },
    // Custom Properties
    {
      id: "custom_properties",
      accessorKey: "custom_properties",
      header: "Custom Properties",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.custom_properties}</p>,
    },
    // Build Version
    {
      id: "build_version",
      accessorKey: "build_version",
      header: "Build Version",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.build_version}</p>,
    },
    // IMEI No 2
    {
      id: "imei_no_2",
      accessorKey: "imei_no_2",
      header: "IMEI No 2",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.imei_no_2}</p>,
    },
    // IMSI No
    {
      id: "imsi_no",
      accessorKey: "imsi_no",
      header: "IMSI No",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.imsi_no}</p>,
    },
    // IMSI No 2
    {
      id: "imsi_no_2",
      accessorKey: "imsi_no_2",
      header: "IMSI No 2",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.imsi_no_2}</p>,
    },
    // ICCID No 2
    {
      id: "iccid_no_2",
      accessorKey: "iccid_no_2",
      header: "ICCID No 2",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.iccid_no_2}</p>,
    },
    // Phone No 2
    {
      id: "phone_no_2",
      accessorKey: "phone_no_2",
      header: "Phone No 2",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.phone_no_2}</p>,
    },
    // Management Details Enrollment Mode
    {
      id: "management_details_enrollment_mode",
      accessorKey: "management_details_enrollment_mode",
      header: "Management Details Enrollment Mode",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{row.original.management_details_enrollment_mode}</p>
      ),
    },
    // Management Details Management Agent
    {
      id: "management_details_management_agent",
      accessorKey: "management_details_management_agent",
      header: "Management Details Management Agent",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{row.original.management_details_management_agent}</p>
      ),
    },
    // Management Details Enrollment Method
    {
      id: "management_details_enrollment_method",
      accessorKey: "management_details_enrollment_method",
      header: "Management Details Enrollment Method",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{row.original.management_details_enrollment_method}</p>
      ),
    },
    // Management Details Enrollment Type
    {
      id: "management_details_enrollment_type",
      accessorKey: "management_details_enrollment_type",
      header: "Management Details Enrollment Type",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{row.original.management_details_enrollment_type}</p>
      ),
    },
    // Management Details Management Mode
    {
      id: "management_details_management_mode",
      accessorKey: "management_details_management_mode",
      header: "Management Details Management Mode",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{row.original.management_details_management_mode}</p>
      ),
    },
    // MAC PIN
    {
      id: "mac_pin",
      accessorKey: "mac_pin",
      header: "MAC PIN",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.mac_pin}</p>,
    },
    // Screen Locked
    {
      id: "screen_locked",
      accessorKey: "screen_locked",
      header: "Screen Locked",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{row.original.screen_locked === 0 ? "No" : "Yes"}</p>
      ),
    },
    // iTunes Account Status
    {
      id: "itunes_account_status",
      accessorKey: "itunes_account_status",
      header: "iTunes Account Status",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.itunes_account_status}</p>,
    },
    // Location Lat
    {
      id: "location_lat",
      accessorKey: "location_lat",
      header: "Location Lat",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.location_lat}</p>,
    },
    // Location Lng
    {
      id: "location_lng",
      accessorKey: "location_lng",
      header: "Location Lng",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.location_lng}</p>,
    },
    // Location Address
    {
      id: "location_address",
      accessorKey: "location_address",
      header: "Location Address",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.location_address}</p>,
    },
    // Location Date Time
    {
      id: "location_date_time",
      accessorKey: "location_date_time",
      header: "Location Date Time",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{new Date(row.original.location_date_time).toLocaleString()}</p>
      ),
    },
    // Location Created At
    {
      id: "location_created_at",
      accessorKey: "location_created_at",
      header: "Location Created At",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{new Date(row.original.location_created_at).toLocaleString()}</p>
      ),
    },
    // Region Code
    {
      id: "region_code",
      accessorKey: "region_code",
      header: "Region Code",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.region_code}</p>,
    },
    // State Code
    {
      id: "state_code",
      accessorKey: "state_code",
      header: "State Code",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.state_code}</p>,
    },
    // LG Code
    {
      id: "lg_code",
      accessorKey: "lg_code",
      header: "LG Code",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.lg_code}</p>,
    },
  ];

  useEffect(() => {
    const localStorageColumns = localStorage.getItem(
      "columnVisibility_noheartbeat"
    );
    if (localStorageColumns) {
      const parsedColumns: string = Object.entries(
        JSON.parse(localStorageColumns)
      )
        .filter(([key, value]) => value === true && key !== "sn")
        .map(([key]) => key)
        .join(",");
      setColumns(parsedColumns);
    } else {
      const visibleColumns = noHeartbeatDeviceColumns?.reduce(
        (acc: Record<string, boolean>, column: ColumnDef<IDeviceDetail>) => {
          if (column.id) {
            acc[column.id] = column.enableHiding ? false : true;
          }
          return acc;
        },
        {}
      );

      localStorage.setItem(
        "columnVisibility_noheartbeat",
        JSON.stringify(visibleColumns)
      );
      const parsedColumns: string = Object.keys(visibleColumns)
        .filter((key) => key !== "sn")
        .join(",");
      setColumns(parsedColumns);
    }
  }, []);

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
    applyColumns,
    exportHandler,

    // COlumns
    noHeartbeatDeviceColumns,

    // API
    noHeartbeatDevices,
    noHeartbeatDevicesLoading,
    noHeartbeatDevicesMap,
    noHeartbeatDevicesMapLoading,
    noHeartbeatDevicesStats,
    noHeartbeatDevicesStatsLoading,
    exportNoHeartbeatDeviceMutation,
  };
};

export default useNoHeartbeatDevices;
