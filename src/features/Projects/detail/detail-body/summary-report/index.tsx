import React from "react";
import ReactECharts from "echarts-for-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { AlertTriangle, TrendingUp } from "lucide-react";
import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";
import { cn } from "@/shared/utils/utils";

const ProjectSummaryReport = () => {
  const { projectDetail, gaugeOption, nestedPieOption } = useProjectDetail();

  const summaryData = [
    // Task
    {
      id: "task",
      title: "Task Completion",
      data: projectDetail?.data?.health?.task_completion_percentage ?? 0,
      color: "bg-primary",
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
      title: "RP Consumption",
      data: projectDetail?.data?.health?.rp_completion_percentage ?? 0,
      color: "bg-green-500",
    },
  ];

  return (
    <Card className="mb-4">
      <CardContent>
        <div className="flex items-center justify-start gap-4 mb-10">
          <p className="text-lg font-medium text-zinc-700">Summary Report</p>{" "}
          <Button
            // onClick={() => setSalesModalOpen(true)}
            size={"sm"}
            variant={"white"}
          >
            Historical Data
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-2 ">
          {/* Gauge Meter and Grade */}
          <div className="col-span-1 xl:col-span-1">
            <div className="flex items-center justify-between">
              <div className="w-[50%]">
                <ReactECharts option={gaugeOption} />
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-6xl font-semibold">
                  {projectDetail?.data?.health?.grade}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <span>Project Health</span>{" "}
                  <span className="flex items-center gap-2 text-green-700">
                    <TrendingUp /> Increased
                  </span>
                </p>
                <div className="text-center">
                  <p className="mb-2 text-sm text-zinc-500">Grade History</p>
                  <div className="flex items-center gap-2">
                    <p className="flex items-center justify-center text-xs text-orange-500 border border-orange-500 rounded-full shadow-sm bg-orange-50 w-7 h-7">
                      B-
                    </p>
                    <p className="flex items-center justify-center text-xs text-orange-500 border border-orange-500 rounded-full shadow-sm bg-orange-50 w-7 h-7">
                      B
                    </p>
                    <p className="flex items-center justify-center text-xs text-green-500 border border-green-500 rounded-full shadow-sm bg-green-50 w-7 h-7">
                      A+
                    </p>
                    <p className="flex items-center justify-center text-xs text-orange-500 border border-orange-500 rounded-full shadow-sm bg-orange-50 w-7 h-7">
                      B-
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Task Project RP  */}
          <div className="col-span-1 xl:col-span-1">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <div className="flex flex-col justify-between h-full">
                  <div className="grid grid-cols-3 gap-8">
                    {summaryData?.map((item) => (
                      <div key={item?.id}>
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-7", item?.color)} />
                          <p className="text-zinc-700">{item?.title}</p>
                        </div>
                        <p className="pl-4 mt-2 text-2xl font-medium text-zinc-700">
                          {item?.data}%
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-3 px-4 py-3 border rounded-lg border-primary text-primary">
                    <AlertTriangle size={20} />
                    <div className="text-sm">
                      <p>All Well!</p>
                      <p>
                        Your Project is doing great. All resources are utilized
                        efficiently and optimally.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <ReactECharts
                  style={{ height: 200 }}
                  option={nestedPieOption}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectSummaryReport;
