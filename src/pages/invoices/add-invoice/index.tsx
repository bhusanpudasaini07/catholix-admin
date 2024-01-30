import { NextPageWithLayout } from "@/pages/_app";
import { extractInvoice } from "@/services/invoice/invoice-service";
import DragDrop from "@/shared/components/drag-drop";
import { Button } from "@/shared/components/ui/button";
import { invoiceImg } from "@/shared/lib/image-config";
import MainLayout from "@/shared/main-layout";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useInvoiceStore } from "@/store/invoice-store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";

const InvoiceAdd: NextPageWithLayout = () => {
  const router = useRouter();
  const { setExtractData, setUploadImage } = useInvoiceStore();

  //   STATES
  const [file, setFile] = useState<any>(null);

  //   FUNCTIONS

  // Extract Mutation
  const extractMutation = useMutation({
    mutationFn: extractInvoice,
    onSuccess: (data) => {
      setExtractData({
        image: data?.image,
        result: JSON.parse(data?.result),
      });
      router.push("/invoices/upload-invoice");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.response?.data?.detail);
      setFile("");
    },
  });

  const uploadFile = () => {
    setUploadImage(file);
    const payload: any = {};
    if (file) {
      if (file?.type?.startsWith("image/")) {
        payload.image = file;
      } else if (file?.type === "application/pdf") {
        payload.pdf = file;
      }
    }
    extractMutation.mutate(payload);
  };

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-color font-bold text-4xl">Invoices</h2>
        <div className="flex items-center gap-6">
          <Link
            className="w-[135px] h-auto leading-none text-center py-3.5 text-sm rounded-lg inline bg-white border border-purple-60 text-purple-60  hover:bg-purple-60 hover:text-white"
            href={"/invoices"}
          >
            Close
          </Link>
        </div>
      </div>
      <div className="h-[calc(100vh-200px)] max-w-[300px] m-auto flex flex-col items-center justify-center gap-8">
        <h5 className="text-lg font-medium text-color">Upload a New Invoice</h5>

        <DragDrop module="" file={file} setFile={setFile}>
          <div className="border border-dashed rounded-2xl py-9 px-7 flex flex-col items-center justify-center text-center gap-6">
            <Image
              src={invoiceImg.upload}
              alt="Invoice Image"
              width={63}
              height={65}
            />
            <p className="text-sm font-medium">
              Have an invoice or supporting docs?
              <br />
              Drag and drop here,or
            </p>
            <p className="text-purple-60 underline text-sm font-bold">
              Browse your computer
            </p>
          </div>
        </DragDrop>
        <Button
          className="w-full"
          disabled={!file || extractMutation?.isLoading}
          onClick={uploadFile}
        >
          Upload
        </Button>
      </div>
    </>
  );
};

export default InvoiceAdd;

InvoiceAdd.getLayout = (page) => {
  return <MainLayout title="Invoice">{page}</MainLayout>;
};
