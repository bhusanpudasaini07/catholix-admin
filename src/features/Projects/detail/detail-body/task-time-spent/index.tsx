import { useRouter } from 'next/router';
import React from 'react';

import useTaskTimeSpent from '@/hooks/project/detail/useTaskTimeSpent.hook';
import { DataTable } from '@/shared/components/data-table/data-table';
import FilterSearch from '@/shared/components/filter-search';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

const TaskTimeSpent = () => {
  const router = useRouter();
  const { timeLogLoading, timeLogs, columns, setSearchText } =
    useTaskTimeSpent();

  return (
    <Card className="mt-4">
      <CardContent>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center justify-start gap-3">
            <p>Task & Time Spent</p>
            <Button
              variant={"white"}
              onClick={() =>
                router.push(`/projects/${router?.query?.code}/task-time-spent`)
              }
              size={"sm"}
            >
              View All
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <FilterSearch setSearchText={setSearchText} />
          </div>
        </div>
        <div className="overflow-hidden rounded-md grow">
          <DataTable
            border={true}
            columns={columns}
            loading={timeLogLoading}
            data={timeLogs?.data?.slice(0, 10) ?? []}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskTimeSpent;
