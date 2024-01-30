import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

import UploadInvoiceTable from "@/features/Invoice/upload/table";
import { useInvoiceStore } from "@/store/invoice-store";

import { Logo } from "@/shared/lib/image-config";
import { PlusCircle } from "lucide-react";
import { InvoiceSchema } from "@/schema/invoice-schema/invoice-schema";
import { addInvoice } from "@/services/invoice/invoice-service";

import UploadInvoiceProjects from "@/features/Invoice/upload/projects";
import UploadInvoiceMembers from "@/features/Invoice/upload/approval-members";
import UploadAdditionalInformation from "@/features/Invoice/upload/additional-information";
import UploadCustomerDetail from "@/features/Invoice/upload/customer-detail";

import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { addVendor, checkVendor } from "@/services/vendor/vendor-service";
import { Textarea } from "@/shared/components/ui/textarea";
import UploadVendor from "@/features/Invoice/upload/vendor-add";
import Magnifier from "react-magnifier";
import ImagePdfDsiplay from "@/features/Invoice/image-pdf-display";
import UploadFileDisplay from "@/features/Invoice/upload/upload-file-display";

const UploadInvoice: NextPageWithLayout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { extractData, uploadImage } = useInvoiceStore();

  const { client, ship_to } = extractData?.result || {};

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

  // STATES
  const [selected, setSelected] = useState<
    { value: string; label: string; image: string; email: string }[]
  >([]);
  const [projectId, setProjectId] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // FUNCTIONS
  const { data: vendorExist, isLoading } = useQuery({
    queryFn: () => checkVendor(extractData?.result?.vendor?.email),
    queryKey: ["vendorExist"],
    enabled: !!extractData?.result?.vendor?.email,
  });

  const form = useForm<any>({
    resolver: zodResolver(InvoiceSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const addInvoiceMutation = useMutation({
    mutationFn: addInvoice,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      queryClient.invalidateQueries(["invoiceList"]);
      setVendorId("");
      setProjectId("");
      setSelected([]);
      router.push("/invoices");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const onSubmit: SubmitHandler<any> = (data) => {
    const { image, ...restOfExtractData } = extractData;
    const payload = {
      additional_data: JSON.stringify({
        ...data,
        vendor_id: vendorId,
        approval_member: selected.map((member) => member.email),
        notes: data?.note,
        invoice_number: extractData?.result?.invoice?.invoice_number,
        total_amount: extractData?.result?.summary?.total?.replace(
          /[^0-9.-]+/g,
          ""
        ),
        bill_date: extractData?.result?.invoice?.invoice_date,
      }),

      detail_data: JSON.stringify({
        ...restOfExtractData,
      }),
      file: uploadImage,
    };
    addInvoiceMutation.mutate(payload);
  };
  // add vendor if the vendor is not in database
  const addVendorMutation = useMutation({
    mutationFn: addVendor,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      queryClient.invalidateQueries(["vendorExist"]);
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const vendorMutationHandler = () => {
    const payload = {
      name: extractData?.result?.vendor?.name,
      primary_email: extractData?.result?.vendor?.email,
      vendor_id: `ven_${Math.floor(10000 + Math.random() * 90000)}`,
    };
    setVendorId(payload?.vendor_id);

    addVendorMutation.mutate(payload);
  };

  // EFFECTS
  useEffect(() => {
    if (!extractData?.result?.items) {
      //Redirects to add page when refresh since the store will not have any data
      router.push("/invoices/add-invoice");
    }
  }, [extractData]);

  useEffect(() => {
    if (vendorExist) {
      setVendorId(vendorExist?.data?.id);
    }
  }, [vendorExist]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-color font-bold text-4xl">Upload Invoice</h2>
          <div className="flex items-center gap-6">
            <Link
              className="w-[135px] h-auto leading-none text-center py-3.5 text-sm rounded-lg inline bg-white border border-purple-60 text-purple-60  hover:bg-purple-60 hover:text-white"
              href={"/invoices"}
            >
              Close
            </Link>
            <Button
              size={"lg"}
              disabled={
                Object.entries(form?.formState?.errors).length !== 0 ||
                selected.length === 0 ||
                addInvoiceMutation?.isLoading
              }
            >
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 mt-6 border">
          <div className="col-span-12 lg:col-span-4 border-b lg:border-r">
            {uploadImage && <UploadFileDisplay invoice_file={uploadImage} />}
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="relative lg:h-[calc(100vh-210px)] overflow-y-scroll pt-4">
              <div className="flex items-center justify-between p-6 pb-0">
                <h5 className="text-4xl text-purple-60 font-bold">Invoice</h5>
              </div>

              <div className="p-6 pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
                  {isShipToValid() && (
                    <div>
                      <div className="flex items-center gap-4">
                        <h5 className="text-xl font-bold">Vendor</h5>
                        {/* random vendor id ven_random5digits */}
                        {!vendorExist && extractData?.result?.vendor?.email && (
                          <Button
                            type="button"
                            variant={"ghost"}
                            onClick={vendorMutationHandler}
                            className="text-primary flex items-center gap-1"
                          >
                            <PlusCircle />
                            Add to vendor list
                          </Button>
                        )}
                      </div>
                      <div className="mb-4">
                        <p className="text-color mb-1">
                          {extractData?.result?.vendor?.name}
                        </p>
                        <p className="text-color text-sm">
                          {extractData?.result?.vendor?.address}
                        </p>
                        <p className="text-color text-sm mb-1">
                          {extractData?.result?.vendor?.city}{" "}
                          {extractData?.result?.vendor?.zip}
                        </p>
                      </div>
                      {extractData?.result?.vendor?.voice && (
                        <p className="text-color mb-1">
                          Contact : {extractData?.result?.vendor?.voice}
                        </p>
                      )}
                      {extractData?.result?.vendor?.fax && (
                        <p className="text-color mb-1">
                          Fax : {extractData?.result?.vendor?.fax}
                        </p>
                      )}
                      {extractData?.result?.vendor?.email && (
                        <p className="text-color mb-1">
                          Email : {extractData?.result?.vendor?.email}
                        </p>
                      )}
                      {extractData?.result?.vendor?.tax_id && (
                        <p className="text-color mb-1">
                          Tax ID : {extractData?.result?.vendor?.tax_id}
                        </p>
                      )}
                      {extractData?.result?.vendor?.tax_id && (
                        <p className="text-color mb-1">
                          IBAN : {extractData?.result?.vendor?.iban}
                        </p>
                      )}
                      {extractData?.result?.vendor?.tax_id && (
                        <p className="text-color mb-1">
                          IBAN : {extractData?.result?.vendor?.iban}
                        </p>
                      )}
                    </div>
                  )}
                  <div className={isShipToValid() ? "text-end" : ""}>
                    <h4 className="text-xl font-medium mb-3 text-black">
                      Invoice no :{" "}
                      <strong>
                        {extractData?.result?.invoice?.invoice_number}
                      </strong>
                    </h4>
                    <p className="text-gray-270 text-sm">
                      Date of issue :{" "}
                      {extractData?.result?.invoice?.invoice_date}
                    </p>
                    {extractData?.result?.invoice?.due_date && (
                      <p className="text-gray-270 text-sm">
                        Due Date : {extractData?.result?.invoice?.due_date}
                      </p>
                    )}
                    {extractData?.result?.invoice?.order_number && (
                      <p className="text-color text-sm">
                        Order Number :{" "}
                        {extractData?.result?.invoice?.order_number}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
                  <div>
                    <h5 className="text-xl font-bold">Client</h5>
                    <div className="mb-4">
                      <p className="text-color mb-1">
                        {client?.company_name ?? client?.name}
                      </p>
                      <p className="text-color text-sm">{client?.address}</p>
                      <p className="text-color text-sm mb-1">
                        {client?.city} {client?.zip}
                      </p>
                    </div>
                    {client?.tax_id && (
                      <p className="text-color mb-1">
                        Tax ID : {client?.tax_id}
                      </p>
                    )}
                    {client?.iban && (
                      <p className="text-color">IBAN: {client?.iban}</p>
                    )}
                  </div>
                  <div className="text-end">
                    {isShipToValid() ? (
                      <div>
                        <h5 className="text-xl font-bold">Ship to</h5>
                        <div className="mb-4">
                          <p className="text-color mb-1">
                            {ship_to?.company_name}
                          </p>
                          <p className="text-color text-sm">
                            {ship_to?.address}
                          </p>
                          <p className="text-color text-sm mb-1">
                            {ship_to?.city} {ship_to?.zip}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-end gap-4">
                          {/* random vendor id ven_random5digits */}
                          {!vendorExist &&
                            extractData?.result?.vendor?.email && (
                              <Button
                                type="button"
                                variant={"ghost"}
                                onClick={vendorMutationHandler}
                                className="text-primary flex items-center gap-1"
                              >
                                <PlusCircle />
                                Add to vendor list
                              </Button>
                            )}

                          <h5 className="text-xl font-bold">Vendor</h5>
                        </div>
                        <div className="mb-4">
                          <p className="text-color mb-1">
                            {extractData?.result?.vendor?.name}
                          </p>
                          <p className="text-color text-sm">
                            {extractData?.result?.vendor?.address}
                          </p>
                          <p className="text-color text-sm mb-1">
                            {extractData?.result?.vendor?.city}{" "}
                            {extractData?.result?.vendor?.zip}
                          </p>
                        </div>
                        {extractData?.result?.vendor?.voice && (
                          <p className="text-color mb-1">
                            Contact : {extractData?.result?.vendor?.voice}
                          </p>
                        )}
                        {extractData?.result?.vendor?.fax && (
                          <p className="text-color mb-1">
                            Fax : {extractData?.result?.vendor?.fax}
                          </p>
                        )}
                        {extractData?.result?.vendor?.email && (
                          <p className="text-color mb-1">
                            Email : {extractData?.result?.vendor?.email}
                          </p>
                        )}
                        {extractData?.result?.vendor?.tax_id && (
                          <p className="text-color mb-1">
                            Tax ID : {extractData?.result?.vendor?.tax_id}
                          </p>
                        )}
                        {extractData?.result?.vendor?.iban && (
                          <p className="text-color mb-1">
                            IBAN : {extractData?.result?.vendor?.iban}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {extractData?.result?.customer_details &&
                  Object.values(extractData?.result?.customer_details).some(
                    (value) => value !== null && value !== ""
                  ) && <UploadCustomerDetail extractData={extractData} />}
              </div>

              <UploadInvoiceTable extractDetail={extractData?.result} />

              <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col items-end">
                  {extractData?.result?.summary &&
                    Object.entries(extractData?.result?.summary).map(
                      ([key, value]) => {
                        if (
                          key !== "total" &&
                          key !== "total_amount_in_words" &&
                          key !== "amount_in_words" &&
                          value != ""
                        ) {
                          return (
                            <div
                              className="flex items-start gap-3 mb-3"
                              key={key}
                            >
                              <p className="text-sm  text-start text-black/50">
                                {key
                                  .replace(/_/g, " ")
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" ")}{" "}
                                :
                              </p>
                              <p className="text-black min-w-[150px] max-w-[150px] text-end text-lg font-medium">
                                {value?.toString()}
                              </p>
                            </div>
                          );
                        }
                      }
                    )}

                  <div className="text-right">
                    <p className="text-sm text-black/50 mb-2">Invoice Total</p>
                    <p className="text-purple-60 text-4xl font-bold">
                      {extractData?.result?.summary?.total ??
                        extractData?.result?.summary?.total_invoice_amount}
                    </p>
                  </div>
                </div>
                {extractData?.result?.summary &&
                  Object.entries(extractData?.result?.summary).map(
                    ([key, value]) => {
                      if (
                        key == "total_amount_in_words" ||
                        key === "amount_in_words"
                      ) {
                        return (
                          <div
                            className="flex items-baseline gap-3 mb-3 border-t pt-2"
                            key={key}
                          >
                            <p className="text-sm whitespace-nowrap  text-start text-black/50 ">
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
                            <p className="text-black text-lg break-all font-medium">
                              {value?.toString()}
                            </p>
                          </div>
                        );
                      }
                    }
                  )}
                {extractData?.result?.extra_info && (
                  <UploadAdditionalInformation extractData={extractData} />
                )}
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Notes
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="placeholder:text-gray-270 text-color "
                          rows={6}
                          placeholder="Write a note"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* {!extractData?.result?.vendor?.email && ( */}
                  <UploadVendor
                    form={form}
                    vendorId={vendorId}
                    setVendorId={setVendorId}
                  />
                  {/* )} */}
                  <UploadInvoiceProjects
                    projectId={projectId}
                    setProjectId={setProjectId}
                    form={form}
                    setSelected={setSelected}
                  />
                </div>

                <UploadInvoiceMembers
                  projectId={projectId}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UploadInvoice;

UploadInvoice.getLayout = (page) => {
  return <MainLayout title="Invoice">{page}</MainLayout>;
};
