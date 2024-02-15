import useTaskTimeSpent from "@/hooks/project/detail/useTaskTimeSpent.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

const TaskTimeTable = () => {
  const {
    timeLogLoading,
    timeLogs,
    columns,
    setSearchText,
    perPage,
    setPerPage,
  } = useTaskTimeSpent();
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center justify-start gap-3">
            <p>Task & Time Spent</p>
            {/* <Button
              variant={"white"}
              onClick={() =>
                router.push(`/projects/${router?.query?.code}/task-time-spent`)
              }
              size={"sm"}
            >
              View All
            </Button> */}
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
            data={timeLogs?.data?.slice(0, perPage) ?? []}
          />
          <p
            onClick={() => setPerPage(perPage + 10)}
            className="py-4 text-sm font-medium text-center cursor-pointer text-zinc-700"
          >
            Load More
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskTimeTable;
