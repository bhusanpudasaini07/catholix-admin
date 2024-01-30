import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";

import { IDepartmentDetail } from "@/interface/department-interface";

interface IDepartmentProps {
  departmentDetails: IDepartmentDetail;
}
const DepartmentDetailCard = ({ departmentDetails }: IDepartmentProps) => {
  return (
    <Card className="p-8">
      <CardContent className="flex flex-col p-0">
        {/* Project Details */}
        <h5 className="mb-3 text-2xl font-medium text-color">
          Department Details
        </h5>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Department Name :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {departmentDetails?.name}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Department Code :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {departmentDetails?.code}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Department Head :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {departmentDetails?.department_head
                ? departmentDetails?.department_head
                : "-"}
            </p>
          </div>
          {/* <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Description :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {projectDetails?.description ? projectDetails.description : "-"}
            </p>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentDetailCard;
