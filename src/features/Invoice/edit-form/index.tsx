import React from "react";
import { format } from "date-fns";

import { cn } from "@/shared/utils/utils";

import { PlusCircle } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Textarea } from "@/shared/components/ui/textarea";

import { IInvoiceDetails } from "@/interface/invoice-interface";
import UploadInvoiceProjects from "../upload/projects";
import UploadInvoiceMembers from "../upload/approval-members";
import InvoiceEditTable from "./edit-table";
import EditTotal from "./edit-total";
import EditInvoiceVendor from "./edit-vendor";
import EditInvoiceApiData from "./edit-invoice";
import EditInvoiceClient from "./edit-client";
import EditInvoiceShipTo from "./edit-ship-to";
import EditInvoiceCustomerDetail from "./edit-customer-detail";
import EditInvoiceAdditionalInfo from "./edit-additional-information";
import UploadVendor from "../upload/vendor-add";

interface IProps {
  form: any;
  selected: any;
  setSelected: (arg: any) => void;

  invoiceDetail: IInvoiceDetails;

  projectId: string;
  setProjectId: (arg: string) => void;

  apiData: any;
  setApiData: (arg: any) => void;

  vendorId: string;
  setVendorId: (arg: string) => void;
}

const EditInvoiceForm = ({
  form,
  selected,
  setSelected,
  invoiceDetail,
  projectId,
  setProjectId,
  apiData,
  setApiData,
  vendorId,
  setVendorId,
}: IProps) => {
  //FUNCTIONS

  const { ship_to } = apiData?.result || {};
  // condition to check if ship_to is available and does not have any key empty.
  const isShipToValid = () => {
    if (!ship_to || Object.keys(ship_to).length === 0) return false;

    for (let key in ship_to) {
      if (ship_to[key] === null || ship_to[key] === undefined) {
        return false;
      }
    }
    return true;
  };
  return (
    <>
      <div className="p-6 pb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {isShipToValid() && (
            <EditInvoiceVendor
              isShipToValid={isShipToValid}
              apiData={apiData}
              setApiData={setApiData}
            />
          )}
          <EditInvoiceApiData
            apiData={apiData}
            setApiData={setApiData}
            isShipToValid={isShipToValid}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          <EditInvoiceClient apiData={apiData} setApiData={setApiData} />
          <div className="text-end">
            {isShipToValid() ? (
              <EditInvoiceShipTo apiData={apiData} setApiData={setApiData} />
            ) : (
              <EditInvoiceVendor
                isShipToValid={isShipToValid}
                apiData={apiData}
                setApiData={setApiData}
              />
            )}
          </div>
        </div>
        {apiData?.result?.customer_details &&
          Object.values(apiData?.result?.customer_details).some(
            (value) => value !== null && value !== ""
          ) && (
            <EditInvoiceCustomerDetail
              apiData={apiData}
              setApiData={setApiData}
            />
          )}
      </div>

      <InvoiceEditTable apiData={apiData} setApiData={setApiData} />

      <div className="p-6 flex flex-col gap-4">
        <EditTotal apiData={apiData} setApiData={setApiData} />

        {apiData?.result?.extra_info && (
          <EditInvoiceAdditionalInfo
            apiData={apiData}
            setApiData={setApiData}
          />
        )}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-base font-medium">Notes</FormLabel>
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
          <UploadVendor
            form={form}
            vendorId={vendorId}
            setVendorId={setVendorId}
          />
          <div
            className={
              invoiceDetail?.status === "onprocess" ? "pointer-events-none" : ""
            }
          >
            <UploadInvoiceProjects
              projectId={projectId}
              setProjectId={setProjectId}
              setSelected={setSelected}
              form={form}
              disabled={invoiceDetail?.status === "onprocess"}
            />
          </div>
        </div>

        <UploadInvoiceMembers
          projectId={projectId}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </>
  );
};

export default EditInvoiceForm;
