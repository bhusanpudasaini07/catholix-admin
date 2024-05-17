import { TrendingUp } from "lucide-react";
import React from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/utils";
import moment from "moment";
import {
  calculateDeadlinePercentValue,
  showDeadline,
} from "@/shared/utils/rp-utils";
import { Progress } from "@/shared/components/ui/progress";

interface IProps {
  project_title: string;
  health: string;
  deadline: string;
  start_date: string;
  status: string;
  projectCode: string;
  code: string;
  setProjectCode: (arg: string) => void;
}

const ProjectSidebarCard = ({
  project_title,
  health,
  deadline,
  start_date,
  status,
  projectCode,
  setProjectCode,
  code,
}: IProps) => {
  const { leftText, daysValue } = showDeadline(deadline);
  const { value } = calculateDeadlinePercentValue(start_date, deadline);
  const barValue = 100 - value;

  return (
    <Card
      onClick={() => setProjectCode(code)}
      className={cn("cursor-pointer", projectCode === code && "border-primary")}
    >
      <CardContent>
        <h4 className="text-lg font-medium text-center truncate text-zinc-700">
          {project_title}
        </h4>
        <div className="text-center">
          <p
            className={cn(
              "text-4xl font-semibold leading-[58px]",
              "text-orange-500"
            )}
          >
            {health}
          </p>
          <p className="flex gap-2 justify-center items-center text-sm">
            <span className="text-zinc-500">Project Health</span>{" "}
            <span className="flex gap-2 items-center text-sm text-green-700">
              <TrendingUp /> Increased
            </span>
          </p>
        </div>

        <div className="pt-4 mt-4 border-t">
          <div className="flex justify-between items-center">
            {/* Progress */}
            <div className="grow max-w-[130px]">
              <p className="mb-1 text-sm font-medium text-zinc-500">Progress</p>
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
                {barValue < 100 && (
                  <p className="text-sm text-zinc-500">
                    {barValue.toFixed(2)}%
                  </p>
                )}
              </div>
            </div>

            {/* Deadline */}
            <div className="text-center">
              <p className="mb-1 text-sm font-medium leading-5 text-zinc-500">
                {moment(deadline).format("ll")}
              </p>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectSidebarCard;
