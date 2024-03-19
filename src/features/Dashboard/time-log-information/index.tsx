import React from "react";

import useDashboardTimeLog from "@/hooks/dashboard/useDashboardTimeLog.hook";
import { Card, CardContent } from "@/shared/components/ui/card";
import DatePicker from "@/shared/components/ui/date-picker";
import DashboardTimeLogSkeleton from "@/shared/components/skeleton-loading/dashboard/time-log-skeleton";

const TimeLogInformation = () => {
  const { date, changeDate, timeLogData, isLoading } = useDashboardTimeLog();
  return (
    <>
      {isLoading ? (
        <DashboardTimeLogSkeleton />
      ) : (
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-10">
              <p className="text-lg font-medium text-zinc-700">
                Time-log Information
              </p>

              <DatePicker
                className="w-[200px]"
                mode={"single"}
                date={date}
                text="Select Date"
                setDate={changeDate}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {timeLogData?.map((item) => (
                <div
                  key={item?.id}
                  className="px-6 py-4 border rounded border-zinc-100 h-[120px] flex items-center"
                >
                  <div className="flex items-start gap-4">
                    {item?.icon}
                    <div>
                      <p className="text-2xl font-semibold leading-10 text-zinc-700">
                        {item?.value}
                      </p>
                      <p className="text-sm text-zinc-700">{item?.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TimeLogInformation;
