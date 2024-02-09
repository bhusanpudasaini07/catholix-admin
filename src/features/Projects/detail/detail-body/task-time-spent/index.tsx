import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";

import useTaskTimeSpent from "@/hooks/project/detail/useTaskTimeSpent.hook";
import FilterSearch from "@/shared/components/filter-search";

const TaskTimeSpent = () => {
  const { timeLogLoading, timeLogs, columns, setSearchText } =
    useTaskTimeSpent();

  return (
    <div className="mt-6 card">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center justify-start gap-3">
          <p>Task & Time Spent</p>
          <Button variant={"white"}>View All</Button>
        </div>

        <div className="flex items-center gap-2">
          <FilterSearch setSearchText={setSearchText} />
        </div>
      </div>
      <div className="overflow-hidden rounded-md grow">
        <DataTable
          border={true}
          columns={columns}
          loading={timeLogLoading}
          data={timeLogs?.data?.slice(0, 10) ?? []}
        />
      </div>
    </div>
  );
};

export default TaskTimeSpent;
