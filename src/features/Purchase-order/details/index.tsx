import React from "react";
import { format } from "date-fns";

import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";

import { IPurchaseOrderDetail } from "@/interface/purchase-order-interface";

interface IProps {
  purchaseDetails: IPurchaseOrderDetail;
}

const PurchaseDetailCard = ({ purchaseDetails }: IProps) => {
  return (
    <Card className="p-8">
      <CardContent className="flex flex-col p-0">
        {/* Purchase Order Details */}
        <h5 className="mb-3 text-2xl font-medium text-color">
          Purchase Order Details
        </h5>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Vendor Name :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {purchaseDetails?.vendor_name ?? "-"}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              PO Number :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {purchaseDetails?.po_number ?? "-"}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              PO Amount :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {purchaseDetails?.po_amount ?? "-"}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              PO Received Date :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {purchaseDetails?.po_received_date
                ? format(new Date(purchaseDetails?.po_received_date), "PPP")
                : "-"}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              PO Net :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {purchaseDetails?.po_net ?? "-"}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              PO Status :
            </p>
            <Badge
              className={`${
                purchaseDetails?.is_synced
                  ? "bg-[#C3F8DA] text-[#349D62]"
                  : "bg-[#FBE19F] text-[#DC9E00]"
              }  capitalize border-none`}
            >
              {purchaseDetails?.is_synced ? "Synced" : "Unsynced"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseDetailCard;
