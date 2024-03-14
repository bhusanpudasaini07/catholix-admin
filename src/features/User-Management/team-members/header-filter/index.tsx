import useTeamMemberList from "@/hooks/user-management/team-member-list/useTeamMemberList.hook";
import DateRangeFilter from "@/shared/components/date-range-filter";
import FilterSearch from "@/shared/components/filter-search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import React from "react";

const ListCardFilter = () => {
  const {
    setDateRangeOpen,
    dateRangeOpen,
    dateRange,
    dateChangeHandler,
    setSearchText,
  } = useTeamMemberList();
  return (
    <div className="flex items-center justify-between mb-10">
      <p className="text-lg font-medium text-zinc-700">Team Member</p>
      <div className="flex items-center justify-end gap-4 grow">
        <FilterSearch className="h-10" setSearchText={setSearchText} />

        <Select defaultValue="all">
          <SelectTrigger className=" h-auto max-w-[250px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Department</SelectItem>
          </SelectContent>
        </Select>

        <DateRangeFilter
          dateRange={dateRange}
          setDateRange={dateChangeHandler}
          dateRangeOpen={dateRangeOpen}
          setDateRangeOpen={setDateRangeOpen}
          buttonClassName="max-w-[250px]"
        />
      </div>
    </div>
  );
};

export default ListCardFilter;
