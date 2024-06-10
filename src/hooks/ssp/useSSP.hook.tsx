import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useQueryClient } from "react-query";

const useSSP = () => {
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);

  //   FUNCTIONS
  const searchTextHandler = (value: string) => {
    setSearchText(value);
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
  const sspColumns: ColumnDef<any>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N.",
      enableHiding: false,
      cell: ({ row }) => (
        <SerialNumberCell row={row} page={page} perPage={perPage} />
      ),
    },
    // Dealer Name
    {
      id: "name",
      accessorKey: "name",
      header: "Dealer Name",
      enableHiding: false,
      cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
    },
    // Dealer Address
    {
      id: "address",
      accessorKey: "address",
      header: "Address",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.address}</p>,
    },
    // Dealer Code
    {
      id: "code",
      accessorKey: "code",
      header: "Code",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.code}</p>,
    },
    // License Expire At
    {
      id: "license_expire",
      accessorKey: "license_expire",
      header: "License Expires At",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="inline-block px-2 py-1 text-sm font-medium text-yellow-700 bg-yellow-50 rounded">
          {row.original.license_expire}
        </p>
      ),
    },
    // Trial
    {
      id: "trial",
      accessorKey: "trial",
      header: "Trial",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.trial}</p>,
    },
    // Registration City
    {
      id: "registration_city",
      accessorKey: "registration_city",
      header: "Registration City",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.registration_city}</p>,
    },
    // Eligibility Privilege
    {
      id: "eligibility_privilege",
      accessorKey: "eligibility_privilege",
      header: "Eligibility Privilege",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="uppercase">{row.original.eligibility_privilege}</p>
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
            row.getValue("status") === "active" ? "success" : "secondary"
          }
          className={cn("h-6 capitalize rounded border-0")}
        >
          {row.getValue("status") === "active" ? "Active" : "Disabled"}
        </Badge>
      ),
    },
  ];

  const dummyData = [
    {
      license_expire: "2023-12-31",
      trial: "Yes",
      registration_city: "New York",
      eligibility_privilege: "Gold",
      status: "active",
    },
    {
      license_expire: "2024-06-30",
      trial: "No",
      registration_city: "Los Angeles",
      eligibility_privilege: "Silver",
      status: "disabled",
    },
    {
      license_expire: "2023-11-15",
      trial: "Yes",
      registration_city: "Chicago",
      eligibility_privilege: "Platinum",
      status: "active",
    },
    {
      license_expire: "2024-01-20",
      trial: "No",
      registration_city: "Houston",
      eligibility_privilege: "Gold",
      status: "disabled",
    },
    {
      license_expire: "2023-10-05",
      trial: "Yes",
      registration_city: "Phoenix",
      eligibility_privilege: "Silver",
      status: "active",
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

    // Functions
    searchTextHandler,
    resetHandler,
    searchHandler,
    perPageHandler,
    pageChangeHandler,

    // API

    // Column
    sspColumns,
    dummyData,
  };
};

export default useSSP;
