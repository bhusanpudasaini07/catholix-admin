import React, { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { IVendorDetails } from "@/interface/vendor-interface";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import ImagePdfDsiplay from "@/features/Invoice/image-pdf-display";

export interface IVendorInfoProps {
  vendorDetail: IVendorDetails;
}

const VendorsInformation = ({ vendorDetail }: IVendorInfoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="p-8">
        <CardContent className="flex flex-col gap-8 p-0">
          {/* Vendors Basic */}
          <div>
            <h5 className="mb-3 text-2xl font-medium text-color">
              Vendor Basics
            </h5>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Vendor Name :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.name}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Vendor Id :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.vendor_id}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Primary Contact Email :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.primary_email}
                </p>
              </div>

              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Account Number :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.account_number
                    ? vendorDetail?.account_number
                    : "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Vendor Address */}
          <div>
            <h5 className="mb-3 text-2xl font-medium text-color">
              Vendor Address
            </h5>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Country :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.country ? vendorDetail?.country : "-"}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  City :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.city ? vendorDetail?.city : "-"}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Address Line 1 :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.address_line_1
                    ? vendorDetail?.address_line_1
                    : "-"}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Address Line 2 :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.address_line_2
                    ? vendorDetail?.address_line_2
                    : "-"}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  State/Province :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.state ? vendorDetail?.state : "-"}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Zip Postal Code :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.zip_code ? vendorDetail?.zip_code : "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h5 className="mb-3 text-2xl font-medium text-color">Contacts</h5>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  First Name :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.contact_person_first_name
                    ? vendorDetail?.contact_person_first_name
                    : "-"}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Last Name :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.contact_person_last_name
                    ? vendorDetail?.contact_person_last_name
                    : "-"}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Email ID :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.contact_person_email
                    ? vendorDetail?.contact_person_email
                    : "-"}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Contact Number :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.contact_person_phone_number
                    ? vendorDetail?.contact_person_phone_number
                    : "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h5 className="mb-3 text-2xl font-medium text-color">
              Additional Information
            </h5>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Vendor Description :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.description ? vendorDetail?.description : "-"}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  TAX ID :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.tax_id ? vendorDetail?.tax_id : "-"}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  TAX Clearance File :
                </p>
                {vendorDetail?.tax_clearance_file ? (
                  <Button
                    onClick={() => setOpen(true)}
                    variant={"ghost"}
                    type="button"
                    className="gap-3 text-primary text-xs"
                  >
                    <Eye />
                    View File
                  </Button>
                ) : (
                  "-"
                )}
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Vendor Since :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.vendor_since
                    ? format(new Date(vendorDetail?.vendor_since), "PPP")
                    : "-"}
                </p>
              </div>
              <div className="flex items-start gap-16">
                <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
                  Joined Date :
                </p>
                <p className="text-sm font-medium leading-8 text-color break-all">
                  {vendorDetail?.join_date
                    ? format(new Date(vendorDetail?.join_date), "PPP")
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[650px]">
          <ImagePdfDsiplay invoice_file={vendorDetail?.tax_clearance_file} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VendorsInformation;
