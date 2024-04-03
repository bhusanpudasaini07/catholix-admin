import React from "react";
import { DateRange } from "react-day-picker";

import DateRangeFilter from "@/shared/components/date-range-filter";

interface IProps {
  dateRangeOpen: boolean;
  setDateRangeOpen: (arg: boolean) => void;
  changeDate: (arg: DateRange) => void;
  date: DateRange;
}

const MarketHeader = ({
  dateRangeOpen,
  setDateRangeOpen,
  changeDate,
  date,
}: IProps) => {
  return (
    <div className="flex justify-between items-center px-8 py-6 bg-white border-b border-b-slate-100">
      <div>
        <h4 className="flex gap-2 items-center mb-1 text-2xl font-medium text-zinc-700">
          Market Analysis
        </h4>
        <p className="text-base font-normal text-zinc-500">
          Get overview of the market insights
        </p>
      </div>

      <DateRangeFilter
        buttonClassName="max-w-[280px]"
        setDateRange={changeDate}
        dateRange={date}
        setDateRangeOpen={setDateRangeOpen}
        dateRangeOpen={dateRangeOpen}
        disabled
      />
    </div>
  );
};

export default MarketHeader;
