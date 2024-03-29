import DateRangeFilter from "@/shared/components/date-range-filter";
import React from "react";

const MarketHeader = () => {
  return (
    <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-b-slate-100">
      <div>
        <h4 className="flex items-center gap-2 mb-1 text-2xl font-medium text-zinc-700">
          Market Analysis
        </h4>
        <p className="text-base font-normal text-zinc-500">
          Get overview of the market insights
        </p>
      </div>

      <DateRangeFilter
        buttonClassName="max-w-[280px]"
        setDateRange={() => ""}
        dateRange={{}}
        setDateRangeOpen={() => ""}
        dateRangeOpen={false}
      />
    </div>
  );
};

export default MarketHeader;
