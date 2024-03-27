import React from "react";
import { DateRange } from "react-day-picker";

import DateRangeFilter from "@/shared/components/date-range-filter";
import FilterSearch from "@/shared/components/filter-search";
import { ComboBox } from "@/shared/components/ui/combobox";
import { useCommonStore } from "@/store/common-store";

interface IProps {
  setDateRangeOpen: (arg: boolean) => void;
  dateRangeOpen: boolean;
  dateRange: DateRange | undefined;
  dateChangeHandler: (arg: DateRange) => void;
  setSearchText: (arg: string) => void;
  setDepartment: (arg: string) => void;
  department: string;
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
    <div className="flex items-center justify-between grow">
      <div className="flex items-center justify-end gap-4 grow">
        <FilterSearch
          className="h-10 !max-w-[280px]"
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

        <DateRangeFilter
          dateRange={dateRange}
          setDateRange={dateChangeHandler}
          dateRangeOpen={dateRangeOpen}
          setDateRangeOpen={setDateRangeOpen}
          buttonClassName="max-w-[250px]"
          disabled
        />
      </div>
    </div>
  );
};

export default ListCardFilter;
