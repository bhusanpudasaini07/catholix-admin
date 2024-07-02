import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const useDevicePerformance = () => {
  // STATES
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [regionId, setRegionId] = useState<string>("0");
  const [stateId, setStateId] = useState<string>("0");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  // FUNCTIONS
  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  // COLUMNS

  const devicePerformanceColumns: ColumnDef<any>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N.",
      enableHiding: false,
      cell: (props) => <SerialNumberCell {...props} />,
    },

    // REGION
    {
      id: "region",
      accessorKey: "region",
      header: "Region",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.region}</p>,
    },

    // STATE
    {
      id: "state",
      accessorKey: "state",
      header: "State",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.state}</p>,
    },

    // LGA
    {
      id: "lga",
      accessorKey: "lga",
      header: "LGA",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.lga}</p>,
    },

    // ONBOARDED NUMBER
    {
      id: "onboardedNumber",
      accessorKey: "onboardedNumber",
      header: "Onboarded Number",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.onboardedNumber}</p>,
    },

    // ONBOARDED %
    {
      id: "onboardedPercent",
      accessorKey: "onboardedPercent",
      header: "Onboarded %",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.onboardedPercent}</p>,
    },

    // ACTIVE
    {
      id: "active",
      accessorKey: "active",
      header: "Active",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.active}</p>,
    },

    // % ACTIVE
    {
      id: "activePercent",
      accessorKey: "activePercent",
      header: "% Active",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.activePercent}</p>,
    },

    // ACTIVE WITH min 1 GC
    {
      id: "activeWith1GC",
      accessorKey: "activeWith1GC",
      header: () => (
        <p>
          Active with Min 1GC post <br />
          onboarding from Inception
        </p>
      ),
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.activeWith1GC}</p>,
    },

    // % ACTIVE WITH min 1 GC
    {
      id: "activeWith1GCPercent",
      accessorKey: "activeWith1GCPercent",
      header: () => (
        <p>
          % Active with Min 1GC post <br />
          onboarding from Inception
        </p>
      ),
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.activeWith1GCPercent}</p>,
    },

    // INACTIVE SINCE ONBOARDING
    {
      id: "inactiveSinceOnboarding",
      accessorKey: "inactiveSinceOnboarding",
      header: () => (
        <p>
          Inactive since <br />
          Onboarding
        </p>
      ),
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.inactiveSinceOnboarding}</p>,
    },

    // GROSS CONNECTIONS
    {
      id: "grossConnections",
      accessorKey: "grossConnections",
      header: "Gross Connections",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.grossConnections}</p>,
    },

    // DEPLOYED
    {
      id: "deployed",
      accessorKey: "deployed",
      header: "Deployed",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.deployed}</p>,
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
    page,
    setPage,
    perPage,
    setPerPage,

    // FUNCTIONS
    perPageHandler,
    pageChangeHandler,

    // COlumns
    devicePerformanceColumns,
  };
};

export default useDevicePerformance;
