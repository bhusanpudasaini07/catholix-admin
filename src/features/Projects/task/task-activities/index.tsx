import React from "react";

import useTaskDetail from "@/hooks/project/task-detail/useTaskDetail.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const TaskActivities = () => {
  const { filterSelectOptions, setFilterType, filterType, activityColumn } =
    useTaskDetail();
  return (
    <Card className="h-fit">
      <CardContent>
        <div className="flex gap-4 justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">Activities</p>

          <div className="flex gap-2 justify-end items-center grow">
            <FilterSearch className="h-9" setSearchText={() => ""} />
            {/* Filter by type */}
            <Select
              defaultValue={filterType}
              onValueChange={(e) => {
                setFilterType(e);
              }}
            >
              <SelectTrigger className="max-w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {filterSelectOptions?.map((filter) => (
                  <SelectItem key={filter?.value} value={filter?.value}>
                    {filter?.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DataTable columns={activityColumn} data={[]} border />
      </CardContent>
    </Card>
  );
};

export default TaskActivities;
