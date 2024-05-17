import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface IProps {
  column: ColumnDef<any>[];
  loading: boolean;
}

const ProjectDashboardTimeLog = ({ column, loading }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-7">
          <p className="text-lg font-medium text-zinc-700">
            Member Time-log & Task Summary
          </p>
        </div>

        <DataTable
          data={[]}
          columns={column}
          border
          headerSticky
          loading={loading}
          loadingDataNum={10}
          height="max-h-[400px]"
        />
      </CardContent>
    </Card>
  );
};

export default ProjectDashboardTimeLog;
