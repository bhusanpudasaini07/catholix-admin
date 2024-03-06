import useStaffDetail from "@/hooks/staff/useStaffDetail.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import DateRangeFilter from "@/shared/components/date-range-filter";
import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

const DailyRPUtilization = () => {
  const { dailyRpColumn } = useStaffDetail();
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-9">
          <div className="flex items-center justify-start gap-3">
            <p className="text-lg font-medium text-zinc-700">
              Daily RP Utilization
            </p>
          </div>
          <DateRangeFilter
            buttonClassName="max-w-[300px]"
            dateRange={{}}
            setDateRange={() => ""}
            dateRangeOpen={false}
            setDateRangeOpen={() => ""}
            setPageNumber={() => 1}
          />
        </div>

        <DataTable data={[]} border columns={dailyRpColumn} />
      </CardContent>
    </Card>
  );
};

export default DailyRPUtilization;
