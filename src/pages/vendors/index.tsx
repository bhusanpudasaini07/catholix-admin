import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { format } from "date-fns";

import { EyeIcon, PencilLine, Trash2 } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

import {
  SearchIcon,
  TotalInvoice,
  TotalInvoiceAmount,
  UnanalyzedInvoice,
} from "@/shared/lib/image-config";

import { useDebounce } from "@/hooks/debounce.hooks";

import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import ConfirmationModal from "@/shared/components/confirmation-modal";

import { IVendor } from "@/interface/vendor-interface";
import {
  deleteVendor,
  getVendorList,
  syncVendor,
} from "@/services/vendor/vendor-service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

const Vendors: NextPageWithLayout = () => {
  const queryClient = useQueryClient();

  // STATES
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [vendorId, setVendorId] = useState("");
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [synced, setSynced] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);

  // Debounce the search value to avoid multiple api hits while typing
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
    const rowIndex = row.index;
    const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;

    return <div className="text-color w-[40px]">{serialNumber}.</div>;
  };

  /**
   * FUNCTIONS
   * */

  // getVendorList api
  const { data: vendorList, isLoading } = useQuery<IVendor>(
    ["vendorList", debouncedSearchValue, pageNumber, perPage],
    // ["vendorList", pageNumber, perPage, debouncedSearchValue],
    () => getVendorList(searchValue || "", pageNumber, perPage)
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPageNumber(1);
  };

  const handlePageChange = (pageNum: number) => {
    setPageNumber(pageNum);
  };

  // Delete Vendor List
  const deleteVendorMutation = useMutation({
    mutationFn: deleteVendor,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      setOpen(false);
      queryClient.invalidateQueries(["vendorList"]);
    },
    onError: (error: any) => {
      setOpen(false);
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const deleteHandler = () => {
    deleteVendorMutation.mutate(vendorId);
  };

  // Sync purchase order
  const { data, isLoading: syncLoading } = useQuery({
    queryFn: syncVendor,
    queryKey: ["purchaseOrderSync", synced],
    enabled: !!synced,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data);
    },
  });
  const syncHandler = () => {
    setSynced(true);
    setTimeout(() => {
      setSynced(false);
    }, 1000);
  };

  // columns
  const columns: ColumnDef<IVendor>[] = [
    {
      accessorKey: "S.N",
      enableResizing: true,
      cell: (props) => (
        <SerialNumberCell
          {...props}
          pageNumber={pageNumber}
          perPage={perPage}
        />
      ),
    },
    {
      accessorKey: "name",
      size: 100,

      header: ({ column }) => {
        return (
          //   <Button
          //     variant="ghost"
          //     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          //   >
          <div className="uppercase">
            Vendor Name
            {/* <Eye className="w-4 h-4 ml-2" /> */}
          </div>
          //   </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium w-[250px] text-color capitalize">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "no_of_projects",
      header: "NO. OF PROJECTS",

      //   header: ({ column }) => {
      //     return (
      //       <Button
      //         variant="ghost"
      //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      //       >
      //         No. Of Projects
      //         {/* <ChevronsUpDown className="w-4 h-4 ml-2" /> */}
      //       </Button>
      //     );
      //   },
      cell: ({ row }) => (
        <>
          <div className="text-color w-[100px]">
            {row.getValue("no_of_projects")}
          </div>
        </>
      ),
    },
    {
      accessorKey: "city",
      header: "ADDRESS",
      size: 100,

      //   header: ({ column }) => {
      //     return (
      //       <Button
      //         variant="ghost"
      //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      //       >
      //         Billed Date
      //         <ChevronsUpDown className="w-4 h-4 ml-2" />
      //       </Button>
      //     );
      //   },
      cell: ({ row }) => (
        <div className="text-color w-[100px]">
          {row.getValue("city") ? row.getValue("city") : "-"}
        </div>
      ),
    },
    {
      accessorKey: "primary_email",
      size: 100,

      header: () => <div className="uppercase">EMAIL</div>,
      cell: ({ row }) => {
        return (
          <div className="text-color w-[150px]">
            {row.getValue("primary_email")}
          </div>
        );
      },
    },
    {
      accessorKey: "contact_person_phone_number",
      header: "PHONE NUMBER",
      size: 100,

      cell: ({ row }) => {
        return (
          <div className="text-color w-[150px]">
            {row.getValue("contact_person_phone_number")
              ? row.getValue("contact_person_phone_number")
              : "-"}
          </div>
        );
      },
    },

    {
      accessorKey: "is_synced",
      size: 100,

      header: ({ column }) => {
        return <div className="text-center uppercase">Sync Status</div>;
      },
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <div className="flex flex-col w-[200px] justify-center items-center">
            <Badge
              variant="outline"
              className={`${
                row?.getValue("is_synced")
                  ? "bg-[#C3F8DA] text-[#349D62]"
                  : "bg-[#FBE19F] text-[#DC9E00]"
              }  capitalize border-none`}
            >
              {row.getValue("is_synced") ? "Synced" : "Unsynced"}
            </Badge>
            {row?.getValue("is_synced") && rowData?.sync_date && (
              <p className="text-xs text-gray-270 mt-2">
                {format(new Date(rowData?.sync_date), "PPP, HH:mm a")}
              </p>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="uppercase">ACTIONS</div>,
      cell: ({ row }) => {
        const rowData: any = row.original;
        return (
          <div className="flex items-center gap-4">
            <Link href={`/vendors/${rowData?.id}`}>
              <EyeIcon className="stroke-gray-400 hover:stroke-green-150" />
            </Link>
            <Link href={`/vendors/${rowData?.id}/edit`}>
              <PencilLine className="stroke-gray-400 hover:stroke-blue-300" />
            </Link>
            <Button
              onClick={() => {
                setVendorId(rowData?.id);
                setOpen(true);
              }}
              variant={"ghost"}
              className="p-0 hover:bg-transparent hover:[&>svg]:stroke-destructive"
            >
              <Trash2 className="stroke-gray-400" />
            </Button>
          </div>
        );
      },
    },
  ];

  // EFFECTS
  useEffect(() => {
    if (
      vendorList?.data?.vendors?.length === 0 &&
      pageNumber > vendorList?.pagination?.total_pages!
    ) {
      setPageNumber(pageNumber - 1);
    }
  }, [vendorList, pageNumber]);
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <h2 className="text-4xl font-bold">Vendors</h2>
          {/* <Badge className="font-normal ">240 Vendors</Badge> */}
        </div>
        <div className="flex items-center justify-between lg:justify-end flex-1 gap-7">
          <div className="relative px-3.5 py-2.5 border rounded-lg flex gap-2 flex-grow lg:max-w-sm">
            <Button variant={"ghost"} className="h-auto p-0">
              <Image
                src={SearchIcon}
                width={24}
                height={24}
                quality={100}
                alt="Search Icon"
                className=""
              />
            </Button>
            <Input
              placeholder="Search"
              className="h-auto p-0 border-0 rounded-none "
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-6">
            <Link
              href={"/vendors/add-vendor"}
              className="inline-flex h-11 px-5 min-w-[148px] items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-50 to-primary border-primary text-white shadow-custom"
            >
              Add New Vendor
            </Link>
            {process.env.NEXT_PUBLIC_IS_SYNCED !== "false" && (
              <Button
                onClick={() => setSyncModalOpen(true)}
                disabled={process.env.NEXT_PUBLIC_IS_SYNCED === "false"}
                variant={"secondary"}
                size={"lg"}
              >
                Sync
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex items-center justify-between p-4">
          <CardHeader className="p-0">
            <CardDescription className="text-xs uppercase">
              Total Vendors
            </CardDescription>
            <CardTitle>{vendorList?.data?.total_vendors}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              src={TotalInvoice}
              alt="Invoice"
              style={{ width: "auto", height: "auto" }}
              width={45}
              height={45}
              quality={100}
            />
          </CardContent>
        </Card>
        <Card className="flex items-center justify-between p-4">
          <CardHeader className="p-0">
            <CardDescription className="text-xs uppercase">
              Active Vendors
            </CardDescription>
            <CardTitle>{vendorList?.data?.active_vendors}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              src={TotalInvoiceAmount}
              alt="Invoice"
              width={45}
              height={45}
              style={{ width: "auto", height: "auto" }}
              quality={100}
            />
          </CardContent>
        </Card>
        <Card className="flex items-center justify-between p-4">
          <CardHeader className="p-0">
            <CardDescription className="text-xs uppercase">
              Inactive Vendors
            </CardDescription>
            <CardTitle>{vendorList?.data?.inactive_vendors}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              src={UnanalyzedInvoice}
              alt="Invoice"
              width={45}
              height={45}
              style={{ width: "auto", height: "auto" }}
              quality={100}
            />
          </CardContent>
        </Card>
      </div>

      <DataTable data={vendorList?.data?.vendors ?? []} columns={columns} />
      <DataTablePagination
        currentPage={vendorList?.pagination?.page_no!}
        totalPages={vendorList?.pagination?.total_pages!}
        pageChange={handlePageChange}
        perPage={perPage}
        setPerPage={setPerPage}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        key={vendorId}
        open={open}
        setOpen={setOpen}
        title="Delete this vendor"
        description="Are you sure you want to delete this vendor?"
        btnName="Delete"
        btnFuntion={deleteHandler}
        variant={"destructive"}
      />

      {/* Sync confirmation modal */}
      <ConfirmationModal
        open={syncModalOpen}
        setOpen={setSyncModalOpen}
        title="Sync vendors"
        description="Are you sure you want to sync vendors?"
        btnName="Sync"
        btnFuntion={syncHandler}
        variant={"default"}
      />
    </div>
  );
};

export default Vendors;

Vendors.getLayout = (page) => {
  return <MainLayout title={"Vendors"}>{page}</MainLayout>;
};
