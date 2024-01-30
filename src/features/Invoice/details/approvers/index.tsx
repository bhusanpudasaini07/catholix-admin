import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { IInvoiceDetails } from "@/interface/invoice-interface";

interface IInvoiceDetailProps {
  invoiceDetail: IInvoiceDetails;
}

const InvoiceApprovers = ({ invoiceDetail }: IInvoiceDetailProps) => {
  return (
    <Card className="p-6 bg-purple-70 border-purple-80">
      <CardContent className="p-0">
        <h5 className="mb-3 text-2xl font-medium text-color">
          Invoice Approvers ({invoiceDetail?.approval_members.length})
        </h5>

        <div className="flex flex-wrap mt-8 gap-x-10 gap-y-7">
          {invoiceDetail?.approval_members.length > 0
            ? invoiceDetail?.approval_members.map((member) => (
                <div className="flex items-center gap-4" key={member?.email}>
                  <Button type="button" className="w-[48px] h-[48px]">
                    {member?.first_name[0]}
                    {member?.last_name[0]}
                  </Button>
                  <p>
                    {member?.first_name} {member?.last_name}
                  </p>
                </div>
              ))
            : "No Members found"}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceApprovers;
