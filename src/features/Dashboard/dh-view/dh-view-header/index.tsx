import React, { useState } from "react";

import CustomDateFilter from "@/shared/components/custom-date-filter";
import { DateRange } from "react-day-picker";
import { ComboBox } from "@/shared/components/ui/combobox";
import { useCommonStore } from "@/store/common-store";

interface IProps {
  dateRange: DateRange | undefined;
  setDateRange: (arg: DateRange | undefined) => void;
  setDepartmentHead: (arg: string) => void;
  departmentHead: string;
}

const DashboardDHHeader = ({
  dateRange,
  setDateRange,
  departmentHead,
  setDepartmentHead,
}: IProps) => {
  const { filterConfig } = useCommonStore();
  return (
    <div className="flex justify-between items-end px-8 py-6 border-b bg-light-white border-b-slate-100">
      <div>
        <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
          Department Head Dashboard
        </h1>
        <p className="text-base text-zinc-500">
          Welcome back! Gain valuable insights and manage the department
          operations efficiently.
        </p>
      </div>

      <div className="flex gap-4 justify-end items-center grow">
        <div className="w-[250px]">
          <ComboBox
            selectables={
              filterConfig?.team_leads?.map((lead: any) => ({
                value: lead?.username,
                title: lead?.fullname,
              })) ?? []
            }
            setValue={setDepartmentHead}
            value={departmentHead}
            module="DH"
          />
        </div>
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
