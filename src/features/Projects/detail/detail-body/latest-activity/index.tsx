import { useRouter } from 'next/router';
import React from 'react';

import useLatestActivities from '@/hooks/project/detail/useLatestActivities.hook';
import { DataTable } from '@/shared/components/data-table/data-table';
import DateRangeFilter from '@/shared/components/date-range-filter';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

const LatestActivity = () => {
  const router = useRouter();
  const {
    columns,
    latestActivities,
    isLoading,
    dateRange,
    setDateRange,
    dateRangeOpen,
    setDateRangeOpen,
  } = useLatestActivities();
  return (
    <Card className="h-auto">
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center justify-start gap-3">
            <p className="text-lg font-medium text-zinc-700">
              Latest Activities
            </p>
            <Button
              variant={"white"}
              onClick={() =>
                router.push(
                  `/projects/${router?.query?.code}/latest-activities`
                )
              }
              size={"sm"}
            >
              View All
            </Button>
          </div>
          <div className="w-[30%]">
            <DateRangeFilter
              dateRangeOpen={dateRangeOpen}
              setDateRangeOpen={setDateRangeOpen}
              setDateRange={setDateRange}
              dateRange={dateRange}
            />
          </div>
        </div>
        <div className="overflow-hidden rounded-md grow">
          <DataTable
            border={true}
            loading={isLoading}
            columns={columns}
            data={latestActivities?.data || []}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestActivity;
