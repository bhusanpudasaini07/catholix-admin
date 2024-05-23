import React, { useState } from "react";

import CustomDateFilter from "@/shared/components/custom-date-filter";
import { DateRange } from "react-day-picker";

interface IProps {
  dateRange: DateRange | undefined;
  setDateRange: (arg: DateRange | undefined) => void;
}

const DashboardDHHeader = ({ dateRange, setDateRange }: IProps) => {
  return (
    <div className="flex justify-between items-end px-8 py-6 border-b bg-light-white border-b-slate-100">
      <div>
        <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
          Department Head Dashboard
        </h1>
        <p className="text-base text-zinc-500">
          Welcome back, get insights and overview of all the activities.
        </p>
      </div>

      <div className="flex gap-4 justify-end items-center grow">
        <CustomDateFilter
          tabContent={["date_range", "weekly", "monthly", "yearly"]}
          defaultSelected="date_range"
          date={dateRange}
          setDate={setDateRange}
        />
      </div>
    </div>
  );
};

export default DashboardDHHeader;
