import React from "react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/utils";
import { Progress } from "@/shared/components/ui/progress";
import { IProjectSprintDetail } from "@/interface/project-interface";
import moment from "moment";
import {
  calculateDeadlinePercentValue,
  showDeadline,
} from "@/shared/utils/rp-utils";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface IProps {
  sprintDetail: IProjectSprintDetail | undefined;
  loading: boolean;
}

const ProjectDashboardSprintReport = ({ sprintDetail, loading }: IProps) => {
  const { leftText, daysValue } = showDeadline(sprintDetail?.due_date!);

  const value = sprintDetail
    ? (sprintDetail?.closed_task_count / sprintDetail?.total_task_count) * 100
    : 0;
  const barValue = Math.round(value);

  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-7">
          <p className="text-lg font-medium text-zinc-700">Sprint Report</p>
        </div>

        {loading ? (
          // Skeleton Loading
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <Skeleton className="mb-3 w-20 h-3" />
                <Skeleton className="w-40 h-3" />
              </div>
              <Skeleton className="w-20 h-5" />
            </div>
            <Skeleton className="w-full h-2" />
            <div className="flex justify-between items-center mt-3.5">
              <Skeleton className="w-20 h-3" />
              <Skeleton className="w-20 h-3" />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold text-zinc-700">
                  {sprintDetail?.name}
                </p>
                <p className="text-sm text-zinc-500">
                  {moment(sprintDetail?.start_date).format("ll")} -{" "}
                  {moment(sprintDetail?.due_date).format("ll")}
                </p>
              </div>
              <Badge
                className={cn(
                  "px-3 py-1 text-sm font-medium bg-transparent",
                  daysValue &&
                    daysValue < 20 &&
                    ["closed"].includes(sprintDetail?.status!)
                    ? "border-green-500 text-green-500"
                    : "border-destructive text-destructive"
                  // daysValue &&
                  //   daysValue > 40 &&
                  //   "border-green-500 text-green-500",
                  // daysValue &&
                  //   daysValue > 20 &&
                  //   daysValue < 40 &&
                  //   "border-orange-500 text-orange-500"
                )}
              >
                {["closed"].includes(sprintDetail?.status!)
                  ? "Closed"
                  : leftText}
              </Badge>
            </div>
            <div>
              <Progress
                className={cn("h-2", "[&>div]:bg-green-500")}
                value={barValue}
              />
              <div className="flex justify-between items-center mt-3.5">
                <p className="text-sm text-zinc-500">
                  Task - {sprintDetail?.closed_task_count}/
                  {sprintDetail?.total_task_count}
                </p>
                <p className="text-sm font-medium text-zinc-500">
                  {isNaN(barValue) ? "In Progress" : `${barValue} % Complete`}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectDashboardSprintReport;
