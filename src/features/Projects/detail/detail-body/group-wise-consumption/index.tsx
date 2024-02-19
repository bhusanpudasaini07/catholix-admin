import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import useConsumptionType from "@/hooks/project/detail/useConsumptionType.hook";
import useProjectRpSummary from "@/hooks/project/detail/useProjectRpSummary.hook";

const TeamConsumption = () => {
  const { roleGroupColumn, departmentGroupColumn } = useConsumptionType();
  const { rpSummary, rpLoading } = useProjectRpSummary();

  return (
    <div className="grid grid-cols-1 gap-6 mt-6 xl:grid-cols-2">
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center justify-start gap-3">
              <p>Role Group Wise Consumption</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-md grow">
            <DataTable
              border={true}
              columns={roleGroupColumn}
              loading={rpLoading}
              data={rpSummary?.data?.rolegroupwise ?? []}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center justify-start gap-3">
              <p>Department Group Wise Consumption</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-md grow">
            <DataTable
              border={true}
              columns={departmentGroupColumn}
              data={rpSummary?.data?.departmentgroupwise ?? []}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamConsumption;
