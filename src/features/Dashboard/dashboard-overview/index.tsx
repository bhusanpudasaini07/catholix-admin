import React from "react";

import useDashboardOverview from "@/hooks/dashboard/useDashboardOverview.hook";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/utils/utils";
import DashboardOverviewSkeleton from "@/shared/components/skeleton-loading/dashboard/overview-skeleton";
import CustomDateFilter from "@/shared/components/custom-date-filter";

const DashboardOverview = () => {
  const {
    dateRange,
    projectOverviewData,
    clientProjectData,
    inhouseProjectData,
    isLoading,
    setDateRange,
  } = useDashboardOverview();

  return (
    <>
      <Card>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-10">
              <p className="text-lg font-medium text-zinc-700">
                Projects Overview
              </p>

              {/* <DateRangeFilter
                  dateRangeOpen={dateRangeOpen}
                  setDateRangeOpen={setDateRangeOpen}
                  dateRange={dateRange}
                  setDateRange={changeDateRange}
                  buttonClassName="max-w-[250px]"
                  disabled
                /> */}
              <CustomDateFilter
                tabContent={["monthly", "weekly", "date_range", "yearly"]}
                defaultSelected="date_range"
                date={dateRange}
                setDate={setDateRange}
              />
            </div>
            {isLoading ? (
              <DashboardOverviewSkeleton />
            ) : (
              <div>
                <div className="grid grid-cols-3 gap-6 mb-10">
                  {projectOverviewData?.map((item) => (
                    <div
                      className={cn(
                        item?.backgroundColor,
                        "rounded flex items-center py-4 px-6 h-[120px]"
                      )}
                      key={item?.id}
                    >
                      <div className="flex gap-4 items-start">
                        <div>{item?.icon}</div>
                        <div>
                          <p
                            className={cn(
                              item?.valueColor,
                              "text-2xl font-semibold"
                            )}
                          >
                            {item?.value}
                          </p>
                          <p className={cn(item?.titleColor, "text-sm mt-1")}>
                            {item?.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-6 items-start lg:flex-row">
                  {/* Client */}
                  <div className="grow">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-lg font-medium text-zinc-700">
                        Client Project
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                      {clientProjectData?.map((item) => (
                        <div
                          className={cn(item?.backgroundColor, "rounded p-4 ")}
                          key={item?.id}
                        >
                          <p
                            className={cn(
                              item?.valueColor,
                              "text-2xl font-semibold leading-10"
                            )}
                          >
                            {item?.value}
                          </p>
                          <p className={cn(item?.titleColor, "text-sm")}>
                            {item?.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator orientation={"vertical"} className={"h-[250px]"} />
                  {/* Inhouse */}
                  <div className="grow">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-lg font-medium text-zinc-700">
                        In-House Project
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                      {inhouseProjectData?.map((item) => (
                        <div
                          className={cn(item?.backgroundColor, "rounded p-4 ")}
                          key={item?.id}
                        >
                          <p
                            className={cn(
                              item?.valueColor,
                              "text-2xl font-semibold leading-10"
                            )}
                          >
                            {item?.value}
                          </p>
                          <p className={cn(item?.titleColor, "text-sm")}>
                            {item?.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardOverview;
