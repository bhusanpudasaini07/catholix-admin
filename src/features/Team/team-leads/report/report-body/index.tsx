import React from "react";
import ReportOverall from "./report-overall";
import ReportSummaryTable from "./report-table";
import { ColumnDef } from "@tanstack/react-table";
import { ILeadDetail } from "@/interface/team-leads-interface";

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
}: IProps) => {
  return (
    <div className="p-8 max-h-[calc(100vh-170px)] overflow-auto">
      <div className="grid grid-cols-1 gap-6">
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
        />
      </div>
    </div>
  );
};

export default ReportSummaryBody;
