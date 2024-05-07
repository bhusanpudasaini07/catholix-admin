import useTaskDetail from "@/hooks/project/task-detail/useTaskDetail.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

const TimeLogs = () => {
  const { timeLogColumn } = useTaskDetail();
  return (
    <Card className="h-fit">
      <CardContent>
        <div className="flex gap-4 justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">Time Logs</p>

          <FilterSearch setSearchText={() => ""} />
        </div>

        <DataTable
          data={[]}
          columns={timeLogColumn}
          border
          lottieHeight={120}
        />
      </CardContent>
    </Card>
  );
};

export default TimeLogs;
