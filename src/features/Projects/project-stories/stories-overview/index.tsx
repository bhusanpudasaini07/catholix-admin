import { Card, CardContent } from "@/shared/components/ui/card";
import { calculateTimeLog } from "@/shared/utils/rp-utils";
import moment from "moment";
import React from "react";

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
        <div className="flex items-center justify-between mb-10">
          <p className="text-lg font-medium text-zinc-700">Overview</p>
        </div>
        <div className="grid grid-flow-row-dense grid-cols-3 gap-6 xl:grid-rows-2 2xl:grid-cols-5">
          {/* Total Estimated Time */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100"
          >
            <p className="text-4xl font-semibold">{`${hours}H ${minutes}M`}</p>
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
            <p className="text-4xl font-semibold">
              {" "}
              {`${spentHours}H ${spentMinutes}M`}
            </p>
            <p className="text-base font-semibold">Total Time Spent</p>
          </div>
          {/* Total Task */}
          <div
            className={`2xl:col-span-2 rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
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
              {task?.bug_count_percentage ?? 0}%
            </p>
            <p className="text-base font-semibold">Bug Ratio</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStoriesOverview;
