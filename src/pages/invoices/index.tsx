import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DateRange } from "react-day-picker";

import { EyeIcon, PencilLine, RefreshCcw, Send, Trash2 } from "lucide-react";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import {
  ApprovedInvoice,
  SearchIcon,
  TotalInvoice,
  TotalInvoiceAmount,
  UnanalyzedInvoice,
  UnpaidInvoice,
} from "@/shared/lib/image-config";

import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";

import { IInvoice } from "@/interface/invoice-interface";
import { useDebounce } from "@/hooks/debounce.hooks";

import {
  deleteInvoice,
  getInvoiceList,
  sendApproval,
} from "@/services/invoice/invoice-service";
import ConfirmationModal from "@/shared/components/confirmation-modal";
import InvoiceVendorFilter from "@/features/Invoice/list/vendor-filter";
import InvoiceProjectFilter from "@/features/Invoice/list/project-filter";
import DateRangeFilter from "@/shared/components/date-range-filter";

const Invoices: NextPageWithLayout = () => {
  const queryClient = useQueryClient();

  // STATES
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [invoiceId, setInvoiceId] = useState("");
  const [open, setOpen] = useState(false);
  const [openSendModal, setOpenSendModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  /**
   * For filtering using project, vendor and status
   **/
  const [status, setStatus] = useState("");
  const [selectKey, setSelectKey] = useState(0);
  const [project, setProject] = useState("");
  const [vendor, setVendor] = useState("");
  const [projectName, setProjectName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [dateRangeOpen, setDateRangeOpen] = useState(false);

  // Debounce the search value to avoid multiple api hits while typing
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
    const rowIndex = row.index;
    const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;

    return <div className="text-color w-[40px]">{serialNumber}.</div>;
  };

  // FUNCTIONS
  const { data: invoiceList, isLoading } = useQuery<IInvoice>(
    [
      "invoiceList",
      debouncedSearchValue,
      pageNumber,
      perPage,
      vendor,
      project,
      status,
      date?.to,
    ],
    () =>
      getInvoiceList(
        searchValue || "",
        pageNumber,
        perPage,
        vendor,
        project,
        status,
        date?.from && format(date?.from, "yyyy-MM-dd'T'HH:mm:ss"),
        date?.to && format(date?.to, "yyyy-MM-dd'T'HH:mm:ss"),
        ""
      )
  );

  // filter data sending name to api.
  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPageNumber(1);
  };

  const handlePageChange = (pageNum: number) => {
    setPageNumber(pageNum);
  };

  // Delete Vendor List
  const deleteVendorMutation = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      setOpen(false);
      queryClient.invalidateQueries(["invoiceList"]);
    },
    onError: (error: any) => {
      setOpen(false);
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const deleteHandler = () => {
    deleteVendorMutation.mutate(invoiceId);
  };

  /**
   * Send invoice approval
   */
  const sendApprovalMutation = useMutation({
    mutationFn: sendApproval,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      queryClient.invalidateQueries(["invoiceList"]);
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const sendApprovalInvoice = (id: string) => {
    sendApprovalMutation.mutate(id);
  };

  const columns: ColumnDef<IInvoice>[] = [
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
      accessorKey: "invoice_number",
      header: "INVOICE NO.",
      cell: ({ row }) => (
        <div className="capitalize w-[150px]">
          {row.getValue("invoice_number")
            ? row.getValue("invoice_number")
            : "-"}
        </div>
      ),
    },
    {
      accessorKey: "vendor_name",
      header: ({ column }) => {
        return <div>VENDOR NAME</div>;
      },
      cell: ({ row }) => (
        <div className="capitalize w-[200px]">
          {row.getValue("vendor_name")}
        </div>
      ),
    },
    {
      accessorKey: "project_name",
      header: ({ column }) => {
        return <div>PROJECT NAME</div>;
      },
      cell: ({ row }) => (
        <div className="w-[150px]">{row.getValue("project_name")}</div>
      ),
    },
    {
      accessorKey: "bill_date",
      header: ({ column }) => {
        return <div>BILLED DATE</div>;
      },
      cell: ({ row }) => (
        <div className="w-[150px]">
          {row.getValue("bill_date")
            ? format(new Date(row.getValue("bill_date")), "PPP")
            : "-"}
        </div>
      ),
    },
    {
      accessorKey: "total_amount",
      header: () => <div className="">TOTAL AMOUNT</div>,
      cell: ({ row }) => {
        // // Format the amount as a dollar amount
        // const formatted = new Intl.NumberFormat("en-US", {
        //   style: "currency",
        //   currency: "USD",
        // }).format(amount);

        return (
          <div className="w-[100px]">
            {row.getValue("total_amount") ? row.getValue("total_amount") : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "APPROVAL STATUS",
      cell: ({ row }) => {
        return (
          <div className="w-[110px]">
            <Badge
              variant="outline"
              className={`${
                row.getValue("status") === "pending" &&
                "bg-[#FBE19F] text-[#DC9E00]"
              }
            ${
              row.getValue("status") === "approved" &&
              "bg-[#C3F8DA] text-[#349D62]"
            }
            ${
              row.getValue("status") === "onprocess" &&
              "bg-[#BAE4ED] text-[#0080DC]"
            }
            ${
              row.getValue("status") === "rejected" &&
              "bg-[#F9D2DC] text-[#E94774]"
            }  capitalize border-none`}
            >
              {row.getValue("status")}
            </Badge>
          </div>
        );
      },
    },
    {
      id: "approval",
      header: () => <div className="uppercase">APPROVAL</div>,
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <div className="w-[110px]">
            <Button
              size={"xs"}
              onClick={() => {
                setInvoiceId(rowData?.id);
                setOpenSendModal(true);
              }}
              disabled={
                rowData?.status === "approved" ||
                !rowData?.total_amount ||
                !rowData?.bill_date
              }
            >
              {rowData?.is_resend_approval
                ? "Resend Approval"
                : "Send Approval"}
            </Button>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="uppercase">ACTIONS</div>,
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <div className="flex items-center gap-4">
            <Link href={`/invoices/${rowData.id}`}>
              <EyeIcon className="stroke-gray-400 hover:stroke-green-150" />
            </Link>
            <Link
              href={`/invoices/${rowData.id}/edit`}
              className={
                rowData?.status === "approved"
                  ? "pointer-events-none [&>svg]:stroke-gray-250"
                  : ""
              }
            >
              <PencilLine className="stroke-gray-400 hover:stroke-blue-300" />
            </Link>
            <Button
              disabled={rowData?.status === "approved"}
              onClick={() => {
                setInvoiceId(rowData?.id);
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

  const resetFilter = () => {
    setPageNumber(1);
    setSearchValue("");
    setVendor("");
    setProject("");
    setStatus("");
    setVendorName("");
    setProjectName("");
    setDate({
      from: undefined,
      to: undefined,
    });
    setSelectKey((prevKey) => prevKey + 1); // increment the key
  };

  // EFFECTS
  useEffect(() => {
    if (
      pageNumber > 1 &&
      invoiceList?.data?.invoices?.length === 0 &&
      pageNumber > invoiceList?.pagination?.total_pages
    ) {
      setPageNumber(pageNumber - 1);
    }
  }, [invoiceList, pageNumber]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-4xl font-bold">Invoices</h2>
          {/* <Badge className="font-normal ">240 Vendors</Badge> */}
        </div>
        <div className="flex items-center justify-end flex-1 gap-7">
          <div className="flex items-center justify-between gap-6">
            <Link
              href={"/invoices/add-invoice"}
              className="inline-flex h-11 px-5 min-w-[148px] items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-50 to-primary border-primary text-white shadow-custom"
            >
              New Invoice
            </Link>
            {/* <Button size={"lg"} variant={"secondary"}>
              Sync
            </Button> */}
          </div>
        </div>
      </div>
      {/* Filtering using vendor, project, status and search */}
      <div className="flex gap-4 items-start justify-between mb-12">
        <Button
          variant={"secondary"}
          onClick={resetFilter}
          className=" gap-2 text-color"
        >
          <RefreshCcw width={17} />
          {"Reset"}
        </Button>
        <div className="flex flex-wrap flex-grow items-center justify-end gap-4 ">
          <DateRangeFilter
            dateRangeOpen={dateRangeOpen}
            setDateRangeOpen={setDateRangeOpen}
            setPageNumber={setPageNumber}
            dateRange={date}
            setDateRange={setDate}
          />

          <InvoiceVendorFilter
            vendorName={vendorName}
            setVendorName={setVendorName}
            vendor={vendor}
            setVendor={setVendor}
          />
          <InvoiceProjectFilter
            projectName={projectName}
            setProjectName={setProjectName}
            vendor={vendor}
            project={project}
            setProject={setProject}
          />
          <Select key={selectKey} onValueChange={(e) => setStatus(e)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={"Select Status"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="onprocess">On Process</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
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
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="flex items-center justify-between p-4">
          <CardHeader className="p-0">
            <CardDescription>Total Invoices</CardDescription>
            <CardTitle>{invoiceList?.data?.total_invoices}</CardTitle>
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
            <CardDescription>Total Invoices Amount</CardDescription>
            <CardTitle>
              {invoiceList?.data?.total_invoice_amount?.toFixed(2)}
              {/* <span className="text-sm text-green-150">+55%</span> */}
            </CardTitle>
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
            <CardDescription>Unanalyzed Invoices</CardDescription>
            <CardTitle>{invoiceList?.data?.pending_invoices}</CardTitle>
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
        <Card className="flex items-center justify-between p-4">
          <CardHeader className="p-0">
            <CardDescription>Rejected Invoices</CardDescription>
            <CardTitle>{invoiceList?.data?.rejected_invoices}</CardTitle>
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
        <Card className="flex items-center justify-between p-4">
          <CardHeader className="p-0">
            <CardDescription>Approved Invoices</CardDescription>
            <CardTitle>
              {invoiceList?.data?.approved_invoices}
              {/* <span className="text-sm text-green-150">+55%</span> */}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              src={ApprovedInvoice}
              alt="Invoice"
              width={45}
              style={{ width: "auto", height: "auto" }}
              height={45}
              quality={100}
            />
          </CardContent>
        </Card>
      </div>

      <DataTable data={invoiceList?.data?.invoices ?? []} columns={columns} />
      <DataTablePagination
        currentPage={invoiceList?.pagination?.page_no!}
        totalPages={invoiceList?.pagination?.total_pages!}
        pageChange={handlePageChange}
        perPage={perPage}
        setPerPage={setPerPage}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        key={`delete-${invoiceId}`}
        open={open}
        setOpen={setOpen}
        title="Delete this invoice"
        description="Are you sure you want to delete this invoice?"
        btnName="Delete"
        btnFuntion={deleteHandler}
        variant={"destructive"}
      />

      {/* Invoice send approval confirmation */}
      <ConfirmationModal
        key={`approval-${invoiceId}`}
        open={openSendModal}
        setOpen={setOpenSendModal}
        title="Send approval"
        description="Are you sure you want to send approval?"
        btnName="Send"
        btnFuntion={() => sendApprovalInvoice(invoiceId)}
        variant={"default"}
      />
    </div>
  );
};

export default Invoices;

Invoices.getLayout = (page) => {
  return <MainLayout title="Invoice">{page}</MainLayout>;
};
