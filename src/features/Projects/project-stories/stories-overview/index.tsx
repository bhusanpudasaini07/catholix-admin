import moment from "moment";
import React from "react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { calculateTime, calculateTimeLog } from "@/shared/utils/rp-utils";

interface IProps {
  task: {
    open_task_count: number;
    bug_count: number;
    closed_task_count: number;
    all_task_count: number;
    bug_count_percentage: number;
  };
  time: {
    estimated_time: number;
    used_time: number;
  };
}

const ProjectStoriesOverview = ({ task, time }: IProps) => {
  const { hours, minutes } = calculateTimeLog(time?.estimated_time);
  const { hours: spentHours, minutes: spentMinutes } = calculateTimeLog(
    time?.used_time
  );
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">Overview</p>
        </div>
        <div className="grid grid-cols-6 grid-flow-row-dense gap-6 2xl:grid-cols-8">
          {/* Total Task */}
          <div
            className={`flex flex-col gap-3 justify-center items-center py-6 rounded-md h-[148px] bg-zinc-50 text-zinc-500 border-[1px] border-zinc-100`}
          >
            <p className="text-4xl font-semibold">
              {" "}
              {task?.all_task_count ?? 0}
            </p>
            <p className="text-base font-semibold">Total Task</p>
          </div>

          {/* Total Commits */}
          {/* <div
            className={`flex flex-col gap-3 justify-center items-center py-6 text-green-500 bg-green-50 rounded-md border-green-100 h-[148px] border-[1px]`}
          >
            <p className="text-4xl font-semibold"> {0}</p>
            <p className="text-base font-semibold">Total Commits</p>
          </div> */}
          {/* Opened */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100"
          >
            <p className="text-4xl font-semibold">
              {task?.open_task_count ?? 0}
            </p>
            <p className="text-base font-medium">Open</p>
          </div>
          {/* Closed */}
          <div
            className={`flex flex-col gap-3 justify-center items-center py-6 text-green-500 bg-green-50 rounded-md border-green-100 h-[148px] border-[1px]`}
          >
            <p className="text-4xl font-semibold">
              {" "}
              {task?.closed_task_count ?? 0}
            </p>
            <p className="text-base font-semibold">Closed</p>
          </div>
          {/* Bugs */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100"
          >
            <p className="text-4xl font-semibold"> {task?.bug_count ?? 0}</p>
            <p className="text-base font-semibold">Bugs</p>
          </div>
          {/* Bug Ratio */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-red-50 text-red-500 
            border-[1px] border-red-100"
          >
            <p className="text-4xl font-semibold">
              {" "}
              {task?.bug_count_percentage ?? 0}%
            </p>
            <p className="text-base font-semibold">Bug Ratio</p>
          </div>
          {/* Bug Ratio */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-green-50 text-green-500 
            border-[1px] border-green-100"
          >
            <p className="text-4xl font-semibold">
              {" "}
              {task?.bug_count_percentage ?? 0}%
            </p>
            <p className="text-base font-semibold">Closed %</p>
          </div>
          {/* Total Estimated Time */}
          <div
            className="rounded-md py-6 h-[148px] col-span-3 2xl:col-span-1 flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100"
          >
            {hours < 1 ? (
              <p className="text-4xl font-semibold">{`${minutes}M`}</p>
            ) : (
              <p className="text-4xl font-semibold">
                {calculateTime(time?.estimated_time) + "H"}
              </p>
            )}
            <p className="text-base font-medium">Total Estimated Time</p>
          </div>
          {/* Total Time Spent */}
          <div
            className={`flex flex-col col-span-3 gap-3 justify-center items-center py-6 text-blue-500 bg-blue-50 rounded-md border-blue-10 2xl:col-span-1 h-[148px] border-[1px]`}
          >
            {spentHours < 1 ? (
              <p className="text-4xl font-semibold">{`${spentMinutes}M`}</p>
            ) : (
              <p className="text-4xl font-semibold">
                {calculateTime(time?.used_time) + "H"}
              </p>
            )}
            <p className="text-base font-semibold">Total Time Spent</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStoriesOverview;
