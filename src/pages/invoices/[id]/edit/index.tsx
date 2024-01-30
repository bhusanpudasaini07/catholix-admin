import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NextPageWithLayout } from "@/pages/_app";
import { zodResolver } from "@hookform/resolvers/zod";

import MainLayout from "@/shared/main-layout";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";

import EditInvoiceForm from "@/features/Invoice/edit-form";
import {
  getInvoiceDetail,
  updateInvoice,
} from "@/services/invoice/invoice-service";

import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { InvoiceSchema } from "@/schema/invoice-schema/invoice-schema";
import ImagePdfDsiplay from "@/features/Invoice/image-pdf-display";

const EditInvoice: NextPageWithLayout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // STATES
  const [selected, setSelected] = useState<
    { value: string; label: string; image: string; email: string }[]
  >([]);
  const [projectId, setProjectId] = useState("");
  const [vendorId, setVendorId] = useState("");

  //to populate the fields
  const { data: invoiceDetail, isLoading } = useQuery({
    queryKey: ["invoiceDetail", router?.query?.id],
    queryFn: async () => {
      if (router?.query?.id) {
        const response = await getInvoiceDetail(router?.query?.id);
        return response;
      }
    },
  });

  /**
   * Setting dynamic data coming from api in details key.
   */
  const [apiData, setApiData] = useState<any>();

  // FUNCTIONS

  const form = useForm({
    resolver: zodResolver(InvoiceSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  /**
   * Update invoice mutation function
   */
  const updateInvoiceMutation = useMutation({
    mutationFn: (data) => updateInvoice(router?.query?.id, data),
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      queryClient.invalidateQueries(["invoiceList"]);
      router.push("/invoices");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const onSubmit: SubmitHandler<any> = (data) => {
    const { image, ...restApiData } = apiData;
    const payload: any = {
      additional_data: JSON.stringify({
        project_id: data?.project_id,
        vendor_id: invoiceDetail?.data?.vendor_id,
        approval_member: selected.map((member) => member.email),
        notes: data?.note,
        invoice_number: apiData?.result?.invoice?.invoice_number,
        total_amount: apiData?.result?.summary?.total?.replace(
          /[^0-9.-]+/g,
          ""
        ),
        bill_date: apiData?.result?.invoice?.invoice_date,
      }),
      detail_data: JSON.stringify({
        ...restApiData,
      }),
    };
    updateInvoiceMutation.mutate(payload);
  };
  // EFFECTS
  useEffect(() => {
    if (invoiceDetail?.data) {
      /**
       * Setting default datas coming from api into form
       */
      form.reset({
        project_id: invoiceDetail?.data?.project_id,
        note: invoiceDetail?.data?.note,
        vendor_id: invoiceDetail?.data?.vendor_id,
      });
      setVendorId(invoiceDetail?.data?.vendor_id);
      setProjectId(invoiceDetail?.data?.project_id);
      setApiData(invoiceDetail?.data?.details);
      setSelected(invoiceDetail?.data?.approval_members);
    }

    //not enabling edit if status is approved
    if (invoiceDetail?.data?.status === "approved") {
      router.push("/invoices");
    }
  }, [invoiceDetail]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-color font-bold text-4xl">Update Invoice </h2>
          <div className="flex items-center gap-6">
            <Link
              className="w-[135px] h-auto leading-none text-center py-3.5 text-sm rounded-lg inline bg-white border border-purple-60 text-purple-60  hover:bg-purple-60 hover:text-white"
              href={"/invoices"}
            >
              Close
            </Link>
            <Button size={"lg"}>Update</Button>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-6 border">
          <div className="col-span-12 lg:col-span-4 border-b lg:border-r">
            {invoiceDetail?.data?.invoice_file && (
              <ImagePdfDsiplay
                invoice_file={invoiceDetail?.data?.invoice_file}
              />
            )}
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="relative lg:h-[calc(100vh-210px)] overflow-y-scroll">
              <div className="flex items-center justify-between p-6 pb-0">
                <h5 className="text-4xl text-purple-60 font-bold">Invoice</h5>
              </div>

              <EditInvoiceForm
                selected={selected}
                setSelected={setSelected}
                form={form}
                invoiceDetail={invoiceDetail?.data}
                projectId={projectId}
                setProjectId={setProjectId}
                apiData={apiData}
                setApiData={setApiData}
                vendorId={vendorId}
                setVendorId={setVendorId}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditInvoice;

EditInvoice.getLayout = (page) => {
  return <MainLayout title="Invoice">{page}</MainLayout>;
};
