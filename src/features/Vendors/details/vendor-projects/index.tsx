import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";
import { IVendorInfoProps } from "../vendor-info";

const VendorsProjects = ({ vendorDetail }: IVendorInfoProps) => {
  return (
    <Card className="p-8">
      <CardContent className="flex flex-col gap-8 p-0">
        <h5 className="mb-3 text-2xl font-medium text-color">
          Vendor Projects
        </h5>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <Card className="p-4">
              <CardContent className="flex flex-col gap-2 p-0">
                <h5 className="text-lg font-medium text-color">
                  Analytical Acuisitions
                </h5>
                <p className="text-sm text-color">Vendor: Marley Natural</p>
                <p className="text-sm text-color">No. of bill count: 8</p>
                <p className="text-xs text-gray-270">
                  Started December 19,2023
                </p>
                <Badge className="inline rounded-sm w-fit">Completed</Badge>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-4">
            <Card className="p-4">
              <CardContent className="flex flex-col gap-2 p-0">
                <h5 className="text-lg font-medium text-color">
                  Analytical Acuisitions
                </h5>
                <p className="text-sm text-color">Vendor: Marley Natural</p>
                <p className="text-sm text-color">No. of bill count: 8</p>
                <p className="text-xs text-gray-270">
                  Started December 19,2023
                </p>
                <Badge className="inline rounded-sm w-fit">Completed</Badge>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-4">
            <Card className="p-4">
              <CardContent className="flex flex-col gap-2 p-0">
                <h5 className="text-lg font-medium text-color">
                  Analytical Acuisitions
                </h5>
                <p className="text-sm text-color">Vendor: Marley Natural</p>
                <p className="text-sm text-color">No. of bill count: 8</p>
                <p className="text-xs text-gray-270">
                  Started December 19,2023
                </p>
                <Badge className="inline rounded-sm w-fit">Completed</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorsProjects;
