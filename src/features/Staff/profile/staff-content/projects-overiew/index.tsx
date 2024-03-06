import useStaffDetail from "@/hooks/staff/useStaffDetail.hook";
import useStaffProjectOverview from "@/hooks/staff/useStaffProjectOverview.hook";
import DateRangeFilter from "@/shared/components/date-range-filter";
import TaskTimeLogsSkeleton from "@/shared/components/skeleton-loading/project/detail/task-time-logs-skeleton";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/utils";
import React from "react";

const ProjectsOverview = () => {
  const {
    projectStates,
    date,
    setDate,
    overviewDateOpen,
    setOverviewDateOpen,
    staffProjectStatusLoading,
  } = useStaffProjectOverview();

  const projectData = [
    // Total
    {
      title: "Total Projects",
      data: projectStates?.total,
      background: "bg-zinc-100",
      dataColor: "text-zinc-700",
      titleColor: "tetx-zinc-900",
    },
    // Clients
    {
      title: "Client Projects",
      data: projectStates?.client,
      background: "bg-blue-100",
      dataColor: "text-blue-500",
      titleColor: "text-blue-700",
    },
    // In-House
    {
      title: "In-house Projects",
      data: projectStates?.inhouse,
      background: "bg-green-100",
      dataColor: "text-green-500",
      titleColor: "text-green-700",
    },
    // Projects at Risk
    {
      title: "Project at Risk",
      data: projectStates?.risk,
      background: "bg-red-100",
      dataColor: "text-red-500",
      titleColor: "text-red-700",
    },
  ];
  return (
    <>
      {staffProjectStatusLoading ? (
        <TaskTimeLogsSkeleton />
      ) : (
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-9">
              <div className="flex items-center justify-start gap-3 ">
                <p className="text-lg font-medium text-zinc-700">
                  Projects Overview
                </p>
              </div>
              <div className="w-full max-w-[250px]">
                <DateRangeFilter
                  dateRange={date}
                  setDateRange={setDate}
                  dateRangeOpen={overviewDateOpen}
                  setDateRangeOpen={setOverviewDateOpen}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              {projectData?.map((item) => (
                <div
                  key={item?.title}
                  className={cn(item?.background, "rounded p-4")}
                >
                  <p
                    className={cn(
                      item?.dataColor,
                      "text-2xl font-semibold mb-2"
                    )}
                  >
                    {item?.data}
                  </p>
                  <p className={cn(item?.titleColor, "text-sm")}>
                    {item?.title}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProjectsOverview;
