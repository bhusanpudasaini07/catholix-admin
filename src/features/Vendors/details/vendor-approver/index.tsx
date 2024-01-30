import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

const VendorApprovers = () => {
  return (
    <Card className="p-6 bg-purple-70 border-purple-80">
      <CardContent className="p-0">
        <h5 className="mb-3 text-2xl font-medium text-color">Approvers (2)</h5>
        <p className="text-base text-black/70">Invoice Approval List</p>
        <div className="flex flex-wrap mt-8 gap-x-10 gap-y-7">
          <div className="flex items-center gap-4">
            <Button className="w-[48px] h-[48px]">AK</Button>
            <p>Anisha Khadgi</p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="w-[48px] h-[48px]">SK</Button>
            <p>Anisha Khadgi</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorApprovers;
