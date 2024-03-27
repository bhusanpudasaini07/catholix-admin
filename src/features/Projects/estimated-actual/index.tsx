import React from "react";
import EstimatedActualHeader from "./header";
import EstimatedActualOverall from "./body-content/overall";
import EstimatedActualDepartmentWise from "./body-content/individual-departments";
import OverallRoles from "./body-content/overall-roles";
import useEstimatedActual from "@/hooks/project/estimated-actual/useEstimatedActual.hook";

const EstimatedActualContent = () => {
  const { individualRoleColumn, groupByDepartment } = useEstimatedActual();
  return (
    <>
      <EstimatedActualHeader />

      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid gap-4 gird-cols-1">
          <EstimatedActualOverall />

          <OverallRoles />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {groupByDepartment?.map((department) => (
              <EstimatedActualDepartmentWise
                key={department?.department_title}
                departmentData={department}
                column={individualRoleColumn}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EstimatedActualContent;
