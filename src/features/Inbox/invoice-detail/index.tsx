import React, { useState } from "react";
import InvoiceTable from "@/features/Invoice/details/invoice-table";
import UploadCustomerDetail from "@/features/Invoice/upload/customer-detail";
import UploadAdditionalInformation from "@/features/Invoice/upload/additional-information";
import { Button } from "@/shared/components/ui/button";
import { Eye } from "lucide-react";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import ImagePdfDsiplay from "@/features/Invoice/image-pdf-display";

const InboxInvoiceDetail = ({ invoiceDetail }: any) => {
  const [open, setOpen] = useState(false);

  const { client, ship_to } = invoiceDetail?.details?.result || {};
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

  return (
    <div className="relative mt-5">
      <div className="flex items-center justify-between p-6 pb-0 pt-0">
        <h5 className="text-4xl text-purple-60 font-bold">Invoice </h5>
        <Button
          onClick={() => setOpen(true)}
          variant={"ghost"}
          className="gap-3 text-primary text-xs"
        >
          <Eye />
          View Invoice
        </Button>
      </div>

      <div className="p-6 pb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
          {isShipToValid() && (
            <div>
              <h5 className="text-xl font-bold">Vendor :</h5>
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
                {invoiceDetail?.details?.result?.invoice?.invoice_number}
              </strong>
            </h4>
            <p className="text-gray-270 text-sm break-words">
              Date of issue :{" "}
              {invoiceDetail?.details?.result?.invoice?.invoice_date}
            </p>
            {invoiceDetail?.details?.result?.invoice?.due_date && (
              <p className="text-gray-270 text-sm break-words">
                Due Date : {invoiceDetail?.details?.result?.invoice?.due_date}
              </p>
            )}
            {invoiceDetail?.details?.result?.invoice?.order_number && (
              <p className="text-color text-sm break-words">
                Order Number :{" "}
                {invoiceDetail?.details?.result?.invoice?.order_number}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h5 className="text-xl font-bold">Client :</h5>
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
                <h5 className="text-xl font-bold">Ship to :</h5>
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
                <h5 className="text-xl font-bold">Vendor:</h5>
                <div className="mb-4">
                  <p className="text-color mb-1 break-words">
                    {invoiceDetail?.details?.result?.vendor?.name}
                  </p>
                  <p className="text-color text-sm break-words">
                    {invoiceDetail?.details?.result?.vendor?.address}
                  </p>
                  <p className="text-color text-sm mb-1 break-words">
                    {invoiceDetail?.details?.result?.vendor?.city}{" "}
                    {invoiceDetail?.details?.result?.vendor?.zip}
                  </p>
                </div>
                {invoiceDetail?.details?.result?.vendor?.voice && (
                  <p className="text-color mb-1 break-words">
                    Contact : {invoiceDetail?.details?.result?.vendor?.voice}
                  </p>
                )}
                {invoiceDetail?.details?.result?.vendor?.fax && (
                  <p className="text-color mb-1">
                    Fax : {invoiceDetail?.details?.result?.vendor?.fax}
                  </p>
                )}
                {invoiceDetail?.details?.result?.vendor?.email && (
                  <p className="text-color mb-1">
                    Email : {invoiceDetail?.details?.result?.vendor?.email}
                  </p>
                )}
                {invoiceDetail?.details?.result?.vendor?.tax_id && (
                  <p className="text-color mb-1">
                    Tax ID : {invoiceDetail?.details?.result?.vendor?.tax_id}
                  </p>
                )}
                {invoiceDetail?.details?.result?.vendor?.iban && (
                  <p className="text-color mb-1">
                    IBAN : {invoiceDetail?.details?.result?.vendor?.iban}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        {invoiceDetail?.details?.result?.customer_details &&
          Object.values(invoiceDetail?.details?.result?.customer_details).some(
            (value) => value !== null && value !== ""
          ) && <UploadCustomerDetail extractData={invoiceDetail?.details} />}
      </div>

      <InvoiceTable invoiceDetail={invoiceDetail} />
      <div className="p-6 flex flex-col gap-4">
        {invoiceDetail?.details?.result?.extra_info && (
          <UploadAdditionalInformation extractData={invoiceDetail?.details} />
        )}
        <div>
          <h6 className="text-base text-black font-medium mb-4">Notes</h6>
          <div className="border rounded-md p-4 bg-gray-250 min-h-[150px]">
            <p className="text-color font-semibold text-sm">
              {invoiceDetail?.note ? invoiceDetail?.note : "No Notes."}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex flex-col items-end">
            {invoiceDetail?.details?.result?.summary &&
              Object.entries(invoiceDetail?.details?.result?.summary).map(
                ([key, value]) => {
                  if (
                    key !== "total" &&
                    key !== "total_amount_in_words" &&
                    key !== "amount_in_words" &&
                    value != ""
                  ) {
                    return (
                      <div className="flex items-start gap-3 mb-3" key={key}>
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
                        <p className="text-black min-w-[200px] max-w-[200px] text-end text-lg break-all font-medium">
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
                {invoiceDetail?.details?.result?.summary?.total ??
                  invoiceDetail?.details?.result?.summary?.total_invoice_amount}
              </p>
            </div>
          </div>
        </div>
        {invoiceDetail?.details?.result?.summary &&
          Object.entries(invoiceDetail?.details?.result?.summary).map(
            ([key, value]) => {
              if (key == "total_amount_in_words" || key == "amount_in_words") {
                return (
                  <div
                    className="flex items-baseline gap-3 mb-3 border-t pt-2"
                    key={key}
                  >
                    <p className="text-sm whitespace-nowrap text-start text-black/50 ">
                      {key
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}{" "}
                      :
                    </p>
                    <p className="text-black text-lg break-words font-medium">
                      {value?.toString()}
                    </p>
                  </div>
                );
              }
            }
          )}
      </div>

      {/* Image */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[650px]">
          {invoiceDetail?.invoice_file && (
            <ImagePdfDsiplay invoice_file={invoiceDetail?.invoice_file} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InboxInvoiceDetail;
