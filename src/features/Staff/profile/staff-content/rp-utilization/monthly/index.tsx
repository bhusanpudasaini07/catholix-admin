import moment from 'moment';
import React from 'react';

import useStaffDetail from '@/hooks/staff/useStaffDetail.hook';
import useStaffUtilization from '@/hooks/staff/useStaffUtilization.hook';
import { DataTable } from '@/shared/components/data-table/data-table';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/shared/components/ui/select';

const MonthlyRPUtilization = () => {
  const {
    monthlyRpColumn,
    monthlyRpData,
    monthlyLoading,
    rpStartYear,
    monthChangeHandler,
  } = useStaffUtilization();
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-9">
          <div className="flex items-center justify-start gap-3">
            <p className="text-lg font-medium text-zinc-700">
              Monthly Budget Utilization
            </p>
          </div>
          <Select
            defaultValue={moment().year().toString()}
            onValueChange={(e) => monthChangeHandler(e)}
          >
            <SelectTrigger className="max-w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: moment().year() - Number(rpStartYear) + 1 },
                (_, i) => Number(rpStartYear) + i
              ).map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DataTable
          data={monthlyRpData ?? []}
          border
          columns={monthlyRpColumn}
          loading={monthlyLoading}
          loadingDataNum={12}
        />
      </CardContent>
    </Card>
  );
};

export default MonthlyRPUtilization;
