import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const useDeviceComparison = () => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const [regionId, setRegionId] = useState<string>("0");
  const [stateId, setStateId] = useState<string>("0");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
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
    setFrom("");
    setTo("");
  };
  const searchTriggerHandler = () => {
    setSearchTrigger(!searchTrigger);
  };

  // Columns
  const deviceComparisonColumns: ColumnDef<any>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N",
      cell: ({ row }) => (
        <SerialNumberCell row={row} page={page} perPage={perPage} />
      ),
    },
    // Region
    {
      id: "region",
      accessorKey: "region",
      header: "Region",
    },
    // State
    {
      id: "state",
      accessorKey: "state",
      header: "State",
    },
    // LGA
    {
      id: "lga",
      accessorKey: "lga",
      header: "Lga",
    },
    // Onboarded
    {
      id: "onboarded_percent",
      accessorKey: "onboarded_percent",
      header: "% Onboarded",
      cell: ({ row }) => (
        <div>{row.original.onboarded_percent.toFixed(2)}%</div>
      ),
    },
    // Active
    {
      id: "active_percent",
      accessorKey: "active_percent",
      header: "% Active",
      cell: ({ row }) => <div>{row.original.active_percent.toFixed(2)}%</div>,
    },
    // GC Perform 1 to 4
    {
      id: "gc-perform_1_to_4",
      accessorKey: "gc-perform_1_to_4",
      header: ({ header }) => (
        <div>
          Device Performing 1-4 GCs <br /> Daily
        </div>
      ),
      cell: ({ row }) => <div>{row.original["gc-perform_1_to_4"]}</div>,
    },
    // GC Greateer than 4
    {
      id: "gc-greater_than_4",
      accessorKey: "gc-greater_than_4",
      header: ({ header }) => (
        <div>
          Device Performing <br /> Greater than 4 GCs <br /> Daily
        </div>
      ),
      cell: ({ row }) => <div>{row.original["gc-greater_than_4"]}</div>,
    },
    // Inactive Onboarded
    {
      id: "inactive_onboarded",
      accessorKey: "inactive_onboarded",
      header: ({ header }) => (
        <div>
          Inactive since <br /> Onboarded
        </div>
      ),
      cell: ({ row }) => <div>{row.original["inactive_onboarded"]}</div>,
    },
    // Gross Connections
    {
      id: "gross_connections",
      accessorKey: "gross_connections",
      header: "Gross Connections",
      cell: ({ row }) => <div>{row.original["gross_connections"]}</div>,
    },
    // Deployed
    {
      id: "deployed",
      accessorKey: "deployed",
      header: "Deployed",
      cell: ({ row }) => <div>{row.original["deployed"]}</div>,
    },
  ];
  return {
    // STATES
    from,
    setFrom,
    to,
    setTo,
    regionId,
    setRegionId,
    stateId,
    setStateId,
    page,
    setPage,
    perPage,
    setPerPage,

    // FUNCTIONS
    perPageHandler,
    pageChangeHandler,
    resetHandler,
    searchTriggerHandler,

    // COlumns
    deviceComparisonColumns,
  };
};

export default useDeviceComparison;
