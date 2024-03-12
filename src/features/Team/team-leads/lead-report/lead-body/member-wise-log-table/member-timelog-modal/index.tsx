import { Activity, Hourglass, TrendingDown } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { FC } from 'react';

import { DataTable } from '@/shared/components/data-table/data-table';
import DataCardSkeleton from '@/shared/components/skeleton-loading/data-card-skeleton';
import TrendModalSkeleton from '@/shared/components/skeleton-loading/lead-report/data-card-skeleton';
import { Card, CardContent } from '@/shared/components/ui/card';
import { calculateTimeLog } from '@/shared/utils/rp-utils';
import { ColumnDef } from '@tanstack/react-table';

interface IProps {
  staffDailyLog: any;
  staffDailyLogLoading: boolean;
}
const calculateHoursAndMinutes = (data: any) => {
  const { hours, minutes } = calculateTimeLog(Number(data));
  return `${hours}H ${minutes}M`;
};
const MemberTimeLogModal: FC<IProps> = ({
  staffDailyLog,
  staffDailyLogLoading,
}) => {
  const columns: ColumnDef<any>[] = [
    {
      id: "time",
      accessorKey: "time",
      header: "Time Logged",
      cell: ({ row }) => {
        return (
          <div className="text-sm font-medium text-zinc-500">
            {moment.duration(row?.original?.time, "seconds").hours() > 0 &&
              moment.duration(row?.original?.time, "seconds").hours() +
                "H" +
                " "}
            {moment.duration(row?.original?.time, "seconds").minutes()}M
          </div>
        );
      },
      enableHiding: false,
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget",
      cell: ({ row }) => (
        <div className="text-sm font-medium text-zinc-500">
          {row.getValue("rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "project_title",
      accessorKey: "project_title",
      header: "Project",
      cell: ({ row }) => (
        <Link
          className="text-sm font-medium text-blue-500"
          href={`/projects/${row?.original?.project_code}`}
        >
          {row.getValue("project_title")}
        </Link>
      ),
      enableHiding: false,
    },
    {
      id: "task_title",
      accessorKey: "task_title",
      header: "Task",
      cell: ({ row }) => (
        <Link
          href={row?.original?.task_url}
          className="text-sm font-medium text-blue-500"
        >
          {row.getValue("task_title")}
        </Link>
      ),
      enableHiding: false,
    },
  ];

  return (
    <div className="flex flex-col max-h-[700px] overflow-auto">
      {staffDailyLogLoading && <TrendModalSkeleton />}
      {staffDailyLog?.data?.map((daily: any) => (
        <div className="mb-4" key="">
          <Card className="h-[200px] mb-2">
            <CardContent>
              <div className="flex items-center justify-start gap-3 mb-4">
                <h5 className="font-medium text-zinc-700">{daily?.date}</h5>
              </div>
              <div className="flex justify-between gap-5 pr-20 mt-9">
                <div className="flex items-start justify-center gap-2">
                  <div className="mt-0 text-blue-500">
                    <Hourglass size={36} />
                  </div>
                  <div className="ml-1">
                    <p className="text-3xl font-semibold text-blue-500">
                      {/* {hours}H {minutes}M */}
                      {calculateHoursAndMinutes(daily?.used_time)}
                    </p>
                    <p className="text-sm text-blue-600">Total Time Logged</p>
                  </div>
                </div>
                <div className="flex items-start justify-center gap-2">
                  <div className="mt-0 text-green-500">
                    <Activity size={36} />
                  </div>
                  <div className="ml-1">
                    <p className="text-3xl font-semibold text-green-500">
                      {daily?.used_rp}
                    </p>
                    <p className="text-sm font-normal text-green-600">
                      Spent Budget
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-center gap-2">
                  <div className="mt-0 text-red-500">
                    <TrendingDown size={36} />
                  </div>
                  <div className="ml-1">
                    <p className="text-3xl font-semibold text-red-500">
                      {daily?.loss_rp}
                    </p>
                    <p className="text-sm text-red-600">Loss Budget</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <DataTable
            loading={staffDailyLogLoading}
            border
            columns={columns}
            data={daily?.task || []}
          />
        </div>
      ))}
    </div>
  );
};

export default MemberTimeLogModal;
