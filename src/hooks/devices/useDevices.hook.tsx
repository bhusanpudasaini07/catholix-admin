import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useQueryClient } from "react-query";

const useDevices = () => {
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
  const devicesColumns: ColumnDef<any>[] = [
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
    // Model
    {
      id: "model",
      accessorKey: "model",
      header: "Model",
      enableHiding: false,
      cell: ({ row }) => <p className="font-medium">{row.original.model}</p>,
    },
    // App Version Name
    {
      id: "app_version_name",
      accessorKey: "app_version_name",
      header: "App Version Name",
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
    // Licence Name
    {
      id: "licence_name",
      accessorKey: "licence_name",
      header: "Licence Name",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.licence_name}</p>,
    },
    // Power Status
    {
      id: "power_status",
      accessorKey: "power_status",
      header: "Power Status",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="uppercase">{row.original.power_status}</p>
      ),
    },
    // Status
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      enableHiding: false,
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
      sn: "1234567890",
      model: "Model 1",
      app_version_name: "App Version 1",
      os_version: "OS Version 1",
      license_expire: "2023-12-31",
      trial: "Yes",
      licence_name: "Licence 1",
      power_status: "active",
      eligibility_privilege: "Gold",
      status: "active",
    },
    {
      sn: "1234567890",
      model: "Model 2",
      app_version_name: "App Version 2",
      os_version: "OS Version 2",
      license_expire: "2024-06-30",
      trial: "No",
      licence_name: "Licence 2",
      power_status: "disabled",
      eligibility_privilege: "Silver",
      status: "disabled",
    },
    {
      sn: "1234567890",
      model: "Model 3",
      app_version_name: "App Version 3",
      os_version: "OS Version 3",
      license_expire: "2023-11-15",
      trial: "Yes",
      licence_name: "Licence 3",
      power_status: "active",
      eligibility_privilege: "Platinum",
      status: "active",
    },
    {
      sn: "1234567890",
      model: "Model 4",
      app_version_name: "App Version 4",
      os_version: "OS Version 4",
      license_expire: "2024-01-20",
      trial: "No",
      licence_name: "Licence 4",
      power_status: "disabled",
      eligibility_privilege: "Gold",
      status: "disabled",
    },
    {
      sn: "1234567890",
      model: "Model 5",
      app_version_name: "App Version 5",
      os_version: "OS Version 5",
      license_expire: "2023-10-05",
      trial: "Yes",
      licence_name: "Licence 5",
      power_status: "active",
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
    devicesColumns,
    dummyData,
  };
};

export default useDevices;
