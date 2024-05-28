import React from "react";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/utils/utils";
import { useRouter } from "next/router";
import DashboardProjectOverviewSkeleton from "@/shared/components/skeleton-loading/dashboard/project-view/project-overview-skeleton";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Progress } from "@/shared/components/ui/progress";
import {
  calculateDeadlinePercentValue,
  showDeadline,
} from "@/shared/utils/rp-utils";
import moment from "moment";

interface IProps {
  health: {
    task_completion_percentage: number | undefined;
    time_completion_percentage: number | undefined;
    rp_completion_percentage: number | undefined;
    grade: string | undefined;
  };
  code: string | undefined;
  gaugeColor: () => string;
  loading: boolean;
  project_title: String | undefined;
  deadline: string;
  start_date: string;
}

const DashboardProjectOverview = ({
  health,
  gaugeColor,
  code,
  loading,
  project_title,
  deadline,
  start_date,
}: IProps) => {
  const router = useRouter();
  const summaryData = [
    // Task
    {
      id: "task",
      title: "Task Completion",
      data: health?.task_completion_percentage ?? 0,
      color: "bg-green-500",
    },
    // Project
    {
      id: "project",
      title: "Project Duration",
      data: health?.time_completion_percentage ?? 0,
      color: "bg-orange-500",
    },
    // RP
    {
      id: "rp",
      title: "Budget Consumption",
      data: health?.rp_completion_percentage ?? 0,
      color: "bg-primary",
    },
  ];
  const { statusText } = showDeadline(deadline);
  const { value } = calculateDeadlinePercentValue(start_date, deadline);
  const barValue = 100 - value;
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-7">
          {loading ? (
            <Skeleton className="w-40 h-5" />
          ) : (
            <p className="text-lg font-medium text-zinc-700">{project_title}</p>
          )}
          <Button
            onClick={() => router.push(`/projects/${code}`)}
            size={"sm"}
            variant={"white"}
          >
            Project Page
          </Button>
        </div>
        {loading ? (
          <DashboardProjectOverviewSkeleton />
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center 2xl:gap-6 2xl:flex-row">
            <div className="text-center w-[195px]">
              <p
                className={cn("text-6xl font-semibold")}
                style={{ color: gaugeColor() }}
              >
                {health?.grade}
              </p>
              <p className="flex gap-2 justify-center items-center text-sm">
                <span>Project Health</span>{" "}
                {/* <span className="flex gap-2 items-center text-green-700">
                        <TrendingUp /> Increased
                      </span> */}
              </p>
            </div>
            <div className="w-0.5 h-[80px] border" />
            <div className="w-[200px]">
              {" "}
              {/* Progress */}
              <div className="grow">
                <p className="mb-1 text-sm font-medium text-zinc-700">
                  {statusText}
                </p>
                <div className="flex gap-2 items-center">
                  <Progress
                    className={cn("h-2", {
                      "[&>div]:bg-red-500": barValue >= 90,
                      "[&>div]:bg-orange-500": barValue >= 50 && barValue <= 90,
                      "[&>div]:bg-green-500": barValue < 50,
                      "[&>div]:bg-gray-500": barValue === 0,
                    })}
                    value={barValue}
                  />
                </div>
                <p className="mt-1 text-sm text-zinc-600">
                  Deadline:{" "}
                  <span className="font-medium">
                    {moment(deadline).format("ll")}
                  </span>
                </p>
              </div>
            </div>
            <div className="2xl:w-0.5 h-[80px] 2xl:border" />

            <div className="grid grid-cols-3 grow">
              {summaryData?.map((item) => (
                <div key={item?.id}>
                  <div className="flex gap-2 items-center">
                    <div className={cn("shrink-0 w-2 h-6", item?.color)} />
                    <p className="whitespace-nowrap text-zinc-700">
                      {item?.title}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 items-end pl-4 mt-2">
                    <p className="text-2xl font-medium text-zinc-700">
                      {item?.data > 100 ? 100 : item?.data}%
                    </p>
                    {item?.data > 100 && (
                      <span className="text-base font-medium text-red-500">
                        + Over {item?.data - 100}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardProjectOverview;
