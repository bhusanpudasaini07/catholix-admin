import { IBurndownDate } from "@/interface/project-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface IProps {
  columns: ColumnDef<IBurndownDate>[];
  data: any;
  loading: boolean;
}

const ConsumptionListTable = ({ columns, data, loading }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-4 mb-10">
          <p className="text-lg font-medium text-zinc-700">
            RP Consumption List
          </p>
        </div>
        <DataTable
          columns={columns}
          data={data}
          border={true}
          loading={loading}
          headerSticky={true}
          height="max-h-[400px]"
        />
      </CardContent>
    </Card>
  );
};

export default ConsumptionListTable;
