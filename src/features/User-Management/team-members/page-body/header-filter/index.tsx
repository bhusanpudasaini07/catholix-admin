import React from "react";
import { DateRange } from "react-day-picker";

import DateRangeFilter from "@/shared/components/date-range-filter";
import FilterSearch from "@/shared/components/filter-search";
import { ComboBox } from "@/shared/components/ui/combobox";
import { useCommonStore } from "@/store/common-store";
import CustomDateFilter from "@/shared/components/custom-date-filter";

interface IProps {
  setDateRangeOpen: (arg: boolean) => void;
  dateRangeOpen: boolean;
  dateRange: DateRange | undefined;
  dateChangeHandler: (arg: DateRange | undefined) => void;
  setSearchText: (arg: string) => void;
  setDepartment: (arg: string) => void;
  department: string;
  searchText: string;
}

interface IConfigProps {
  title: string;
  id: string;
}

const ListCardFilter = ({
  setDateRangeOpen,
  dateRangeOpen,
  dateRange,
  dateChangeHandler,
  setSearchText,
  setDepartment,
  searchText,
  department,
}: IProps) => {
  const { filterConfig } = useCommonStore();

  const departmentData = [
    { title: "All Departments", value: "all" },
    ...(filterConfig?.departments?.map(({ title, id }: IConfigProps) => ({
      title,
      value: id,
    })) || []),
  ];

  return (
    <div className="flex justify-between items-center grow">
      <div className="flex gap-4 justify-end items-center grow">
        <FilterSearch
          className="h-10 !max-w-[280px]"
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className="w-[270px]">
          <ComboBox
            selectables={departmentData}
            value={department}
            setValue={setDepartment}
            module="Department"
          />
        </div>

        <CustomDateFilter
          date={dateRange}
          setDate={dateChangeHandler}
          defaultSelected="date_range"
          tabContent={["date_range", "weekly", "monthly"]}
        />
        {/* <DateRangeFilter
          dateRange={dateRange}
          setDateRange={dateChangeHandler}
          dateRangeOpen={dateRangeOpen}
          setDateRangeOpen={setDateRangeOpen}
          buttonClassName="max-w-[250px]"
          disabled
        /> */}
      </div>
    </div>
  );
};

export default ListCardFilter;
