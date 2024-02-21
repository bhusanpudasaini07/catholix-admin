import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import ReactECharts from "echarts-for-react";
import { ILeadDetail } from "@/interface/team-leads-interface";

import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { DownloadCloud } from "lucide-react";

interface IProps {
  columns: ColumnDef<ILeadDetail>[];
  data: any;
  loading: boolean;
  countryOptions: any;
  rpOptions: any;
}

const ReportSummaryTable = ({
  columns,
  data,
  loading,
  countryOptions,
  rpOptions,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <p className="text-lg font-medium text-zinc-700">Team Lead</p>
          <Button variant={"success"} size={"sm"}>
            <DownloadCloud size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-12 2xl:col-span-8">
            <DataTable
              border={true}
              loading={loading}
              columns={columns}
              data={data ?? []}
            />
          </div>
          <div className="col-span-12 2xl:col-span-4">
            <ReactECharts option={rpOptions} />
            <ReactECharts option={rpOptions} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSummaryTable;
