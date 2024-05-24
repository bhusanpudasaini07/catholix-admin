import ReactEcharts from "echarts-for-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

import useSprintStatus from "@/hooks/project/detail/useSprintStatus.hook";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { cn } from "@/shared/utils/utils";
import moment from "moment";
import { showDeadline } from "@/shared/utils/rp-utils";
import PieChartSkeleton from "@/shared/components/skeleton-loading/pie-chart-skeleton";
import { Skeleton } from "@/shared/components/ui/skeleton";
import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";
import useProjectStories from "@/hooks/project/detail/useProjectStories.hook";

const SprintStatus = () => {
  const router = useRouter();

  const {
    sprintId,
    taskChart,
    projectSprints,
    projectSprintLoading,
    sprintBurndownOption,
    changeSprintHandler,
    projectStories,
    projectStoriesLoading,
    storyId,
    setStoryId,
    projectStoryDetail,
  } = useSprintStatus();

  const { isLoading } = useProjectDetail();

  const sprintDetail = projectSprints?.data?.find(
    (sprint) => sprint?.id === sprintId
  );
  const { daysValue, leftText } = showDeadline(sprintDetail?.due_date!);
  const value = sprintDetail
    ? (sprintDetail?.closed_task_count / sprintDetail?.total_task_count) * 100
    : 0;
  const barValue = Math.round(value);

  return (
    <Card className="mt-4">
      <CardContent>
        <div className="flex flex-col flex-wrap gap-4 justify-between mb-7 w-full xl:items-start xl:flex-row">
          <div className="flex gap-3 justify-start items-center">
            <p className="text-lg font-medium text-zinc-700">Sprint Status</p>
            <Button
              variant={"white"}
              onClick={() =>
                router.push(`/projects/${router?.query.code}/burndown-chart`)
              }
              size={"sm"}
            >
              View Full List
            </Button>
          </div>
          <div className="flex gap-4 items-center">
            {/* Sprint Detail */}
            <div>
              {isLoading || projectSprintLoading ? (
                <Skeleton className="mb-1 w-20 h-4" />
              ) : (
                <p className="text-lg font-medium text-blue-500">
                  {sprintDetail?.name}
                </p>
              )}

              <div className="flex gap-2 items-center">
                {isLoading || projectSprintLoading ? (
                  <>
                    <Skeleton className="w-40 h-4" />
                    <Skeleton className="w-20 h-5" />
                  </>
                ) : (
                  <>
                    <p className="text-sm text-zinc-500">
                      {moment(sprintDetail?.start_date).format("ll")} -{" "}
                      {moment(sprintDetail?.due_date).format("ll")}
                    </p>
                    <Badge
                      className={cn(
                        "px-3 py-1 text-xs font-medium bg-transparent",
                        daysValue &&
                          daysValue < 20 &&
                          ["closed"].includes(sprintDetail?.status!)
                          ? "border-green-500 text-green-500"
                          : "border-destructive text-destructive"
                      )}
                    >
                      {["closed"].includes(sprintDetail?.status!)
                        ? "Closed"
                        : leftText}
                    </Badge>
                  </>
                )}
              </div>
            </div>
            {/* Probability */}
            <div className="px-4 py-2 rounded-lg border bg-slate-50 border-slate-200">
              <p className="text-base font-medium text-zinc-700">80%</p>
              <p className="text-sm font-medium text-zinc-500">
                Probability of finishing on time
              </p>
            </div>
            {/* Progress Bar */}
            <div className="w-[160px]">
              {/* <Progress */}
              <Progress
                className={cn("h-4", "[&>div]:bg-green-500")}
                value={barValue}
              />
              <p className="mt-2 text-sm text-center text-zinc-500">
                {isNaN(barValue)
                  ? "In Progress"
                  : `${barValue} Task % Completed`}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <Button
                variant={"white"}
                onClick={() => changeSprintHandler("prev")}
                className="rounded-full p-0 !size-[36px] h-auto"
                size={"sm"}
                disabled={
                  projectSprints?.data?.findIndex(
                    (sprint) => sprint.id === sprintId
                  ) === 0
                }
              >
                <ArrowLeft size={16} />
              </Button>
              <Button
                variant={"white"}
                onClick={() => changeSprintHandler("next")}
                disabled={
                  projectSprints?.data?.findIndex(
                    (sprint) => sprint.id === sprintId
                  ) ===
                  projectSprints?.data?.length! - 1
                }
                className="rounded-full p-0 !size-[36px] h-auto"
                size={"sm"}
              >
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between px-6 py-4 rounded border border-slate-100 xl:flex-row">
          <div className="flex items-start justify-between w-full max-w-[875px] grow">
            <div className="flex flex-col gap-2 w-[320px] h-[250px] overflow-hidden overflow-y-scroll no-scrollbar ">
              {projectStoriesLoading
                ? Array(20)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="py-2 border-b last:border-0 w-[300px]"
                      >
                        <Skeleton className="h-10" />
                      </div>
                    ))
                : projectStories?.data?.map((story) => (
                    <div
                      className="py-2 border-b last:border-0 w-[300px]"
                      key={`story- ${story?.title}`}
                      onClick={() => setStoryId(story?.title)}
                    >
                      <div
                        className={cn(
                          storyId === story?.title &&
                            "bg-blue-50 after:content:'' after:size-[16px] after:bg-blue-50 after:transform after:rotate-45 after:absolute after:-right-2 after:top-[20px]",
                          "relative px-3 py-1.5 rounded cursor-pointer"
                        )}
                      >
                        <p
                          className={cn(
                            "text-zinc-700",
                            "text-primary",
                            "font-semibold line-clamp-2"
                          )}
                        >
                          {story?.title}
                        </p>
                        <p className="text-sm text-zinc-500">
                          Task - {story?.closed_task_count}/{story?.task_count}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
            <div className="grow max-w-[500px]">
              {isLoading || projectSprintLoading ? (
                <PieChartSkeleton height={200} width={200} />
              ) : (
                <ReactEcharts
                  option={taskChart}
                  style={{ height: 200 }}
                  opts={{ renderer: "svg" }}
                />
              )}
              <div className="grid grid-cols-3 gap-2">
                <div className="px-3 border-r text-end">
                  {isLoading || projectSprintLoading ? (
                    <Skeleton className="mb-1 ml-auto w-10 h-4" />
                  ) : (
                    <p className="text-sm font-medium text-zinc-700">
                      {projectStoryDetail?.task_count}
                    </p>
                  )}
                  <p className="text-xs text-zinc-500">Total Tasks</p>
                </div>
                <div className="px-3 border-r text-end">
                  {isLoading || projectSprintLoading ? (
                    <Skeleton className="mb-1 ml-auto w-10 h-4" />
                  ) : (
                    <p className="text-sm font-medium text-zinc-700">
                      {projectStoryDetail?.open_task_count}
                    </p>
                  )}

                  <p className="text-xs text-zinc-500">Open Tasks</p>
                </div>
                <div className="px-3 text-end">
                  {isLoading || projectSprintLoading ? (
                    <Skeleton className="mb-1 ml-auto w-10 h-4" />
                  ) : (
                    <p className="text-sm font-medium text-zinc-700">
                      {projectStoryDetail?.closed_task_count}
                    </p>
                  )}
                  <p className="text-xs text-zinc-500">Closed Tasks</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l" />

          <div className="w-full max-w-[500px]">
            {isLoading || projectSprintLoading ? (
              <Skeleton className="w-full h-[230px]" />
            ) : (
              <ReactEcharts
                option={sprintBurndownOption}
                style={{ height: 230 }}
                opts={{ renderer: "svg" }}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SprintStatus;
