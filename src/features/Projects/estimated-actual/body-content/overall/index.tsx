import ReactEcharts from "echarts-for-react";
import React from "react";

import useEstimatedActual from "@/hooks/project/estimated-actual/useEstimatedActual.hook";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  calculatePercentage,
  changeNumberFormat,
} from "@/shared/utils/rp-utils";
import { cn } from "@/shared/utils/utils";

const EstimatedActualOverall = () => {
  const {
    estimatedActualGraph,
    estimatedActualLoading,
    overallPieOption,
    projectDetail,
    projectLoading,
    estimatedActual,
    overallChartRef,
  } = useEstimatedActual();

  const estimatedActualData = [
    {
      title: "Actual Spent Budget",
      value: changeNumberFormat(projectDetail?.data?.rp?.used_rp ?? 0),
      color: "bg-blue-500",
    },
    {
      title: "Budget",
      value: changeNumberFormat(projectDetail?.data?.rp?.sales_rp ?? 0),
      color: "bg-green-500",
    },
    {
      title: "Estimated",
      value: changeNumberFormat(
        Number(projectDetail?.data?.rp?.approved_rp) +
          Number(projectDetail?.data?.rp?.unapproved_rp) ?? 0
      ),
      color: "bg-yellow-400",
    },
  ];

  const individualDepartmentData = [
    // Dev
    {
      title: "Developer",
      value: calculatePercentage(
        estimatedActual?.data?.find((item) => item?.title === "Developer")
          ?.actual ?? 0,
        projectDetail?.data?.rp?.used_rp ?? 0
      ),
      color: "bg-violet-600",
    },
    // QA
    {
      title: "Quality Assurance",
      value: calculatePercentage(
        estimatedActual?.data?.find((item) => item?.title === "QA")?.actual ??
          0,
        projectDetail?.data?.rp?.used_rp ?? 0
      ),
      color: "bg-orange-400",
    },
    // Designer
    {
      title: "Designer",
      value: calculatePercentage(
        estimatedActual?.data?.find((item) => item?.title === "Designer")
          ?.actual ?? 0,
        projectDetail?.data?.rp?.used_rp ?? 0
      ),
      color: "bg-lime-600",
    },
    // Project Management
    {
      title: "Project Management",
      value: calculatePercentage(
        estimatedActual?.data?.find(
          (item) => item?.title === "Project Management"
        )?.actual ?? 0,
        projectDetail?.data?.rp?.used_rp ?? 0
      ),
      color: "bg-red-400",
    },
    // Devops
    {
      title: "Devops",
      value: calculatePercentage(
        estimatedActual?.data?.find((item) => item?.title === "Devops")
          ?.actual ?? 0,
        projectDetail?.data?.rp?.used_rp ?? 0
      ),
      color: "bg-stone-400",
    },
  ];
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-9">
          <p className="text-lg font-medium text-zinc-700">
            Estimated VS Actual - Overall
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
          <div className="flex items-center w-full">
            <div className="shrink-0">
              {estimatedActualData?.map((item) => (
                <div key={item?.title} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={cn(item?.color, "w-2 h-6")}></div>
                    <p className="text-sm text-zinc-700">{item?.title}</p>
                  </div>
                  {projectLoading ? (
                    <div className="pl-4">
                      <Skeleton className="w-20 h-5 mt-2" />
                    </div>
                  ) : (
                    <p className="pl-4 text-2xl font-semibold text-zinc-700">
                      {item?.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {/* Chart */}
            <div className="w-full h-full">
              {estimatedActualLoading ? (
                "Loading"
              ) : (
                <ReactEcharts
                  option={estimatedActualGraph}
                  style={{ height: "300px" }}
                  opts={{ renderer: "svg" }}
                />
              )}
            </div>
          </div>

          <div className="pl-6 border-0 border-l">
            <div className="grid items-center grid-cols-2 gap-4">
              <div className="flex flex-wrap items-center gap-4">
                {individualDepartmentData?.map((item) => (
                  <div key={item?.title} className="w-[160px]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={cn(item?.color, "w-2 h-6")}></div>
                      <p className="text-sm text-zinc-700">{item?.title}</p>
                    </div>
                    {estimatedActualLoading || projectLoading ? (
                      <div className="pl-4">
                        <Skeleton className="w-20 h-5 mt-2" />
                      </div>
                    ) : (
                      <p className="pl-4 text-2xl font-semibold leading-8 text-zinc-700">
                        {item?.value}%
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <ReactEcharts
                  option={overallPieOption}
                  ref={overallChartRef}
                  style={{ height: "300px" }}
                  opts={{ renderer: "svg" }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimatedActualOverall;
