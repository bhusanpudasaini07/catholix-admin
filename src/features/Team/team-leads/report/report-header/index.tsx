import DateRangeFilter from "@/shared/components/date-range-filter";
import React from "react";

interface IProps {
  dateRange: any;
  setDateRange: any;
  dateRangeOpen: boolean;
  setDateRangeOpen: (arg: boolean) => void;
}

const ReportSummaryHeader = ({
  dateRange,
  setDateRange,
  dateRangeOpen,
  setDateRangeOpen,
}: IProps) => {
  return (
    <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-b-slate-100">
      <div>
        <h4 className="flex items-center gap-2 mb-1 text-2xl font-medium text-zinc-700">
          Team Lead Summary Report
        </h4>
        <p className="text-base font-normal text-zinc-500">List of reports</p>
      </div>

      <div className="grow max-w-[250px] ml-auto">
        <DateRangeFilter
          dateRange={dateRange}
          setDateRange={setDateRange}
          setDateRangeOpen={setDateRangeOpen}
          dateRangeOpen={dateRangeOpen}
        />
      </div>
    </div>
  );
};

export default ReportSummaryHeader;
