import React from "react";

import useStoryDetail from "@/hooks/project/stories/useStoryDetail.hook";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { DataTable } from "@/shared/components/data-table/data-table";

const StoryTaskList = () => {
  const { taskListFilter, setTaskListFilter, taskListColumn } =
    useStoryDetail();
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">Task List</p>
          <Select
            defaultValue={taskListFilter}
            onValueChange={(e) => setTaskListFilter(e)}
          >
            <SelectTrigger className="max-w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DataTable data={[]} columns={taskListColumn} border />
      </CardContent>
    </Card>
  );
};

export default StoryTaskList;
