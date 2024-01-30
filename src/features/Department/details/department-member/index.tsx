import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { IDepartmentDetail } from "@/interface/department-interface";
import { Button } from "@/shared/components/ui/button";

interface IDepartmentDetailProps {
  departmentDetails: IDepartmentDetail;
}

const DepartmentMembers = ({ departmentDetails }: IDepartmentDetailProps) => {
  return (
    <Card className="p-6 bg-purple-70 border-purple-80">
      <CardContent className="p-0">
        <h5 className="mb-3 text-2xl font-medium text-color">
          Department Members (
          {departmentDetails?.department_members?.length ?? 0})
        </h5>
        <div className="flex flex-wrap mt-8 gap-x-10 gap-y-7">
          {departmentDetails?.department_members?.length > 0
            ? departmentDetails?.department_members?.map((member) => (
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

export default DepartmentMembers;
