import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

const useLgaPerformance = () => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [regionId, setRegionId] = useState<string>("0");
  const [stateId, setStateId] = useState<string>("0");
  const [lgaId, setLgaId] = useState<string[]>([]);
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

  const resetHandler = () => {
    setRegionId("0");
    setStateId("0");
    setLgaId([]);
  };

  const lgaPerformanceColumns: ColumnDef<any>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N.",
      enableHiding: false,
      cell: (props) => <SerialNumberCell {...props} />,
    },
    // Device ID
    {
      id: "deviceId",
      accessorKey: "deviceId",
      header: "Device ID",
      cell: ({ row }) => <div>{row.original.deviceId}</div>,
    },
    // Agent Name
    {
      id: "agentName",
      accessorKey: "agentName",
      header: "Agent Name",
      cell: ({ row }) => <div>{row.original.agentName}</div>,
    },
    // No of GC Performed
    {
      id: "noOfGcPerformed",
      accessorKey: "noOfGcPerformed",
      header: "No of GC Performed",
      cell: ({ row }) => <div>{row.original.noOfGcPerformed}</div>,
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
    lgaId,
    setLgaId,
    searchText,
    setSearchText,
    searchTrigger,
    setSearchTrigger,
    from,
    setFrom,
    to,
    setTo,

    // FUNCTIONS
    perPageHandler,
    pageChangeHandler,
    resetHandler,

    // DATA TABLE
    lgaPerformanceColumns,
  };
};

export default useLgaPerformance;
