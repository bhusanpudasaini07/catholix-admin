import { Card, CardContent } from "@/shared/components/ui/card";
import { calculateTimeLog } from "@/shared/utils/rp-utils";
import React from "react";

interface IProps {
  task: string;
  bugs: string;
  time: string;
  rp: string | number;
  open: string | number;
  closed: string | number;
  bugPercentage: string | number;
  timeSpent: string;
}

const TaskTimeLogs = ({
  task,
  bugs,
  time,
  // rp,
  open,
  closed,
  bugPercentage,
  timeSpent,
}: IProps) => {
  const { hours, minutes } = calculateTimeLog(parseInt(time));
  const { hours: spentHours, minutes: spentMinutes } = calculateTimeLog(
    parseInt(timeSpent)
  );
  return (
    <Card>
      <CardContent>
        <div className="grid grid-flow-row-dense grid-cols-3 gap-6 xl:grid-rows-2 2xl:grid-cols-5">
          {/* Open */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100"
          >
            <p className="text-4xl font-semibold">{open ?? 0}</p>
            <p className="text-base font-medium">Open</p>
          </div>
          {/* Closed */}
          <div
            className={`rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-green-50 text-green-500 
            border-[1px] border-green-100
            `}
          >
            <p className="text-4xl font-semibold"> {closed ?? 0}</p>
            <p className="text-base font-semibold">Closed</p>
          </div>
          {/* Total Estimated Time */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100"
          >
            <p className="text-4xl font-semibold">{`${hours}H`}</p>
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
          {/* Bugs */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100"
          >
            <p className="text-4xl font-semibold"> {bugs ?? 0}</p>
            <p className="text-base font-semibold">Bugs</p>
          </div>
          {/* Total Task */}
          <div
            className={`2xl:col-span-2 rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-zinc-50 text-zinc-500 
            border-[1px] border-zinc-100
            `}
          >
            <p className="text-4xl font-semibold"> {task ?? 0}</p>
            <p className="text-base font-semibold">Total Task</p>
          </div>
          {/* Total Time Spent */}
          <div
            className={`col-span-2 rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100
            `}
          >
            <p className="text-4xl font-semibold"> {`${spentHours}H`}</p>
            <p className="text-base font-semibold">Total Time Spent</p>
          </div>

          {/* Bug Ratio */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-red-50 text-red-500 
            border-[1px] border-red-100"
          >
            <p className="text-4xl font-semibold"> {bugPercentage ?? 0}%</p>
            <p className="text-base font-semibold">Bug Ratio</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskTimeLogs;
