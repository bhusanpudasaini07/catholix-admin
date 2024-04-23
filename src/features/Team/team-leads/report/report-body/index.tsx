import { EChartsInstance } from "echarts-for-react";
import React from "react";

import {
  ILeadDetail,
  IProjectMarket,
  IProjectType,
} from "@/interface/team-leads-interface";
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
}: IProps) => {
  return (
    <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
      <div className="grid grid-cols-1 gap-4">
        <ReportOverall
          totalRP={totalRp}
          totalCommercialRp={totalCommercialRp}
          totalInhouseRP={totalInhouseRP}
          loading={loading}
        />
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
