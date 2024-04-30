import ReactECharts, { EChartsInstance } from "echarts-for-react";
import { DownloadCloud } from "lucide-react";
import React from "react";

import {
  ILeadDetail,
  IProjectMarket,
  IProjectType,
} from "@/interface/team-leads-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  columns: ColumnDef<ILeadDetail>[];
  data: any;
  loading: boolean;
  staffRPLoading: boolean;
  countryOptions: any;
  rpOptions: any;
  rpChartRef: EChartsInstance;
  countryChartRef: EChartsInstance;
  leadId: string;
  projectTypeColumn: ColumnDef<IProjectType>[];
  projectMarketColumn: ColumnDef<IProjectMarket>[];
  countryProjectData: IProjectMarket[];
  projectTypeData: IProjectType[];
}

const ReportSummaryTable = ({
  columns,
  data,
  loading,
  countryOptions,
  rpOptions,
  rpChartRef,
  countryChartRef,
  projectTypeColumn,
  projectMarketColumn,
  countryProjectData,
  projectTypeData,
  staffRPLoading,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">Department Lead</p>
          <Button variant={"success"} size={"sm"}>
            <DownloadCloud size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-7 transition-all">
          <div className="col-span-12 lg:col-span-6">
            <DataTable
              border={true}
              loading={loading}
              columns={columns}
              data={data ?? []}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="mb-5">
              <p className="mb-6 font-semibold text-zinc-700">Project Type</p>
              <div className="grid grid-cols-3">
                <ReactECharts
                  option={rpOptions}
                  notMerge={true}
                  ref={rpChartRef}
                  style={{ height: 250 }}
                  opts={{ renderer: "svg" }}
                />
                <div className="col-span-2">
                  <DataTable
                    border
                    columns={projectTypeColumn}
                    loading={loading}
                    data={projectTypeData}
                    headerSticky
                    height="max-h-[272px]"
                    lottieWidth={0.1}
                  />
                </div>
              </div>

              {/* )} */}
            </div>
            <div>
              <p className="mb-6 font-semibold text-zinc-700">Project Market</p>
              <div className="grid grid-cols-3">
                <ReactECharts
                  option={countryOptions}
                  opts={{ renderer: "svg" }}
                  ref={countryChartRef}
                  style={{ height: 250 }}
                />
                <div className="col-span-2">
                  <DataTable
                    border
                    columns={projectMarketColumn}
                    loading={staffRPLoading}
                    data={countryProjectData}
                    headerSticky
                    height="max-h-[272px]"
                    lottieWidth={0.1}
                  />
                </div>
              </div>

              {/* )} */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSummaryTable;
