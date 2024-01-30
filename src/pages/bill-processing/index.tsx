import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DateRange } from "react-day-picker";

import { ArrowUpDown, Download, EyeIcon, RefreshCcw } from "lucide-react";
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
  TotalInvoiceAmount,
  UnanalyzedInvoice,
  UnpaidInvoice,
} from "@/shared/lib/image-config";

import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";

import { IInvoice } from "@/interface/invoice-interface";
import { useDebounce } from "@/hooks/debounce.hooks";

import {
  getInvoiceList,
  updatePaymentStatus,
} from "@/services/invoice/invoice-service";
import ConfirmationModal from "@/shared/components/confirmation-modal";
import InvoiceVendorFilter from "@/features/Invoice/list/vendor-filter";
import InvoiceProjectFilter from "@/features/Invoice/list/project-filter";
import DateRangeFilter from "@/shared/components/date-range-filter";
import Link from "next/link";

const BillProcessing: NextPageWithLayout = () => {
  const queryClient = useQueryClient();

  // STATES
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [invoiceId, setInvoiceId] = useState("");
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
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
        "approved",
        date?.from && format(date?.from, "yyyy-MM-dd'T'HH:mm:ss"),
        date?.to && format(date?.to, "yyyy-MM-dd'T'HH:mm:ss"),
        status
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
      accessorKey: "payment_status",
      header: "PAID STATUS",
      cell: ({ row }) => {
        return (
          <div className="w-[110px]">
            <Badge
              variant="outline"
              className={`${
                row.getValue("payment_status") === "unpaid" &&
                "bg-[#FBE19F] text-[#DC9E00]"
              }
            ${
              row.getValue("payment_status") === "paid" &&
              "bg-[#C3F8DA] text-[#349D62]"
            }
            ${
              row.getValue("payment_status") === "hold" &&
              "bg-[#BAE4ED] text-[#0080DC]"
            }
            ${
              row.getValue("payment_status") === "cancelled" &&
              "bg-[#F9D2DC] text-[#E94774]"
            }  capitalize border-none`}
            >
              {row.getValue("payment_status")}
            </Badge>
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
            <Link href={`/bill-processing/${rowData.id}`}>
              <EyeIcon className="stroke-gray-400 hover:stroke-green-150" />
            </Link>
            <Button
              size={"xs"}
              variant={"ghost"}
              className="p-0 border-2 px-2  hover:bg-transparent hover:[&>svg]:stroke-blue-300"
              onClick={() => {
                setOpen(true);
                setInvoiceId(rowData?.id);
              }}
              disabled={rowData?.payment_status === "paid"}
            >
              <ArrowUpDown width={18} className="stroke-gray-400" />
            </Button>
            <Button
              variant={"ghost"}
              className="p-0 hover:bg-transparent hover:[&>svg]:stroke-destructive"
            >
              <Download className="stroke-gray-400" />
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
    setVendorName("");
    setProjectName("");
    setDate({
      from: undefined,
      to: undefined,
    });
    setSelectKey((prevKey) => prevKey + 1); // increment the key
  };

  /**
   * Update status of invoices to paid, canceled or hold.
   */
  const updateStatusMutation = useMutation({
    mutationFn: updatePaymentStatus,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      setOpen(false);
      setPaymentStatus("");
      queryClient.invalidateQueries(["invoiceList"]);
    },
    onError: (error: any) => {
      setOpen(false);
      setPaymentStatus("");
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const updateStatusHandler = () => {
    const payload = {
      invoice_id: invoiceId,
      status: paymentStatus,
    };
    updateStatusMutation.mutate(payload);
  };

  const cardData = [
    {
      title: "Paid Invoice",
      value: invoiceList?.data?.paid_invoices ?? 0,
      icon: TotalInvoiceAmount,
    },
    {
      title: "Unpaid Invoice",
      value: invoiceList?.data?.unpaid_invoices ?? 0,
      icon: UnanalyzedInvoice,
    },
    {
      title: "Cancelled Invoice",
      value: invoiceList?.data?.cancelled_invoices ?? 0,
      icon: UnpaidInvoice,
    },
    {
      title: "Hold Invoice",
      value: invoiceList?.data?.hold_invoices ?? 0,
      icon: ApprovedInvoice,
    },
  ];

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
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-4xl font-bold">Bill Processing</h2>
          {/* <Badge className="font-normal ">240 Vendors</Badge> */}
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
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="hold">Hold</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData?.map((card, index) => (
          <Card className="flex items-center justify-between p-4" key={index}>
            <CardHeader className="p-0">
              <CardDescription>{card?.title}</CardDescription>
              <CardTitle>{card?.value}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Image
                src={card?.icon}
                alt="Invoice"
                style={{ width: "auto", height: "auto" }}
                width={45}
                height={45}
                quality={100}
              />
            </CardContent>
          </Card>
        ))}
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
        key={`payment-status-${invoiceId}`}
        open={open}
        setOpen={setOpen}
        title="Update invoice status"
        description=""
        btnName="Update"
        btnFuntion={updateStatusHandler}
        variant={"default"}
        disabled={paymentStatus === ""}
        cancel={() => {
          setOpen(false);
          setPaymentStatus("");
        }}
      >
        <Select onValueChange={(e) => setPaymentStatus(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="hold">Hold</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </ConfirmationModal>
    </div>
  );
};

export default BillProcessing;

BillProcessing.getLayout = (page) => {
  return <MainLayout title="Bill Processing">{page}</MainLayout>;
};
