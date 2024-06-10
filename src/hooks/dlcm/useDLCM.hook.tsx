import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useQueryClient } from "react-query";

const useDLCM = () => {
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
  const dlcmColumns: ColumnDef<any>[] = [
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
      header: " Name",
      enableHiding: false,
      cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
    },
    // Business Location
    {
      id: "address",
      accessorKey: "address",
      header: "Business Location",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.address}</p>,
    },
    // Phone Number
    {
      id: "phoneNumber",
      accessorKey: "phoneNumber",
      header: "Phone Number",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.phoneNumber}</p>,
    },
    // Sales Rep Location
    {
      id: "sales_rep_location",
      accessorKey: "sales_rep_location",
      header: "Sales Rep Location",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.sales_rep_location}</p>,
    },
    // Enrollment Date
    {
      id: "enrollment_date",
      accessorKey: "enrollment_date",
      header: "Enrollment Date",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="inline-block px-2 py-1 text-sm font-medium text-yellow-700 bg-yellow-50 rounded">
          {row.original.enrollment_date}
        </p>
      ),
    },
    // Partner Code
    {
      id: "partner_code",
      accessorKey: "partner_code",
      header: "Partner Code",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.partner_code}</p>,
    },
  ];

  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St, New York, NY",
      phoneNumber: "123-456-7890",
      sales_rep_location: "New York",
      enrollment_date: "2023-01-15",
      partner_code: "P123",
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Elm St, Los Angeles, CA",
      phoneNumber: "987-654-3210",
      sales_rep_location: "Los Angeles",
      enrollment_date: "2023-02-20",
      partner_code: "P456",
    },
    {
      id: 3,
      name: "Alice Johnson",
      address: "789 Oak St, Chicago, IL",
      phoneNumber: "555-123-4567",
      sales_rep_location: "Chicago",
      enrollment_date: "2023-03-25",
      partner_code: "P789",
    },
    {
      id: 4,
      name: "Bob Brown",
      address: "101 Pine St, Houston, TX",
      phoneNumber: "444-987-6543",
      sales_rep_location: "Houston",
      enrollment_date: "2023-04-30",
      partner_code: "P101",
    },
    {
      id: 5,
      name: "Charlie Davis",
      address: "202 Maple St, Phoenix, AZ",
      phoneNumber: "333-555-6789",
      sales_rep_location: "Phoenix",
      enrollment_date: "2023-05-05",
      partner_code: "P202",
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
    dlcmColumns,
    dummyData,
  };
};

export default useDLCM;
