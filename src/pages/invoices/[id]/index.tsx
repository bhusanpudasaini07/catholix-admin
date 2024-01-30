import React, { useState } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import MainLayout from "@/shared/main-layout";

import { Button } from "@/shared/components/ui/button";

import { getInvoiceDetail } from "@/services/invoice/invoice-service";
import { IInvoiceDetails } from "@/interface/invoice-interface";

import InvoiceApprovers from "@/features/Invoice/details/approvers";
import InvoiceTable from "@/features/Invoice/details/invoice-table";
import UploadCustomerDetail from "@/features/Invoice/upload/customer-detail";
import UploadAdditionalInformation from "@/features/Invoice/upload/additional-information";
import Link from "next/link";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import ImagePdfDsiplay from "@/features/Invoice/image-pdf-display";

interface IInvoiceDetailProps {
  data: IInvoiceDetails;
}

const InvoiceDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  // STATES
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState(1);

  const { data: invoiceDetail, isLoading } = useQuery<IInvoiceDetailProps>({
    queryKey: ["invoiceDetail", id],
    queryFn: async () => {
      if (id) {
        const response = await getInvoiceDetail(id);
        return response;
      }
    },
  });

  const { client, ship_to } = invoiceDetail?.data?.details?.result || {};
  // condition to check if ship_to is available and does not have any key empty.
  const isShipToValid = () => {
    if (!ship_to || Object.keys(ship_to).length === 0) return false;

    for (let key in ship_to) {
      if (
        ship_to[key] === "" ||
        ship_to[key] === null ||
        ship_to[key] === undefined
      ) {
        return false;
      }
    }
    return true;
  };
  console.log(invoiceDetail?.data?.invoice_file);
  return (
    <div className="relative">
      <div className="flex items-center justify-between pb-4 border-b mb-8">
        <h2 className="text-color font-bold text-4xl">Invoice Detail</h2>
        <div className="flex items-center gap-6">
          <Link
            className="w-[135px] h-auto leading-none text-center py-3.5 text-sm rounded-lg inline bg-white border border-purple-60 text-purple-60  hover:bg-purple-60 hover:text-white"
            href={"/invoices"}
          >
            Back
          </Link>
          <Button onClick={() => setOpen(true)} variant={"outline"} size={"lg"}>
            View Image
          </Button>
          <Button
            size={"lg"}
            disabled={invoiceDetail?.data?.status === "approved"}
            onClick={() => router.push(`/invoices/${id}/edit`)}
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between p-6 pb-0 pt-0">
        <h5 className="text-4xl text-purple-60 font-bold">Invoice</h5>

        {/* <Image src={Logo} width={100} height={100} alt="Invoice Image" /> */}
      </div>

      <div className="p-6 pb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
          {isShipToValid() && (
            <div>
              <h5 className="text-xl font-bold">Vendor</h5>
              <div className="mb-4">
                <p className="text-color mb-1">
                  {invoiceDetail?.data?.details?.result?.vendor?.name}
                </p>
                <p className="text-color text-sm">
                  {invoiceDetail?.data?.details?.result?.vendor?.address}
                </p>
                <p className="text-color text-sm mb-1">
                  {invoiceDetail?.data?.details?.result?.vendor?.city}{" "}
                  {invoiceDetail?.data?.details?.result?.vendor?.zip}
                </p>
              </div>
              {invoiceDetail?.data?.details?.result?.vendor?.voice && (
                <p className="text-color mb-1">
                  Contact :{" "}
                  {invoiceDetail?.data?.details?.result?.vendor?.voice}
                </p>
              )}
              {invoiceDetail?.data?.details?.result?.vendor?.fax && (
                <p className="text-color mb-1">
                  Fax : {invoiceDetail?.data?.details?.result?.vendor?.fax}
                </p>
              )}
              {invoiceDetail?.data?.details?.result?.vendor?.email && (
                <p className="text-color mb-1">
                  Email : {invoiceDetail?.data?.details?.result?.vendor?.email}
                </p>
              )}
              {invoiceDetail?.data?.details?.result?.vendor?.tax_id && (
                <p className="text-color mb-1">
                  Tax ID :{" "}
                  {invoiceDetail?.data?.details?.result?.vendor?.tax_id}
                </p>
              )}
              {invoiceDetail?.data?.details?.result?.vendor?.iban && (
                <p className="text-color mb-1">
                  IBAN : {invoiceDetail?.data?.details?.result?.vendor?.iban}
                </p>
              )}
            </div>
          )}
          <div className={isShipToValid() ? "text-end" : ""}>
            <h4 className="text-xl font-medium mb-3 text-black">
              Invoice no :{" "}
              <strong>
                {invoiceDetail?.data?.details?.result?.invoice?.invoice_number}
              </strong>
            </h4>
            <p className="text-gray-270 text-sm break-words">
              Date of issue :{" "}
              {invoiceDetail?.data?.details?.result?.invoice?.invoice_date}
            </p>
            {invoiceDetail?.data?.details?.result?.invoice?.due_date && (
              <p className="text-gray-270 text-sm break-words">
                Due Date :{" "}
                {invoiceDetail?.data?.details?.result?.invoice?.due_date}
              </p>
            )}
            {invoiceDetail?.data?.details?.result?.invoice?.order_number && (
              <p className="text-color text-sm break-words">
                Order Number :{" "}
                {invoiceDetail?.data?.details?.result?.invoice?.order_number}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h5 className="text-xl font-bold">Client</h5>
            <div className="mb-4">
              <p className="text-color mb-1 break-words">
                {client?.company_name ?? client?.name ?? client?.customer_name}
              </p>
              <p className="text-color text-sm break-words">
                {client?.address}
              </p>
              <p className="text-color text-sm mb-1 break-words">
                {client?.city} {client?.zip}
              </p>
            </div>
            {client?.tax_id && (
              <p className="text-color mb-1 break-words">
                Tax ID : {client?.tax_id}
              </p>
            )}
            {client?.iban && (
              <p className="text-color break-words">IBAN: {client?.iban}</p>
            )}
          </div>
          <div className="text-end">
            {isShipToValid() ? (
              <div>
                <h5 className="text-xl font-bold">Ship to</h5>
                <div className="mb-4">
                  <p className="text-color mb-1 break-words">
                    {ship_to?.company_name}
                  </p>
                  <p className="text-color text-sm break-words">
                    {ship_to?.address}
                  </p>
                  <p className="text-color text-sm mb-1 break-words">
                    {ship_to?.city} {ship_to?.zip}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h5 className="text-xl font-bold">Vendor</h5>
                <div className="mb-4">
                  <p className="text-color mb-1 break-words">
                    {invoiceDetail?.data?.details?.result?.vendor?.name}
                  </p>
                  <p className="text-color text-sm break-words">
                    {invoiceDetail?.data?.details?.result?.vendor?.address}
                  </p>
                  <p className="text-color text-sm mb-1 break-words">
                    {invoiceDetail?.data?.details?.result?.vendor?.city}{" "}
                    {invoiceDetail?.data?.details?.result?.vendor?.zip}
                  </p>
                </div>
                {invoiceDetail?.data?.details?.result?.vendor?.voice && (
                  <p className="text-color mb-1 break-words">
                    Contact :{" "}
                    {invoiceDetail?.data?.details?.result?.vendor?.voice}
                  </p>
                )}
                {invoiceDetail?.data?.details?.result?.vendor?.fax && (
                  <p className="text-color mb-1">
                    Fax : {invoiceDetail?.data?.details?.result?.vendor?.fax}
                  </p>
                )}
                {invoiceDetail?.data?.details?.result?.vendor?.email && (
                  <p className="text-color mb-1">
                    Email :{" "}
                    {invoiceDetail?.data?.details?.result?.vendor?.email}
                  </p>
                )}
                {invoiceDetail?.data?.details?.result?.vendor?.tax_id && (
                  <p className="text-color mb-1">
                    Tax ID :{" "}
                    {invoiceDetail?.data?.details?.result?.vendor?.tax_id}
                  </p>
                )}
                {invoiceDetail?.data?.details?.result?.vendor?.iban && (
                  <p className="text-color mb-1">
                    IBAN : {invoiceDetail?.data?.details?.result?.vendor?.iban}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        {invoiceDetail?.data?.details?.result?.customer_details &&
          Object.values(
            invoiceDetail?.data?.details?.result?.customer_details
          ).some((value) => value !== null && value !== "") && (
            <UploadCustomerDetail extractData={invoiceDetail?.data?.details} />
          )}
      </div>

      <InvoiceTable invoiceDetail={invoiceDetail?.data!} />

      <div className="p-6 flex flex-col gap-4">
        <div>
          <h6 className="text-base text-black font-medium mb-4">Notes</h6>
          <div className="border rounded-md p-4 bg-gray-250 min-h-[150px]">
            <p className="text-color font-semibold text-sm">
              {invoiceDetail?.data?.note
                ? invoiceDetail?.data?.note
                : "No Notes."}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex flex-col items-end">
            {invoiceDetail?.data?.details?.result?.summary &&
              Object.entries(invoiceDetail?.data?.details?.result?.summary).map(
                ([key, value]) => {
                  if (
                    key !== "total" &&
                    key !== "total_amount_in_words" &&
                    key !== "amount_in_words" &&
                    value != ""
                  ) {
                    return (
                      <div className="flex items-baseline gap-3 mb-3" key={key}>
                        <p className="text-sm  text-start text-black/50">
                          {key
                            .replace(/_/g, " ")
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}{" "}
                          :
                        </p>
                        <p className="text-black min-w-[150px] max-w-[150px] text-end text-lg break-all font-medium">
                          {value?.toString()}
                        </p>
                      </div>
                    );
                  }
                }
              )}
            <div className="text-right">
              <p className="text-sm text-black/50 mb-2">Invoice Total</p>
              <p className="text-purple-60 text-4xl font-bold break-all">
                {invoiceDetail?.data?.details?.result?.summary?.total ??
                  invoiceDetail?.data?.details?.result?.summary
                    ?.total_invoice_amount}
              </p>
            </div>
          </div>
        </div>
        {invoiceDetail?.data?.details?.result?.summary &&
          Object.entries(invoiceDetail?.data?.details?.result?.summary).map(
            ([key, value]) => {
              if (key == "total_amount_in_words" || key === "amount_in_words") {
                return (
                  <div
                    className="flex items-start gap-3 mb-3 border-t pt-2"
                    key={key}
                  >
                    <p className="text-sm  text-start text-black/50 ">
                      {key
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}{" "}
                      :
                    </p>
                    <p className="text-black  text-end text-lg break-all font-medium">
                      {value?.toString()}
                    </p>
                  </div>
                );
              }
            }
          )}
        {invoiceDetail?.data?.details?.result?.extra_info && (
          <UploadAdditionalInformation
            extractData={invoiceDetail?.data?.details}
          />
        )}
      </div>
      <InvoiceApprovers invoiceDetail={invoiceDetail?.data!} />

      {invoiceDetail?.data?.invoice_file && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-[650px]">
            <ImagePdfDsiplay invoice_file={invoiceDetail?.data?.invoice_file} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InvoiceDetails;

InvoiceDetails.getLayout = (page) => {
  return <MainLayout title="Invoice">{page}</MainLayout>;
};
