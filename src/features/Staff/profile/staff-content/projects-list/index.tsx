import React from "react";
import useStaffDetail from "@/hooks/staff/useStaffDetail.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import DateRangeFilter from "@/shared/components/date-range-filter";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const StaffProjectsList = () => {
  const {
    projectsOverviewColumns,
    staffProjects,
    staffProjectsLoading,
    setSearchText,
    changeDate,
    date,
    dateRangeOpen,
    setDateRangeOpen,
    status,
    setStatus,
  } = useStaffDetail();
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-9">
          <div className="flex items-center justify-start gap-3">
            <p className="text-lg font-medium text-zinc-700">
              Projects Overview
            </p>
            <Button variant={"white"} size={"sm"}>
              View All
            </Button>
          </div>
          <div className="flex items-center justify-end gap-4 grow">
            {/* Filter Search */}
            <FilterSearch className="h-10" setSearchText={setSearchText} />

            {/* Role */}
            <DateRangeFilter
              dateRange={date}
              setDateRange={changeDate}
              dateRangeOpen={dateRangeOpen}
              setDateRangeOpen={setDateRangeOpen}
              buttonClassName="max-w-[300px]"
            />

            {/* Status */}
            <Select defaultValue={status} onValueChange={(e) => setStatus(e)}>
              <SelectTrigger className="max-w-[200px] h-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Client Support">Client Support</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DataTable
          columns={projectsOverviewColumns}
          data={staffProjects?.data?.projects ?? []}
          loading={staffProjectsLoading}
          loadingDataNum={5}
          border
          headerSticky
          height="max-h-[500px]"
        />
      </CardContent>
    </Card>
  );
};

export default StaffProjectsList;
