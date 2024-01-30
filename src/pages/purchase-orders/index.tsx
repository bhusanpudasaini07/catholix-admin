import React, { useCallback, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DateRange } from "react-day-picker";

import { useDebounce } from "@/hooks/debounce.hooks";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

import ConfirmationModal from "@/shared/components/confirmation-modal";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";

import {
  SearchIcon,
  TotalInvoice,
  TotalInvoiceAmount,
  UnpaidInvoice,
} from "@/shared/lib/image-config";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/shared/components/ui/badge";
import { EyeIcon, PencilLine, RefreshCcw, Trash2 } from "lucide-react";

import {
  deletePurchaseOrder,
  getPurchaseOrderList,
  syncPurchaseOrder,
} from "@/services/purchase-order/purchase-order-service";
import {
  IPurchaseOrder,
  IPurchaseOrderDetail,
} from "@/interface/purchase-order-interface";

import DateRangeFilter from "@/shared/components/date-range-filter";

const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
  const rowIndex = row.index;
  const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;

  return <div className="text-color w-[40px]">{serialNumber}.</div>;
};

const PurchaseOrder: NextPageWithLayout = () => {
  const queryClient = useQueryClient();

  // STATES
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [purchaseId, setPurchaseId] = useState("");
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [synced, setSynced] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [dateRangeOpen, setDateRangeOpen] = useState(false);

  // Debounce the search value to avoid multiple api hits while typing
  const debouncedSearchValue = useDebounce(searchValue, 300);

  // FUNCTIONS
  /**
   * Call purchase List api
   */
  const { data: purchaseList, isLoading } = useQuery<IPurchaseOrder>({
    queryFn: () =>
      getPurchaseOrderList(
        searchValue,
        pageNumber,
        perPage,
        date?.from && format(date?.from, "yyyy-MM-dd'T'HH:mm:ss"),
        date?.to && format(date?.to, "yyyy-MM-dd'T'HH:mm:ss")
      ),
    queryKey: [
      "purchaseList",
      debouncedSearchValue,
      pageNumber,
      perPage,
      date?.to,
    ],
  });
  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPageNumber(1);
  };
  const handlePageChange = (pageNum: number) => {
    setPageNumber(pageNum);
  };
  const resetFilter = () => {
    setDate({
      from: undefined,
      to: undefined,
    });
    setSearchValue("");
    setPageNumber(1);
  };

  // Delete Purchase Order
  const deletePurchaseOrderMutation = useMutation({
    mutationFn: deletePurchaseOrder,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      setOpen(false);
      queryClient.invalidateQueries(["purchaseList"]);
    },
    onError: (error: any) => {
      setOpen(false);
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const deleteHandler = () => {
    deletePurchaseOrderMutation.mutate(purchaseId);
  };

  // Sync purchase order
  const { data, isLoading: syncLoading } = useQuery({
    queryFn: syncPurchaseOrder,
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

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "S.N",
      cell: (props) => (
        <SerialNumberCell
          {...props}
          pageNumber={pageNumber}
          perPage={perPage}
        />
      ),
    },
    {
      accessorKey: "vendor_name",
      header: "VENDOR NAME",
      cell: ({ row }) => (
        <div className="capitalize w-[200px]">
          {row.getValue("vendor_name") ?? "-"}
        </div>
      ),
    },
    {
      accessorKey: "po_number",
      header: ({ column }) => {
        return <div>PO NUMBER</div>;
      },
      cell: ({ row }) => (
        <div className="w-[120px]">
          {row.getValue("po_number") ? row.getValue("po_number") : "-"}
        </div>
      ),
    },
    {
      accessorKey: "po_received_date",
      header: ({ column }) => {
        return <div className="uppercase">PO RECEIVED DATE</div>;
      },
      cell: ({ row }) => (
        <div className="w-[150px]">
          {row.getValue("po_received_date")
            ? format(new Date(row.getValue("po_received_date")), "PPP")
            : "-"}
        </div>
      ),
    },
    {
      accessorKey: "po_net",
      header: ({ column }) => {
        return <div>PO NET</div>;
      },
      cell: ({ row }) => (
        <div className="w-[100px]">
          {row.getValue("po_net") ? row.getValue("po_net") : "-"}
        </div>
      ),
    },
    {
      accessorKey: "po_amount",
      header: ({ column }) => {
        return <div>TOTAL AMOUNT</div>;
      },
      cell: ({ row }) => (
        <div className="w-[150px]">{row.getValue("po_amount") ?? "-"}</div>
      ),
    },
    {
      accessorKey: "is_synced",
      header: () => {
        return <div className="text-center uppercase">PO STATUS</div>;
      },
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div className="flex flex-col justify-center w-[200px] items-center">
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
                {format(new Date(rowData?.sync_date), "PPP,  HH:mm a")}
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
            <Link href={`/purchase-orders/${rowData?.id}`}>
              <EyeIcon className="stroke-gray-400 hover:stroke-green-150" />
            </Link>
            <Link href={`/purchase-orders/${rowData?.id}/edit`}>
              <PencilLine className="stroke-gray-400 hover:stroke-blue-300" />
            </Link>
            <Button
              onClick={() => {
                setPurchaseId(rowData?.id);
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
      purchaseList?.data?.purchase_orders?.length === 0 &&
      pageNumber > purchaseList?.pagination?.total_pages!
    ) {
      setPageNumber(pageNumber - 1);
    }
  }, [purchaseList, pageNumber]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <h2 className="text-4xl font-bold">Purchase Orders</h2>
        </div>
        <div className="flex items-center justify-end flex-1 gap-7">
          <div className="flex items-center justify-between gap-6">
            <Link
              href={"/purchase-orders/new-order"}
              className="inline-flex h-11 px-5 min-w-[148px] items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-50 to-primary border-primary text-white shadow-custom"
            >
              New Purchase Order
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
      {/* Filtering using vendor, project, status and search */}
      <div className="flex items-center justify-end mb-12">
        <Button
          variant={"secondary"}
          onClick={resetFilter}
          className=" gap-2 text-color"
        >
          <RefreshCcw width={17} />
          {"Reset"}
        </Button>
        <div className="flex flex-grow items-center justify-end gap-4 ">
          <DateRangeFilter
            dateRangeOpen={dateRangeOpen}
            setDateRangeOpen={setDateRangeOpen}
            setPageNumber={setPageNumber}
            dateRange={date}
            setDateRange={setDate}
          />
          <div className="relative px-3.5 py-2.5 border rounded-lg flex gap-2 flex-grow max-w-sm">
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
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex items-center justify-between p-4">
          <CardHeader className="p-0">
            <CardDescription className="text-xs uppercase">
              Active Vendors
            </CardDescription>
            <CardTitle>{purchaseList?.data?.active_vendors ?? 0}</CardTitle>
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
              Approved Invoices
            </CardDescription>
            <CardTitle>{purchaseList?.data?.approved_invoices ?? 0}</CardTitle>
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
              Rejected Invoices
            </CardDescription>
            <CardTitle>{purchaseList?.data?.rejected_invoices ?? 0}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              src={UnpaidInvoice}
              alt="Invoice"
              width={45}
              height={45}
              style={{ width: "auto", height: "auto" }}
              quality={100}
            />
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={purchaseList?.data?.purchase_orders ?? []}
        columns={columns}
      />

      {purchaseList?.data?.purchase_orders?.length! > 0 && (
        <DataTablePagination
          currentPage={purchaseList?.pagination.page_no!}
          totalPages={purchaseList?.pagination.total_pages!}
          pageChange={handlePageChange}
          perPage={perPage}
          setPerPage={setPerPage}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        key={purchaseId}
        open={open}
        setOpen={setOpen}
        title="Delete this purchase order"
        description="Are you sure you want to delete this purchase order?"
        btnName="Delete"
        btnFuntion={deleteHandler}
        variant={"destructive"}
      />

      {/* Sync confirmation modal */}
      <ConfirmationModal
        open={syncModalOpen}
        setOpen={setSyncModalOpen}
        title="Sync purchase orders"
        description="Are you sure you want to sync purchase orders?"
        btnName="Sync"
        btnFuntion={syncHandler}
        variant={"default"}
      />
    </div>
  );
};

export default PurchaseOrder;

PurchaseOrder.getLayout = (page) => {
  return <MainLayout title="Purchase Orders">{page}</MainLayout>;
};
