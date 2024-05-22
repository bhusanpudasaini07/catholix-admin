import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/utils";
import { Progress } from "@/shared/components/ui/progress";
import { IProjectSprintDetail } from "@/interface/project-interface";

interface IProps {
  sprintDetail: IProjectSprintDetail | undefined;
  loading: boolean;
}
const TeamTaskInsights = ({ sprintDetail }: IProps) => {
  const taskStatus = [
    {
      id: "total",
      title: "All Task",
      value: sprintDetail?.total_task_count,
      valueColor: "text-zinc-700",
      titleColor: "text-zinc-700",
      bgColor: "bg-slate-50",
    },
    {
      id: "open",
      title: "Open Task",
      value: sprintDetail?.open_task_count,
      valueColor: "text-blue-500",
      titleColor: "text-blue-700",
      bgColor: "bg-blue-50",
    },
    {
      id: "closed",
      title: "Closed Task",
      value: sprintDetail?.closed_task_count,
      valueColor: "text-green-500",
      titleColor: "text-green-700",
      bgColor: "bg-green-50",
    },
  ];
  let barValue = 40;
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-7">
          <p className="text-lg font-medium text-zinc-700">
            Team Task Insights
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-2">
          {taskStatus?.map((status) => (
            <div
              key={status?.id}
              className={cn(status?.bgColor, "py-2 px-4 rounded-sm")}
            >
              <p className={cn(status?.valueColor, "font-medium")}>
                {status?.value}
              </p>
              <p className={cn(status?.titleColor, "text-sm")}>
                {status?.title}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 max-h-[170px] overflow-y-scroll no-scrollbar">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-zinc-700">Design</p>
              <p className="text-sm text-zinc-500">Task - 40/100</p>
            </div>
            <div className="flex justify-end items-center grow max-w-[146px] gap-2">
              <Progress
                value={barValue}
                className={cn("h-2", {
                  "[&>div]:bg-green-500": barValue > 0,
                  "[&>div]:bg-gray-500": barValue === 0,
                })}
              />
              <span className="text-sm font-medium text-zinc-500">40%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-zinc-700">Development</p>
              <p className="text-sm text-zinc-500">Task - 260/350</p>
            </div>
            <div className="flex justify-end items-center grow max-w-[146px] gap-2">
              <Progress
                value={barValue}
                className={cn("h-2", {
                  "[&>div]:bg-green-500": barValue > 0,
                  "[&>div]:bg-gray-500": barValue === 0,
                })}
              />
              <span className="text-sm font-medium text-zinc-500">70%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-zinc-700">Development</p>
              <p className="text-sm text-zinc-500">Task - 260/350</p>
            </div>
            <div className="flex justify-end items-center grow max-w-[146px] gap-2">
              <Progress
                value={barValue}
                className={cn("h-2", {
                  "[&>div]:bg-green-500": barValue > 0,
                  "[&>div]:bg-gray-500": barValue === 0,
                })}
              />
              <span className="text-sm font-medium text-zinc-500">70%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-zinc-700">Development</p>
              <p className="text-sm text-zinc-500">Task - 260/350</p>
            </div>
            <div className="flex justify-end items-center grow max-w-[146px] gap-2">
              <Progress
                value={barValue}
                className={cn("h-2", {
                  "[&>div]:bg-green-500": barValue > 0,
                  "[&>div]:bg-gray-500": barValue === 0,
                })}
              />
              <span className="text-sm font-medium text-zinc-500">70%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-zinc-700">Development</p>
              <p className="text-sm text-zinc-500">Task - 260/350</p>
            </div>
            <div className="flex justify-end items-center grow max-w-[146px] gap-2">
              <Progress
                value={barValue}
                className={cn("h-2", {
                  "[&>div]:bg-green-500": barValue > 0,
                  "[&>div]:bg-gray-500": barValue === 0,
                })}
              />
              <span className="text-sm font-medium text-zinc-500">70%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-zinc-700">Development</p>
              <p className="text-sm text-zinc-500">Task - 260/350</p>
            </div>
            <div className="flex justify-end items-center grow max-w-[146px] gap-2">
              <Progress
                value={barValue}
                className={cn("h-2", {
                  "[&>div]:bg-green-500": barValue > 0,
                  "[&>div]:bg-gray-500": barValue === 0,
                })}
              />
              <span className="text-sm font-medium text-zinc-500">70%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-zinc-700">Development</p>
              <p className="text-sm text-zinc-500">Task - 260/350</p>
            </div>
            <div className="flex justify-end items-center grow max-w-[146px] gap-2">
              <Progress
                value={barValue}
                className={cn("h-2", {
                  "[&>div]:bg-green-500": barValue > 0,
                  "[&>div]:bg-gray-500": barValue === 0,
                })}
              />
              <span className="text-sm font-medium text-zinc-500">70%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamTaskInsights;
