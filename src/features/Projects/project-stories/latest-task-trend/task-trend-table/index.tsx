import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  data: any;
  column: ColumnDef<any>[];
  loading: boolean;
}
const TaskTrendTable = ({ data, column, loading }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-4 justify-start items-center mb-6">
          <p className="text-lg font-medium text-zinc-700">
            Task Completion History
          </p>
        </div>

        <DataTable
          data={data}
          columns={column}
          loading={loading}
          loadingDataNum={10}
          border
        />
      </CardContent>
    </Card>
  );
};

export default TaskTrendTable;
