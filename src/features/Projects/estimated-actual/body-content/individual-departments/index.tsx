import ReactEcharts, { EChartsInstance } from "echarts-for-react";
import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  option: EChartsInstance;
  column: ColumnDef<any>[];
}

const EstimatedActualDepartmentWise = ({ option, column }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-9">
          <p className="text-lg font-medium text-zinc-700">Node Developer</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <ReactEcharts option={option} />
          </div>

          <DataTable columns={column} data={[]} border total={[]} />
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimatedActualDepartmentWise;
