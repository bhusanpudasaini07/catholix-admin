import React from "react";
import ListCardFilter from "../page-body/header-filter";
import { DateRange } from "react-day-picker";

interface IProps {
  setDateRangeOpen: (arg: boolean) => void;
  dateRangeOpen: boolean;
  dateRange: DateRange | undefined;
  dateChangeHandler: (arg: DateRange | undefined) => void;
  searchHandler: (arg: string) => void;
  setDepartment: (arg: string) => void;
  department: string;
  searchText: string;
}

const TeamMemberPageHeader = ({
  setDateRangeOpen,
  dateRangeOpen,
  dateRange,
  dateChangeHandler,
  searchHandler,
  setDepartment,
  department,
  searchText,
}: IProps) => {
  return (
    <div className="flex justify-between items-center px-8 py-6 bg-white border-b border-b-slate-100">
      <div>
        <h4 className="flex gap-2 items-center mb-1 text-2xl font-medium text-zinc-700">
          Team Member List
        </h4>
        <p className="text-base font-normal text-zinc-500">
          List of individual members
        </p>
      </div>
      <ListCardFilter
        searchText={searchText}
        setDateRangeOpen={setDateRangeOpen}
        dateRangeOpen={dateRangeOpen}
        dateRange={dateRange}
        dateChangeHandler={dateChangeHandler}
        setSearchText={searchHandler}
        setDepartment={setDepartment}
        department={department}
      />
    </div>
  );
};

export default TeamMemberPageHeader;
