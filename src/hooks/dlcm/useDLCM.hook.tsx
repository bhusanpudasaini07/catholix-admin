import { IDLCMDetails, IDlcmData } from "@/interface/dlcm-interface";
import { getDlcmData } from "@/services/dlcm/dlcm-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

const useDLCM = () => {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [columns, setColumns] = useState<string>("");

  //   FUNCTIONS
  const searchTextHandler = (value: string) => {
    setSearchText(value);
  };
  const resetHandler = () => {
    setSearchText("");
    setSearchTrigger(!searchTrigger);
  };
  const searchHandler = () => {
    const columns = localStorage.getItem("columnVisibility_dlcm");
    const parsedValue: string = columns
      ? Object.entries(JSON.parse(columns))
          .filter(([key, value]) => value === true && key !== "sn")
          .map(([key]) => key)
          .join(",")
      : "";
    setColumns(parsedValue);
    setSearchTrigger(!searchTrigger);
    setPage(1);
  };
  const applyColumns = (parsedColumns: string) => {
    setColumns(parsedColumns);
  };

  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const { data: dlcmData, isLoading: dlcmLoading } = useQuery<IDlcmData>({
    queryKey: ["dlcm", page, perPage, searchTrigger, columns],
    queryFn: async () => {
      if (columns) {
        const response = await getDlcmData(page, perPage, searchText, columns);
        return response;
      }
    },
  });

  //   COLUMNS
  const dlcmColumns: ColumnDef<IDLCMDetails>[] = [
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
      enableHiding: false,
      cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
    },
    // Business Location
    {
      id: "LocationName",
      accessorKey: "LocationName",
      header: "Location Name",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="max-w-[300px]">{row.original.LocationName}</p>
      ),
    },
    // Phone Number
    {
      id: "PhoneNumber",
      accessorKey: "PhoneNumber",
      header: "Phone Number",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.PhoneNumber}</p>,
    },
    // Sales Rep Location
    {
      id: "SalesRepBusinessLocation",
      accessorKey: "SalesRepBusinessLocation",
      header: "Sales Rep Business Location",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.SalesRepBusinessLocation}</p>,
    },
    // Enrollment Date
    {
      id: "CreatedAt",
      accessorKey: "CreatedAt",
      header: "Created At",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="inline-block px-2 py-1 text-sm font-medium text-yellow-700 bg-yellow-50 rounded">
          {moment(row.original.CreatedAt).format("DD/MM/YYYY")}
        </p>
      ),
    },
    // Partner Code
    {
      id: "PartnerCode",
      accessorKey: "PartnerCode",
      header: "Partner Code",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.PartnerCode}</p>,
    },
    // Category
    {
      id: "Category",
      accessorKey: "Category",
      header: "Category",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.Category ?? "-"}</p>,
    },
    // MoMoAccNo
    {
      id: "MoMoAccNo",
      accessorKey: "MoMoAccNo",
      header: "Mo Mo Acc No",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.MoMoAccNo ?? "-"}</p>,
    },
    // MSISDNNo
    {
      id: "MSISDNNo",
      accessorKey: "MSISDNNo",
      header: "MSISDNNo",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.MSISDNNo ?? "-"}</p>,
    },
    // Mail Address
    {
      id: "MailAddress",
      accessorKey: "MailAddress",
      header: "Mail Address",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.MailAddress ?? "-"}</p>,
    },
    // Country
    {
      id: "Country",
      accessorKey: "Country",
      header: "Country",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.Country ?? "-"}</p>,
    },
    // Country State
    {
      id: "CountryState",
      accessorKey: "CountryState",
      header: "Country State",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.CountryState ?? "-"}</p>,
    },
    // Address
    {
      id: "Address",
      accessorKey: "Address",
      header: "Address",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.Address ?? "-"}</p>,
    },
    // ISTag
    {
      id: "ISTag",
      accessorKey: "ISTag",
      header: "ISTag",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.ISTag ?? "-"}</p>,
    },
    // Serial No
    {
      id: "SerialNo",
      accessorKey: "SerialNo",
      header: "Serial No",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.SerialNo ?? "-"}</p>,
    },
    // LG
    {
      id: "LG",
      accessorKey: "LG",
      header: "LG",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.LG ?? "-"}</p>,
    },
    // Shipment
    {
      id: "Shipment",
      accessorKey: "Shipment",
      header: "Shipment",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.Shipment ?? "-"}</p>,
    },
    // Description
    {
      id: "Description",
      accessorKey: "Description",
      header: "Description",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.Description ?? "-"}</p>,
    },
    // Partner Name
    {
      id: "PartnerName",
      accessorKey: "PartnerName",
      header: "Partner Name",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.PartnerName ?? "-"}</p>,
    },
    // Partner Mail
    {
      id: "PartnerMail",
      accessorKey: "PartnerMail",
      header: "Partner Mail",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.PartnerMail ?? "-"}</p>,
    },
    // Parent Request Holder
    {
      id: "ParentRequestHolder",
      accessorKey: "ParentRequestHolder",
      header: "Parent Request Holder",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.ParentRequestHolder ?? "-"}</p>,
    },
    // Partner Business Location
    {
      id: "PartnerBusinessLocation",
      accessorKey: "PartnerBusinessLocation",
      header: "Partner Business Location",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.PartnerBusinessLocation ?? "-"}</p>,
    },
    // Sales Rep Mail
    {
      id: "SalesRepMail",
      accessorKey: "SalesRepMail",
      header: "Sales Rep Mail",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.SalesRepMail ?? "-"}</p>,
    },
    // Device
    {
      id: "Device",
      accessorKey: "Device",
      header: "Device",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.Device ?? "-"}</p>,
    },
    // IMEI No 2
    {
      id: "IMEINo2",
      accessorKey: "IMEINo2",
      header: "IMEINo2",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.IMEINo2 ?? "-"}</p>,
    },
    // Comment From Unlock
    {
      id: "CommentFromUnlock",
      accessorKey: "CommentFromUnlock",
      header: "Comment From Unlock",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.CommentFromUnlock ?? "-"}</p>,
    },
    // Comment
    {
      id: "Comment",
      accessorKey: "Comment",
      header: "Comment",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.Comment ?? "-"}</p>,
    },
    // Tenant
    {
      id: "Tenant",
      accessorKey: "Tenant",
      header: "Tenant",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.Tenant ?? "-"}</p>,
    },
    // Error
    {
      id: "Error",
      accessorKey: "Error",
      header: "Error",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.Error ?? "-"}</p>,
    },
    // Updated At
    {
      id: "UpdatedAt",
      accessorKey: "UpdatedAt",
      header: "Updated At",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{moment(row.original.UpdatedAt).format("DD/MM/YYYY") ?? "-"}</p>
      ),
    },
    // State
    {
      id: "State",
      accessorKey: "State",
      header: "State",
      enableHiding: true,
      cell: ({ row }) => <p>{row.original.State ?? "-"}</p>,
    },
  ];

  useEffect(() => {
    const localStorageColumns = localStorage.getItem("columnVisibility_dlcm");
    if (localStorageColumns) {
      const parsedColumns: string = Object.entries(
        JSON.parse(localStorageColumns)
      )
        .filter(([key, value]) => value === true && key !== "sn")
        .map(([key]) => key)
        .join(",");
      setColumns(parsedColumns);
    } else {
      const visibleColumns = dlcmColumns?.reduce(
        (acc: Record<string, boolean>, column: ColumnDef<IDLCMDetails>) => {
          if (column.id) {
            acc[column.id] = column.enableHiding ? false : true;
          }
          return acc;
        },
        {}
      );

      localStorage.setItem(
        "columnVisibility_dlcm",
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
    dlcmData,
    dlcmLoading,

    // Column
    dlcmColumns,
  };
};

export default useDLCM;
