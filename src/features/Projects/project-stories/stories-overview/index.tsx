import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

interface IProps {
  task: {
    open_task_count: number;
    bug_count: number;
    closed_task_count: number;
    all_task_count: number;
  };
}

const ProjectStoriesOverview = ({ task }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <p className="text-lg font-medium text-zinc-700">Overview</p>
        </div>
        <div className="grid grid-flow-row-dense grid-cols-5 grid-rows-2 gap-6">
          {/* Total Estimated Time */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100"
          >
            <p className="text-4xl font-semibold">{0}</p>
            <p className="text-base font-medium">Total Estimated Time</p>
          </div>
          {/* Total Commits */}
          <div
            className={`rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-green-50 text-green-500 
            border-[1px] border-green-100
            `}
          >
            <p className="text-4xl font-semibold"> {0}</p>
            <p className="text-base font-semibold">Total Commits</p>
          </div>
          {/* Opened */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100"
          >
            <p className="text-4xl font-semibold">
              {task?.open_task_count ?? 0}
            </p>
            <p className="text-base font-medium">Opened</p>
          </div>
          {/* Closed */}
          <div
            className={`rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-green-50 text-green-500 
            border-[1px] border-green-100
            `}
          >
            <p className="text-4xl font-semibold">
              {" "}
              {task?.closed_task_count ?? 0}
            </p>
            <p className="text-base font-semibold">Closed</p>
          </div>
          {/* Bugs */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-red-50 text-red-500 
            border-[1px] border-red-100"
          >
            <p className="text-4xl font-semibold"> {task?.bug_count ?? 0}</p>
            <p className="text-base font-semibold">Bugs</p>
          </div>
          {/* Total Time Spent */}
          <div
            className={`col-span-2 rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100
            `}
          >
            <p className="text-4xl font-semibold"> {0}</p>
            <p className="text-base font-semibold">Total Time Spent</p>
          </div>
          {/* Total Task */}
          <div
            className={`col-span-2 rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100
            `}
          >
            <p className="text-4xl font-semibold">
              {" "}
              {task?.all_task_count ?? 0}
            </p>
            <p className="text-base font-semibold">Total Task</p>
          </div>
          {/* Bug Ratio */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-red-50 text-red-500 
            border-[1px] border-red-100"
          >
            <p className="text-4xl font-semibold">
              {" "}
              {/* {projectDetail?.data?.task?.bug_count_ratio ?? 0} */}0%
            </p>
            <p className="text-base font-semibold">Bug Ratio</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStoriesOverview;
