import { IDepartmentDetail } from "@/interface/department-interface";
import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

interface IDepartmentProps {
  departmentDetails: IDepartmentDetail;
}

const SubDepartmentListCard = ({ departmentDetails }: IDepartmentProps) => {
  return (
    <Card className="p-8">
      <CardContent className="flex flex-col p-0">
        {/* Project Details */}
        <h5 className="mb-3 text-2xl font-medium text-color">
          Sub Departments ({departmentDetails?.sub_department_names?.length})
        </h5>
        <div>
          <div className="flex flex-col gap-2 border p-4 rounded-md">
            <p className="text-gray-270 text-xs uppercase font-semibold">
              Sub-departments Name
            </p>
            <div className="border rounded-md flex gap-2 p-2">
              {departmentDetails?.sub_department_names.map((item, index) => (
                <p
                  key={index}
                  className="border px-2 py-1 rounded-md text-xs font-medium text-color"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubDepartmentListCard;
