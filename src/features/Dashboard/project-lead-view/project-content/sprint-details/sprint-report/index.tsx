import React from "react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/utils";
import { Progress } from "@/shared/components/ui/progress";

const ProjectDashboardSprintReport = () => {
  const daysValue = 14;
  const leftText = "3 Days Left";
  let status = "In Progress";
  let barValue = 60;
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-7">
          <p className="text-lg font-medium text-zinc-700">Sprint Report</p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-semibold text-zinc-700">Sprint 5</p>
              <p className="text-sm text-zinc-500">
                May 6, 2024 - May 18, 2024
              </p>
            </div>
            <Badge
              className={cn(
                "px-3 py-1 text-sm font-medium bg-transparent",
                daysValue &&
                  daysValue < 20 &&
                  ["Closed", "Delivered"].includes(status)
                  ? "border-green-500 text-green-500"
                  : "border-destructive text-destructive",
                daysValue &&
                  daysValue > 40 &&
                  "border-green-500 text-green-500",
                daysValue &&
                  daysValue > 20 &&
                  daysValue < 40 &&
                  "border-orange-500 text-orange-500"
              )}
            >
              {["Closed", "Delivered"].includes(status)
                ? "Completed"
                : status === "On Hold"
                ? "On Hold"
                : leftText}
            </Badge>
          </div>
          <div>
            <Progress
              className={cn("h-2", {
                "[&>div]:bg-green-500": barValue > 50,
                "[&>div]:bg-orange-500": barValue <= 50 && barValue >= 30,
                "[&>div]:bg-red-500": barValue < 30,
                "[&>div]:bg-gray-500": barValue === 0,
              })}
              value={barValue}
            />
            <div className="flex justify-between items-center mt-3.5">
              <p className="text-sm text-zinc-500">Task - 40/100</p>
              <p className="text-sm font-medium text-zinc-500">
                {barValue}% Complete
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDashboardSprintReport;
