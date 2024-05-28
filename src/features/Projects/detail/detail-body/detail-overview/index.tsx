import ReactEcharts from "echarts-for-react";
import {
  AlignCenterVertical,
  BarChartBig,
  FileCheck2,
  LineChart,
  PieChart,
} from "lucide-react";
import moment from "moment";
import { useRouter } from "next/router";

import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";
import useProjectReleases from "@/hooks/project/detail/useProjectReleases.hook";
import useProjectSales from "@/hooks/project/detail/useProjectSales.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import ProjectDetailSkeleton from "@/shared/components/skeleton-loading/project/detail/detail-skeleton";
import ProjectDurationSkeleton from "@/shared/components/skeleton-loading/project/detail/project-duration-skeleton";
import TaskTimeLogsSkeleton from "@/shared/components/skeleton-loading/project/detail/task-time-logs-skeleton";
import TotalSalesSkeleton from "@/shared/components/skeleton-loading/project/detail/total-sales-skeleton";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import { Progress } from "@/shared/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/project-details-tab";
import BurndownSvg from "@/shared/svg/burndown";
import {
  calculateDeadlinePercentValue,
  calculateTime,
  calculateTimeLog,
  changeNumberFormat,
  showDeadline,
} from "@/shared/utils/rp-utils";
import { cn } from "@/shared/utils/utils";

import UsedRp from "../used-rp-chart/usedRp";
import ProjectDetailStatus from "./status";
import useLatestTrend from "@/hooks/project/detail/useLatestTrend.hook";

const DetailOverview = () => {
  const router = useRouter();
  const {
    isLoading,
    projectDetail,
    salesModalOpen,
    setSalesModalOpen,
    salesColumn,
    tabValue,
    setTabValue,
    projectTaskLabelData,
    projectTaskLabelLoading,
    statusColumn,
    statusOption,
    burndownOption,
    changeRoute,
    chartRef,
    estimatedActualGraph,
    trendOption,
  } = useProjectDetail();

  const { salesRp, salesLoading } = useProjectSales();

  const { projectReleases, columns, isLoading: loading } = useProjectReleases();

  const { daysValue } = showDeadline(projectDetail?.data?.dates?.deadline!);

  const { value, totalDays } = calculateDeadlinePercentValue(
    projectDetail?.data?.dates?.start_date!,
    projectDetail?.data?.dates?.deadline!
  );
  const { totalDays: completedDays } = calculateDeadlinePercentValue(
    projectDetail?.data?.dates?.start_date!,
    projectDetail?.data?.dates?.last_log_date!
  );

  const barValue = projectDetail?.data?.dates?.time_completion_percentage!;

  // Calcualting total time into hours and minutes
  const { hours, minutes } = calculateTimeLog(
    Number(projectDetail?.data?.time?.used_time)
  );

  const tabOptions = [
    {
      value: "latest_task_trend",
      title: "Latest Task Trend",
      icon: <BarChartBig size={18} />,
      buttonName: "Task",
    },
    {
      value: "status",
      title: "Status",
      icon: <PieChart size={18} />,
      buttonName: "Status",
    },

    {
      value: "burndown",
      title: "Burndown Chart",
      icon: <BurndownSvg size={18} />,
      buttonName: "Burndown",
    },
    {
      value: "estimated_actual",
      title: "Estimated VS Actual",
      icon: <AlignCenterVertical size={18} />,
      buttonName: "Budget",
    },
    {
      value: "project_release",
      title: "Project Releases",
      icon: <FileCheck2 size={18} />,
      buttonName: "",
    },
  ];

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

  return (
    <div className="grid grid-cols-12 gap-4">
      {isLoading ? (
        <div className="col-span-12 xl:col-span-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <TotalSalesSkeleton />
            <ProjectDurationSkeleton />
          </div>
          <div>
            <TaskTimeLogsSkeleton />
          </div>
        </div>
      ) : (
        <div className="col-span-12 xl:col-span-6">
          <div className="grid grid-cols-12 gap-4 h-full">
            {/* RP Used */}
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <Card>
                <CardContent>
                  <div className="flex items-center justify-start gap-4 mb-4 relative z-[2]">
                    <p className="text-lg font-medium text-zinc-700">
                      Budget Utilization
                    </p>{" "}
                    <div className="flex gap-2 items-center">
                      <Button
                        variant={"white"}
                        onClick={() =>
                          router?.push(
                            `/projects/${router?.query?.code}/rp-estimation`
                          )
                        }
                        size={"sm"}
                      >
                        Estimation
                      </Button>
                      <Button
                        onClick={() => setSalesModalOpen(true)}
                        size={"sm"}
                        variant={"white"}
                      >
                        Sales
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-10">
                    <div>
                      <div className="mb-3">
                        <h3 className="text-3xl font-semibold 2xl:text-4xl text-zinc-800">
                          {projectDetail?.data?.rp?.used_rp
                            ? changeNumberFormat(
                                projectDetail?.data?.rp?.used_rp
                              )
                            : 0}
                        </h3>
                        <p className="text-sm font-normal text-zinc-500">
                          Units Spent
                        </p>
                      </div>
                      <p className="text-sm font-medium text-zinc-700">
                        <span className="font-normal text-zinc-500">
                          Sales Units:
                        </span>{" "}
                        {projectDetail?.data?.rp?.sales_rp
                          ? changeNumberFormat(
                              projectDetail?.data?.rp?.sales_rp
                            )
                          : 0}
                      </p>
                    </div>
                    <div className="min-w-[120px]">
                      <UsedRp rp={projectDetail?.data?.rp!} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Project Duration */}
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <Card>
                <CardContent className="flex flex-col justify-between items-start h-full">
                  <h5 className="mb-3 text-lg font-medium text-zinc-700">
                    Project Duration
                  </h5>
                  <div className="mt-auto w-full">
                    <div className="flex justify-between items-center">
                      {projectDetail?.data?.status === "Closed" ? (
                        <h4 className="mb-1 text-2xl font-medium text-green-500">
                          Completed
                        </h4>
                      ) : projectDetail?.data?.status === "On Hold" ? (
                        <h4 className="mb-1 text-2xl font-medium text-red-500">
                          On Hold
                        </h4>
                      ) : (
                        <div className="flex flex-wrap gap-1 items-center">
                          <h4
                            className={cn(
                              daysValue && daysValue > 0
                                ? "text-zinc-800"
                                : "text-red-500",
                              "mb-1 font-medium text-xl"
                            )}
                          >
                            {daysValue && Math.abs(daysValue)}
                          </h4>
                          {daysValue && daysValue > 0 ? (
                            <p className="text-sm text-zinc-500">
                              Days Remaining
                            </p>
                          ) : (
                            <p className="text-sm text-red-500">
                              Additional Days
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 items-center">
                        <h4 className="mb-1 text-xl font-medium text-zinc-800">
                          {projectDetail?.data?.status &&
                          ["Closed", "On Hold"].includes(
                            projectDetail?.data?.status
                          )
                            ? completedDays ?? 0
                            : Number(totalDays) - Number(daysValue) ?? 0}
                        </h4>
                        <p className="text-sm text-zinc-500">Days Elapsed</p>
                      </div>
                    </div>

                    <Progress
                      className={cn("h-2 my-2", {
                        "[&>div]:bg-red-500": barValue >= 90,
                        "[&>div]:bg-orange-500":
                          barValue > 50 && barValue <= 90,
                        "[&>div]:bg-green-500": barValue < 50,
                        "[&>div]:bg-gray-500": barValue === 0,
                      })}
                      value={barValue}
                    />
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm text-zinc-700">
                        {moment(projectDetail?.data?.dates?.start_date).format(
                          "Do MMM, YYYY"
                        )}
                      </p>
                      <p className="text-sm text-zinc-700">
                        {moment(projectDetail?.data?.dates?.deadline).format(
                          "Do MMM, YYYY"
                        )}
                      </p>
                    </div>
                    <p className="mt-2 text-sm font-normal text-zinc-500">
                      Total Estimation:{" "}
                      <span className="font-semibold text-zinc-700">
                        {totalDays >= 0 ? totalDays : "N/A"} Days
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Task and Time Logs */}
            <div className="col-span-12">
              <Card>
                <CardContent>
                  <div className="flex gap-3 justify-start items-center mb-8">
                    <h5 className="text-lg font-medium text-zinc-700">
                      Task & Time Logs
                    </h5>
                    <Button
                      variant={"white"}
                      onClick={() =>
                        router?.push(
                          `/projects/${router?.query?.code}/task-time-spent`
                        )
                      }
                      size={"sm"}
                    >
                      More Details
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                    {/* Total */}
                    <div className={`p-4 rounded-md bg-zinc-100`}>
                      <h3 className="mb-2 text-2xl font-semibold text-zinc-700">
                        {projectDetail?.data?.task?.all_task_count ?? 0}
                      </h3>
                      <p className="text-sm text-zinc-900">Total Tasks</p>
                    </div>

                    {/* Open */}
                    <div className={`p-4 text-blue-500 bg-blue-50 rounded-md`}>
                      <h3 className="mb-2 text-2xl font-medium">
                        {projectDetail?.data?.task?.open_task_count ?? 0}
                      </h3>
                      <p className="text-sm text-blue-700">Open Tasks</p>
                    </div>

                    {/* Bugs */}
                    <div
                      className={`p-4 text-orange-500 bg-orange-50 rounded-md`}
                    >
                      <h3 className="mb-2 text-2xl font-medium">
                        {projectDetail?.data?.task?.bug_count ?? 0}
                      </h3>
                      <p className="text-sm text-orange-700">Bugs</p>
                    </div>

                    {/* Total Time Spent */}
                    <div className="pl-3 border-l">
                      <div
                        className={`flex flex-col gap-2 justify-start items-start p-4 rounded-md bg-zinc-100`}
                      >
                        {hours < 1 ? (
                          <h3 className="text-2xl font-medium text-zinc-700">
                            {`${minutes}M`}
                          </h3>
                        ) : (
                          <h3 className="text-2xl font-medium text-zinc-700">
                            {`${calculateTime(
                              Number(projectDetail?.data?.time?.used_time)
                            )}H`}
                          </h3>
                        )}

                        <p className="text-sm text-zinc-900">
                          Total Time Spent
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="col-span-12 xl:col-span-6">
          <ProjectDetailSkeleton />
        </div>
      ) : (
        <div className="col-span-12 xl:col-span-6">
          <Card>
            <CardContent>
              <Tabs
                defaultValue={tabValue}
                onValueChange={(e) => setTabValue(e)}
              >
                <div className="flex items-center justify-start gap-4 h-[45px] mb-7">
                  <TabsList>
                    {tabOptions?.map((tab) => (
                      <TabsTrigger key={tab?.value} value={tab?.value}>
                        {tab?.icon}
                        {tabValue === tab?.value && <span>{tab?.title}</span>}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {tabValue !== "project_release" && (
                    <Button variant={"white"} size={"sm"} onClick={changeRoute}>
                      {
                        tabOptions?.find((item) => item?.value === tabValue)
                          ?.buttonName
                      }{" "}
                      Details
                    </Button>
                  )}
                </div>
                <TabsContent value="status">
                  <ProjectDetailStatus
                    option={statusOption}
                    columns={statusColumn}
                    statusData={projectTaskLabelData?.data?.find(
                      (item) => item?.type === "Status"
                    )}
                    loading={projectTaskLabelLoading}
                    chartRef={chartRef}
                  />
                </TabsContent>
                <TabsContent value="latest_task_trend">
                  <ReactEcharts
                    option={trendOption}
                    opts={{ renderer: "svg" }}
                  />
                </TabsContent>
                <TabsContent value="burndown">
                  <ReactEcharts
                    option={burndownOption}
                    opts={{ renderer: "svg" }}
                  />
                </TabsContent>
                <TabsContent value="estimated_actual">
                  <div className="flex gap-4 items-center">
                    <div className="w-[200px]">
                      {estimatedActualData?.map((item) => (
                        <div key={item?.title} className="mb-6 last:mb-0">
                          <div className="flex gap-2 items-center mb-1">
                            <div className={cn(item?.color, "w-2 h-6")}></div>
                            <p className="text-sm text-zinc-700">
                              {item?.title}
                            </p>
                          </div>
                          <p className="pl-4 text-2xl font-semibold text-zinc-700">
                            {item?.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="w-full grow">
                      <ReactEcharts
                        option={estimatedActualGraph}
                        style={{ height: "300px" }}
                        opts={{ renderer: "svg" }}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="project_release">
                  <DataTable
                    columns={columns}
                    data={projectReleases?.data?.slice(0, 3) ?? []}
                    border
                    lottieHeight={100}
                    lottieWidth={100}
                    loading={loading}
                    height="max-h-[320px]"
                    headerSticky
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sales Modal */}
      <Dialog open={salesModalOpen} onOpenChange={setSalesModalOpen}>
        <DialogContent className="p-6">
          <DialogHeader className="text-lg font-bold text-color">
            Sales Budget
          </DialogHeader>
          <DataTable
            border={true}
            data={salesRp?.data}
            loading={salesLoading}
            columns={salesColumn}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailOverview;
