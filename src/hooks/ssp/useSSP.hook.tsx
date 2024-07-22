import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { ISSPData, ISSPDetail } from "@/interface/ssp-interface";
import { getSSPData } from "@/services/ssp/ssp-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";

const useSSP = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [columns, setColumns] = useState<string>("");

  const { data: sspList, isLoading: sspListLoading } = useQuery<ISSPData>({
    queryKey: ["sspList", page, perPage, searchTrigger, columns],
    queryFn: async () => {
      if (columns) {
        const response = await getSSPData(page, perPage, searchText, columns);
        return response;
      }
    },
  });

  //   FUNCTIONS
  const searchTextHandler = (value: string) => {
    setSearchText(value);
  };
  const applyColumns = (parsedColumns: string) => {
    setColumns(parsedColumns);
  };
  const resetHandler = () => {
    setSearchText("");
    setSearchTrigger(!searchTrigger);
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

  //   COLUMNS
  const sspColumns: ColumnDef<ISSPDetail>[] = [
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
    // Dealer Name
    {
      id: "dealer_name",
      accessorKey: "dealer_name",
      header: "Dealer Name",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="font-medium max-w-[250px]">
          {row.original.dealer_name || "-"}
        </p>
      ),
    },
    // Dealer Code
    {
      id: "dealer_code",
      accessorKey: "dealer_code",
      header: "Code",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.dealer_code || "-"}</p>,
    },
    // Status
    {
      id: "status_v",
      accessorKey: "status_v",
      header: "Status",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.status_v || "-"}</p>,
    },
    // Updated Date
    {
      id: "updated_dt",
      accessorKey: "updated_dt",
      header: "Updated Date",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.updated_dt || "-"}</p>,
    },
    // Vendor Channel
    {
      id: "vendor_channel",
      accessorKey: "vendor_channel",
      header: "Vendor Channel",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.vendor_channel || "-"}</p>,
    },
    //Channel
    {
      id: "channel",
      accessorKey: "channel",
      header: "Channel",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.channel}</p>,
    },
    // Agent Name from XML
    {
      id: "agent_name_v_from_xml",
      accessorKey: "agent_name_v_from_xml",
      header: "Agent Name (XML)",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.agent_name_v_from_xml || "-"}</p>,
    },
    // Action Code
    {
      id: "action_code_v",
      accessorKey: "action_code_v",
      header: "Action Code",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.action_code_v || "-"}</p>,
    },
    // SIM Registration Kit Number
    {
      id: "simreg_kit_num_v",
      accessorKey: "simreg_kit_num_v",
      header: "SIM Registration Kit Number",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.simreg_kit_num_v || "-"}</p>,
    },
    // Agent Name from Table
    {
      id: "agent_name_v_from_table",
      accessorKey: "agent_name_v_from_table",
      header: "Agent Name (Table)",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.agent_name_v_from_table || "-"}</p>,
    },
    // Seq No
    {
      id: "seq_no_n",
      accessorKey: "seq_no_n",
      header: "Seq No",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.seq_no_n || "-"}</p>,
    },

    // SIM Reg Device ID
    {
      id: "sim_reg_device_id",
      accessorKey: "sim_reg_device_id",
      header: "SIM Reg Device ID",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.sim_reg_device_id || "-"}</p>,
    },
    // Device User ID
    {
      id: "device_user_id",
      accessorKey: "device_user_id",
      header: "Device User ID",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.device_user_id || "-"}</p>,
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

    // Latitude
    {
      id: "latitude",
      accessorKey: "latitude",
      header: "Latitude",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.latitude || "-"}</p>,
    },
    // Longitude
    {
      id: "longitude",
      accessorKey: "longitude",
      header: "Longitude",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.longitude || "-"}</p>,
    },
    // IMEI1
    {
      id: "imei1",
      accessorKey: "imei1",
      header: "IMEI1",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.imei1 || "-"}</p>,
    },
    // IMEI2
    {
      id: "imei2",
      accessorKey: "imei2",
      header: "IMEI2",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.imei2 || "-"}</p>,
    },
  ];

  useEffect(() => {
    const localStorageColumns = localStorage.getItem("columnVisibility_ssp");
    if (localStorageColumns) {
      const parsedColumns: string = Object.entries(
        JSON.parse(localStorageColumns)
      )
        .filter(([key, value]) => value === true && key !== "sn")
        .map(([key]) => key)
        .join(",");
      setColumns(parsedColumns);
    } else {
      const visibleColumns = sspColumns?.reduce(
        (acc: Record<string, boolean>, column: ColumnDef<ISSPDetail>) => {
          if (column.id) {
            acc[column.id] = column.enableHiding ? false : true;
          }
          return acc;
        },
        {}
      );

      localStorage.setItem(
        "columnVisibility_ssp",
        JSON.stringify(visibleColumns)
      );
      const parsedColumns: string = Object.keys(visibleColumns)
        .filter((key) => key !== "sn")
        .join(",");
      setColumns(parsedColumns);
    }
  }, []);
  return {
    // STATES
    searchText,
    setSearchText,
    perPage,
    setPerPage,
    page,
    setPage,

    // Functions
    searchTextHandler,
    resetHandler,
    searchHandler,
    perPageHandler,
    pageChangeHandler,
    applyColumns,

    // API
    sspList,
    sspListLoading,

    // Column
    sspColumns,
  };
};

export default useSSP;
