import React from "react";

import useStaffUtilization from "@/hooks/staff/useStaffUtilization.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import DateRangeFilter from "@/shared/components/date-range-filter";
import { Card, CardContent } from "@/shared/components/ui/card";

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
        <div className="flex justify-between items-center mb-9">
          <div className="flex gap-3 justify-start items-center">
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
          headerSticky
          columns={dailyRpColumn}
          loading={dailyLoading}
          loadingDataNum={12}
          height="max-h-[400px]"
        />
      </CardContent>
    </Card>
  );
};

export default DailyRPUtilization;
