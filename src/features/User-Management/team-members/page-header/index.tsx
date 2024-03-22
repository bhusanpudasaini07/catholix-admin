import React from "react";
import ListCardFilter from "../page-body/header-filter";
import { DateRange } from "react-day-picker";

interface IProps {
  setDateRangeOpen: (arg: boolean) => void;
  dateRangeOpen: boolean;
  dateRange: DateRange | undefined;
  dateChangeHandler: (arg: DateRange) => void;
  setSearchText: (arg: string) => void;
  setDepartment: (arg: string) => void;
  department: string;
}

const TeamMemberPageHeader = ({
  setDateRangeOpen,
  dateRangeOpen,
  dateRange,
  dateChangeHandler,
  setSearchText,
  setDepartment,
  department,
}: IProps) => {
  return (
    <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-b-slate-100">
      <div>
        <h4 className="flex items-center gap-2 mb-1 text-2xl font-medium text-zinc-700">
          Team Member List
        </h4>
        <p className="text-base font-normal text-zinc-500">
          List of individual members
        </p>
      </div>
      <ListCardFilter
        setDateRangeOpen={setDateRangeOpen}
        dateRangeOpen={dateRangeOpen}
        dateRange={dateRange}
        dateChangeHandler={dateChangeHandler}
        setSearchText={setSearchText}
        setDepartment={setDepartment}
        department={department}
      />
    </div>
  );
};

export default TeamMemberPageHeader;
