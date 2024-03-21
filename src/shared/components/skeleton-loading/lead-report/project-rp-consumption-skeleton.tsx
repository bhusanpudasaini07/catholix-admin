import React from "react";

import { ICountryProjectDetails } from "@/interface/team-lead-report-interface";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../../data-table/data-table";
import { Card, CardContent } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

interface IProps {
  column: ColumnDef<ICountryProjectDetails>[];
}

const ProjectRPConsumptionSkeleton = ({ column }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <Skeleton className="w-20 h-3" />
        </div>
        <DataTable
          columns={column}
          data={[]}
          loading={true}
          loadingDataNum={5}
          headerSticky
          border
        />
      </CardContent>
    </Card>
  );
};

export default ProjectRPConsumptionSkeleton;
