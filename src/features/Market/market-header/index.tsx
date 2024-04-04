import React from "react";
import { DateRange } from "react-day-picker";

import DateRangeFilter from "@/shared/components/date-range-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useCommonStore } from "@/store/common-store";

interface IProps {
  dateRangeOpen: boolean;
  setDateRangeOpen: (arg: boolean) => void;
  changeDate: (arg: DateRange) => void;
  date: DateRange;
  sourceOption: string;
  setSourceOption: (arg: string) => void;
}

const MarketHeader = ({
  dateRangeOpen,
  setDateRangeOpen,
  changeDate,
  date,
  sourceOption,
  setSourceOption,
}: IProps) => {
  const { filterConfig } = useCommonStore();
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
      <div className="flex gap-4 justify-end grow">
        <Select
          defaultValue={sourceOption}
          onValueChange={(e) => setSourceOption(e)}
        >
          <SelectTrigger className="max-w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            {filterConfig?.project_sources?.map((item: string) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DateRangeFilter
          buttonClassName="max-w-[280px]"
          setDateRange={changeDate}
          dateRange={date}
          setDateRangeOpen={setDateRangeOpen}
          dateRangeOpen={dateRangeOpen}
          disabled
        />
      </div>
    </div>
  );
};

export default MarketHeader;
