import { IDLCMDetails, IDlcmData } from "@/interface/dlcm-interface";
import {
  IMultipleLocation,
  IMultipleLocationDetails,
  InactiveDevicesSf,
  InactiveDevicesSfDetails,
} from "@/interface/security-interface";
import { getDlcmData } from "@/services/dlcm/dlcm-service";
import {
  getInactiveDevicesSFData,
  getMultipleLocationsData,
} from "@/services/security/security-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

const useMultipleLocations = () => {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [selectedRow, setSelectedRow] =
    useState<IMultipleLocationDetails | null>(null);
  const [combinedModalOpen, setCombinedModalOpen] = useState<boolean>(false);

  //   FUNCTIONS
  const searchTextHandler = (value: string) => {
    setSearchText(value);
  };
  const resetHandler = () => {
    setSearchText("");
    setSearchTrigger(!searchTrigger);
    setDate(new Date());
  };
  const searchHandler = () => {
    setSearchTrigger(!searchTrigger);
    setPage(1);
  };

  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const { data: multipleLocationsData, isLoading: multipleLocationsLoading } =
    useQuery<IMultipleLocation>({
      queryKey: ["multipleLocations", page, perPage, searchTrigger],
      queryFn: async () => {
        const response = await getMultipleLocationsData(
          page,
          perPage,
          moment(date).format("YYYY-MM-DD"),
          searchText
        );
        return response;
      },
    });

  const openCombinedModal = (rowData: IMultipleLocationDetails) => {
    setSelectedRow(rowData);
    setCombinedModalOpen(true);
  };
  const closeCombinedModal = () => {
    setSelectedRow(null);
    setCombinedModalOpen(false);
  };

  //   COLUMNS
  const columns: ColumnDef<IMultipleLocationDetails>[] = [
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
    //  Name
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
      size: 300,
      cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
    },
    // Model
    {
      id: "model",
      accessorKey: "model",
      header: "Model",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.model}</p>,
    },
    // APP Version Name
    {
      id: "app_version_name",
      accessorKey: "app_version_name",
      header: "APP Version Name",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.app_version_name}</p>,
    },
    // OS Version
    {
      id: "os_version",
      accessorKey: "os_version",
      header: "OS Version",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.os_version}</p>,
    },
    // Licence Expires At
    {
      id: "licence_expires_at",
      accessorKey: "licence_expires_at",
      header: "Licence Expires At",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.licence_expires_at}</p>,
    },
    // In Trial
    {
      id: "in_trial",
      accessorKey: "in_trial",
      header: "In Trial",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.in_trial === 1 ? "Yes" : "No"}</p>,
    },
    // Power Status
    {
      id: "power_status",
      accessorKey: "power_status",
      header: "Power Status",
      enableHiding: false,
      cell: ({ row }) => (
        <p>{row.original.power_status === 1 ? "ON" : "OFF"}</p>
      ),
    },
    // Status
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.status}</p>,
    },
    // Last Connected At
    {
      id: "last_connected_at",
      accessorKey: "last_connected_at",
      header: "Last Connected At",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.last_connected_at}</p>,
    },
    // Latitude
    {
      id: "location_lat",
      accessorKey: "location_lat",
      header: "Latitude",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.location_lat}</p>,
    },
    // Longitude
    {
      id: "longitude",
      accessorKey: "location_lng",
      header: "Longitude",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.location_lng}</p>,
    },
    // IMEI Number
    {
      id: "imei_no",
      accessorKey: "imei_no",
      header: "IMEI Number",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.imei_no}</p>,
    },
    {
      id: "actions",
      accessorKey: "actions",
      header: "GA Location",
      enableHiding: false,
      cell: ({ row }) => (
        <Badge
          variant="success"
          className="cursor-pointer"
          onClick={() => openCombinedModal(row.original)}
        >
          {row.original.combined_locations?.length || 0}
        </Badge>
      ),
    },
  ];

  const combinedColumns: ColumnDef<{
    lga: string;
    state: string;
    region: string;
  }>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N.",
      cell: ({ row }) => <p>{row?.index + 1}</p>,
    },
    // Region
    {
      id: "region",
      accessorKey: "region",
      header: "Region",
      cell: ({ row }) => <p>{row.original.region}</p>,
    },
    // State
    {
      id: "state",
      accessorKey: "state",
      header: "State",
      cell: ({ row }) => <p>{row.original.state}</p>,
    },
    // LGA
    {
      id: "lga",
      accessorKey: "lga",
      header: "LGA",
      cell: ({ row }) => <p>{row.original.lga}</p>,
    },
  ];

  return {
    // STATES
    searchText,
    setSearchText,
    perPage,
    setPerPage,
    page,
    setPage,
    date,
    setDate,
    combinedModalOpen,
    setCombinedModalOpen,
    selectedRow,

    // Functions
    searchTextHandler,
    resetHandler,
    searchHandler,
    perPageHandler,
    pageChangeHandler,
    closeCombinedModal,

    // API
    multipleLocationsData,
    multipleLocationsLoading,

    // Column
    columns,
    combinedColumns,
  };
};

export default useMultipleLocations;
