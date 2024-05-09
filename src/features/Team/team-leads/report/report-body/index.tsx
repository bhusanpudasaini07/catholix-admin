import ReactEcharts, {
  EChartsInstance,
  EChartsOption,
} from "echarts-for-react";
import React from "react";

import {
  ILeadDetail,
  IProjectMarket,
  IProjectType,
} from "@/interface/team-leads-interface";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";

import ReportOverall from "./report-overall";
import ReportSummaryTable from "./report-table";

interface IProps {
  columns: ColumnDef<ILeadDetail>[];
  data: any;
  loading: boolean;
  totalRp: number;
  totalCommercialRp: number;
  totalInhouseRP: number;
  rpOptions: any;
  countryOptions: any;
  staffRPLoading: boolean;
  leadDetail: ILeadDetail | undefined;
  rpChartRef: EChartsInstance;
  countryChartRef: EChartsInstance;
  leadId: string;
  projectTypeColumn: ColumnDef<IProjectType>[];
  projectMarketColumn: ColumnDef<IProjectMarket>[];
  countryProjectData: IProjectMarket[];
  projectTypeData: IProjectType[];
  budgetUtilizationOption: EChartsOption;
}

const ReportSummaryBody = ({
  columns,
  data,
  loading,
  totalRp,
  totalCommercialRp,
  totalInhouseRP,
  rpOptions,
  countryOptions,
  staffRPLoading,
  rpChartRef,
  countryChartRef,
  leadId,
  projectTypeColumn,
  projectMarketColumn,
  countryProjectData,
  projectTypeData,
  budgetUtilizationOption,
}: IProps) => {
  return (
    <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <ReportOverall
            totalRP={totalRp}
            totalCommercialRp={totalCommercialRp}
            totalInhouseRP={totalInhouseRP}
            loading={loading}
          />
          <Card>
            <CardContent>
              <div className="flex justify-between items-center mb-10">
                <p className="text-lg font-medium text-zinc-700">
                  Department Budget Utilization
                </p>
              </div>
              <ReactEcharts
                option={budgetUtilizationOption}
                opts={{ renderer: "svg" }}
                style={{ height: 200 }}
              />
            </CardContent>
          </Card>
        </div>
        <ReportSummaryTable
          rpOptions={rpOptions}
          countryOptions={countryOptions}
          columns={columns}
          data={data}
          loading={loading}
          staffRPLoading={staffRPLoading}
          rpChartRef={rpChartRef}
          leadId={leadId}
          countryChartRef={countryChartRef}
          projectTypeColumn={projectTypeColumn}
          projectMarketColumn={projectMarketColumn}
          countryProjectData={countryProjectData}
          projectTypeData={projectTypeData}
        />
      </div>
    </div>
  );
};

export default ReportSummaryBody;
