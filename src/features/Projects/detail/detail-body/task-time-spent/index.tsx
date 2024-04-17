import { useRouter } from "next/router";
import React from "react";

import useTaskTimeSpent from "@/hooks/project/detail/useTaskTimeSpent.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

const TaskTimeSpent = () => {
  const router = useRouter();
  const { timeLogLoading, timeLogs, columns, setSearchText } =
    useTaskTimeSpent();

  return (
    <Card className="mt-4">
      <CardContent>
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-3 justify-start items-center">
            <p className="text-lg font-medium text-zinc-700">
              Task & Time Spent
            </p>
            <Button
              variant={"white"}
              onClick={() =>
                router.push(`/projects/${router?.query?.code}/task-time-spent`)
              }
              size={"sm"}
            >
              View All
            </Button>
          </div>

          <div className="flex gap-2 items-center">
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
      </CardContent>
    </Card>
  );
};

export default TaskTimeSpent;
