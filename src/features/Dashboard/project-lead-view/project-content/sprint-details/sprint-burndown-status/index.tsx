import ReactECharts, {
  EChartsInstance,
  EChartsOption,
} from "echarts-for-react";
import React from "react";

import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/project-details-tab";
import { TabsContent } from "@/shared/components/ui/tabs";
import { IProjectSprintDetail } from "@/interface/project-interface";
import PieChartSkeleton from "@/shared/components/skeleton-loading/pie-chart-skeleton";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface IProps {
  tabValue: string;
  setTabValue: (arg: string) => void;
  tabOptions: any;
  taskChart: EChartsOption;
  sprintDetail: IProjectSprintDetail | undefined;
  loading: boolean;
  sprintBurndownOption: EChartsOption;
  statusOption: EChartsOption;
  chartRef: EChartsInstance;
}

const ProjectDashboardSprintStatus = ({
  tabValue,
  setTabValue,
  tabOptions,
  taskChart,
  sprintDetail,
  loading,
  sprintBurndownOption,
  statusOption,
  chartRef,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue={tabValue} onValueChange={(e) => setTabValue(e)}>
          <TabsList>
            {tabOptions?.map((tab: any) => (
              <TabsTrigger key={tab?.value} value={tab?.value}>
                {tab?.icon}
                {tabValue === tab?.value && <span>{tab?.title}</span>}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="task">
            <div className="w-full">
              {loading ? (
                <PieChartSkeleton height={200} width={200} />
              ) : (
                <ReactECharts
                  option={taskChart}
                  style={{ height: 200 }}
                  opts={{ renderer: "svg" }}
                />
              )}
              <div className="grid grid-cols-3 gap-2">
                <div className="px-3 border-r text-end">
                  {loading ? (
                    <Skeleton className="mb-1 ml-auto w-10 h-4" />
                  ) : (
                    <p className="text-sm font-medium text-zinc-700">
                      {sprintDetail?.total_task_count}
                    </p>
                  )}
                  <p className="text-xs text-zinc-500">Total Tasks</p>
                </div>
                <div className="px-3 border-r text-end">
                  {loading ? (
                    <Skeleton className="mb-1 ml-auto w-10 h-4" />
                  ) : (
                    <p className="text-sm font-medium text-zinc-700">
                      {sprintDetail?.open_task_count}
                    </p>
                  )}

                  <p className="text-xs text-zinc-500">Open Tasks</p>
                </div>
                <div className="px-3 text-end">
                  {loading ? (
                    <Skeleton className="mb-1 ml-auto w-10 h-4" />
                  ) : (
                    <p className="text-sm font-medium text-zinc-700">
                      {sprintDetail?.closed_task_count}
                    </p>
                  )}
                  <p className="text-xs text-zinc-500">Closed Tasks</p>
                </div>
              </div>
            </div>
            {/* <ProjectDetailStatus
              option={statusOption}
              columns={statusColumn}
              statusData={projectTaskLabelData?.data?.find(
                (item) => item?.type === "Status"
              )}
              loading={projectTaskLabelLoading}
              chartRef={chartRef}
            /> */}
          </TabsContent>
          <TabsContent value="status">
            {loading ? (
              <PieChartSkeleton height={200} width={200} />
            ) : (
              <ReactECharts
                option={statusOption}
                ref={chartRef}
                style={{ height: 200 }}
                opts={{ renderer: "svg" }}
              />
            )}

            {/* <ProjectDetailStatus
              option={statusOption}
              columns={statusColumn}
              statusData={projectTaskLabelData?.data?.find(
                (item) => item?.type === "Status"
              )}
              loading={projectTaskLabelLoading}
              chartRef={chartRef}
            /> */}
          </TabsContent>
          <TabsContent value="burndown">
            {loading ? (
              <Skeleton className="w-full h-[200px]" />
            ) : (
              <ReactECharts
                option={sprintBurndownOption}
                style={{ height: 200 }}
                opts={{ renderer: "svg" }}
              />
            )}

            {/* <ProjectDetailStatus
              option={statusOption}
              columns={statusColumn}
              statusData={projectTaskLabelData?.data?.find(
                (item) => item?.type === "Status"
              )}
              loading={projectTaskLabelLoading}
              chartRef={chartRef}
            /> */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProjectDashboardSprintStatus;
