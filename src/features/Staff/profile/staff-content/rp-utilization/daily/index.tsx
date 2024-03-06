import useStaffUtilization from "@/hooks/staff/useStaffUtilization.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import DateRangeFilter from "@/shared/components/date-range-filter";
import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

const DailyRPUtilization = () => {
  const {
    dailyRpColumn,
    date,
    dateChangeHandler,
    dailyLoading,
    dailyDateOpen,
    setDailyDateOpen,
    dailyRpData,
  } = useStaffUtilization();

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-9">
          <div className="flex items-center justify-start gap-3">
            <p className="text-lg font-medium text-zinc-700">
              Daily Budget Utilization
            </p>
          </div>
          <DateRangeFilter
            buttonClassName="max-w-[300px]"
            dateRange={date}
            setDateRange={dateChangeHandler}
            dateRangeOpen={dailyDateOpen}
            setDateRangeOpen={setDailyDateOpen}
          />
        </div>

        <DataTable
          data={dailyRpData ?? []}
          border
          columns={dailyRpColumn}
          loading={dailyLoading}
          loadingDataNum={12}
        />
      </CardContent>
    </Card>
  );
};

export default DailyRPUtilization;
