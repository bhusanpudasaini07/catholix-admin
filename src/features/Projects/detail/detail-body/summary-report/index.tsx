import ReactECharts from "echarts-for-react";
import { AlertTriangle, TrendingUp } from "lucide-react";
import React from "react";

import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";
import SummaryReportSkeleton from "@/shared/components/skeleton-loading/project/detail/summary-report-skeleton";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/utils";

const ProjectSummaryReport = () => {
  const { projectDetail, isLoading, gaugeOption, nestedPieOption, gaugeColor } =
    useProjectDetail();

  const summaryData = [
    // Task
    {
      id: "task",
      title: "Task Completion",
      data: projectDetail?.data?.health?.task_completion_percentage ?? 0,
      color: "bg-green-500",
    },
    // Project
    {
      id: "project",
      title: "Project Duration",
      data: projectDetail?.data?.health?.time_completion_percentage ?? 0,
      color: "bg-orange-500",
    },
    // RP
    {
      id: "rp",
      title: "Budget Consumption",
      data: projectDetail?.data?.health?.rp_completion_percentage ?? 0,
      color: "bg-primary",
    },
  ];

  return (
    <div className="mb-4">
      {isLoading ? (
        <SummaryReportSkeleton />
      ) : (
        <Card>
          <CardContent>
            <div className="flex gap-4 justify-start items-center mb-10">
              <p className="text-lg font-medium text-zinc-700">
                Summary Report
              </p>{" "}
              <Button
                // onClick={() => setSalesModalOpen(true)}
                size={"sm"}
                variant={"white"}
              >
                Historical Data
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-5">
              {/* Gauge Meter and Grade */}
              <div className="col-span-1 xl:col-span-2">
                <div className="flex justify-around items-center">
                  <div className="h-[200px] w-[300px]">
                    <ReactECharts
                      option={gaugeOption}
                      opts={{ renderer: "svg" }}
                    />
                  </div>
                  <div className="flex flex-col gap-3 justify-center items-center">
                    <p
                      className={cn("text-6xl font-semibold")}
                      style={{ color: gaugeColor() }}
                    >
                      {projectDetail?.data?.health?.grade}
                    </p>
                    <p className="flex gap-2 items-center text-sm">
                      <span>Project Health</span>{" "}
                      {/* <span className="flex gap-2 items-center text-green-700">
                        <TrendingUp /> Increased
                      </span> */}
                    </p>
                    {/* <div className="text-center">
                      <p className="mb-2 text-sm text-zinc-500">
                        Grade History
                      </p>
                      <div className="flex gap-2 items-center">
                        <p className="flex justify-center items-center w-7 h-7 text-xs text-orange-500 bg-orange-50 rounded-full border border-orange-500 shadow-sm">
                          B-
                        </p>
                        <p className="flex justify-center items-center w-7 h-7 text-xs text-orange-500 bg-orange-50 rounded-full border border-orange-500 shadow-sm">
                          B
                        </p>
                        <p className="flex justify-center items-center w-7 h-7 text-xs text-green-500 bg-green-50 rounded-full border border-green-500 shadow-sm">
                          A+
                        </p>
                        <p className="flex justify-center items-center w-7 h-7 text-xs text-orange-500 bg-orange-50 rounded-full border border-orange-500 shadow-sm">
                          B-
                        </p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* Task Project RP  */}
              <div className="col-span-1 xl:pl-8 xl:border-l xl:col-span-3">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                    <div className="flex flex-col justify-evenly h-full">
                      <div className="grid grid-cols-3 gap-8">
                        {summaryData?.map((item) => (
                          <div key={item?.id}>
                            <div className="flex gap-2 items-center">
                              <div
                                className={cn("shrink-0 w-2 h-7", item?.color)}
                              />
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
                      {/* <div className="flex gap-3 items-start px-4 py-3 rounded-lg border border-primary text-primary">
                        <AlertTriangle size={20} />
                        <div className="text-sm">
                          <p>All Well!</p>
                          <p>
                            Your Project is doing great. All resources are
                            utilized efficiently and optimally.{" "}
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-span-4">
                    <ReactECharts
                      opts={{ renderer: "svg" }}
                      style={{ height: 200 }}
                      option={nestedPieOption}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectSummaryReport;
