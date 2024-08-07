import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const useImeiMismatch = () => {
  // STATES
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [regionId, setRegionId] = useState<string>("all");
  const [stateId, setStateId] = useState<string>("all");
  const [lga, setLga] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);

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
    setDateRange({ from: undefined, to: undefined });
    setRegionId("all");
    setStateId("all");
    setLga([]);
    setPage(1);
    setPerPage(10);
  };

  // Columns
  const columns: ColumnDef<any>[] = [
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
      id: "agentName",
      accessorKey: "agentName",
      header: "Agent Name",
      cell: ({ row }) => <div>{row.original.agentName}</div>,
    },
    // Dealer Name
    {
      id: "dealerName",
      accessorKey: "dealerName",
      header: "Dealer Name",
      cell: ({ row }) => <div>{row.original.dealerName}</div>,
    },
    // SSP IMEI
    {
      id: "sspImei",
      accessorKey: "sspImei",
      header: "SSP IMEI",
      cell: ({ row }) => <div>{row.original.sspImei}</div>,
    },
    // MDM IMEI
    {
      id: "mdmImei",
      accessorKey: "mdmImei",
      header: "MDM IMEI",
      cell: ({ row }) => <div>{row.original.mdmImei}</div>,
    },
    // Device Id
    {
      id: "deviceId",
      accessorKey: "deviceId",
      header: "Device Id",
      cell: ({ row }) => <div>{row.original.deviceId}</div>,
    },
    // Mis-match IMEI at
    {
      id: "mismatchImeiAt",
      accessorKey: "mismatchImeiAt",
      header: () => (
        <div>
          Mis-match
          <br /> IMEI at
        </div>
      ),
      cell: ({ row }) => <div>{row.original.mismatchImeiAt}</div>,
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

    // FUNCTIONS
    perPageHandler,
    pageChangeHandler,
    resetHandler,
    searchTriggerHandler,

    // Columns
    columns,
  };
};

export default useImeiMismatch;
