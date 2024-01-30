import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";
import { IVendorInfoProps } from "../vendor-info";

const VendorsBankDetails = ({ vendorDetail }: IVendorInfoProps) => {

  return (
    <Card className="p-8">
      <CardContent className="flex flex-col gap-8 p-0">
        <h5 className="mb-3 text-2xl font-medium text-color">Bank Details</h5>
        <div className="grid grid-cols-12 gap-4">
          {vendorDetail?.bank_details?.map((bank, index) => (
            <div className="col-span-4" key={index}>
              <Card className="p-4">
                <CardContent className="flex flex-col gap-2 p-0">
                  <h5 className="text-lg font-medium text-color">
                    {bank.name}
                  </h5>
                  <p className="text-xs text-gray-270">
                    Branch : {bank?.branch}
                  </p>
                  <p className="text-sm text-color">
                    Acc : {bank?.account_number}
                  </p>
                  <p className="text-sm text-color">
                    Contact : {bank?.bank_contact_number}
                  </p>
                  {/* <Badge className="inline rounded-sm w-fit">Completed</Badge> */}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorsBankDetails;
