import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import ReactECharts from "echarts-for-react";
import { ILeadDetail } from "@/interface/team-leads-interface";

import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { DownloadCloud } from "lucide-react";
import PieChartSkeleton from "@/shared/components/skeleton-loading/pie-chart-skeleton";
import { cn } from "@/shared/utils/utils";

interface IProps {
  columns: ColumnDef<ILeadDetail>[];
  data: any;
  loading: boolean;
  staffRPLoading: boolean;
  countryOptions: any;
  rpOptions: any;
  leadDetail: ILeadDetail | undefined;
}

const ReportSummaryTable = ({
  columns,
  data,
  loading,
  staffRPLoading,
  countryOptions,
  rpOptions,
  leadDetail,
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

        <div className="grid grid-cols-12 transition-all gap-7">
          <div className={cn("lg:col-span-8", "col-span-12 ")}>
            <DataTable
              border={true}
              loading={loading}
              columns={columns}
              data={data ?? []}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div className="mb-5">
              <p className="font-semibold text-zinc-700">Project Type</p>
              <ReactECharts
                option={rpOptions}
                notMerge={true}
                opts={{ renderer: "svg" }}
              />
              {/* )} */}
            </div>
            <div>
              <p className="font-semibold text-zinc-700">Project market</p>

              <ReactECharts
                option={countryOptions}
                opts={{ renderer: "svg" }}
              />
              {/* )} */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSummaryTable;
