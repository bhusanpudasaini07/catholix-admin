import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { calculateTimeLog } from "@/shared/utils/rp-utils";
import { ColumnDef } from "@tanstack/react-table";
import { Activity, Hourglass, TrendingDown } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface IProps {
  staffDailyLog: any;
  staffDailyLogLoading: boolean;
}

const MemberTimeLogModal: FC<IProps> = ({
  staffDailyLog,
  staffDailyLogLoading,
}) => {
  const { hours, minutes } = calculateTimeLog(
    Number(staffDailyLog?.data?.used_time)
  );
  const columns: ColumnDef<any>[] = [
    {
      id: "time",
      accessorKey: "time",
      header: "Time Logged",
      cell: ({ row }) => (
        <div className="text-zinc-500 text-base font-medium">
          {row.getValue("time")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "RP",
      cell: ({ row }) => (
        <div className="text-zinc-500 text-base font-medium">
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
          className="text-blue-500 text-base font-medium"
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
        <Link href={""} className="text-blue-500 text-base font-medium">
          {row.getValue("task_title")}
        </Link>
      ),
      enableHiding: false,
    },
  ];

  return (
    <div className="flex flex-col max-h-[700px] overflow-auto">
      <div className="mb-4">
        <Card className="h-[200px] mb-2">
          <CardContent>
            <div className="flex items-center justify-start gap-3 mb-4">
              <h5 className="font-medium text-zinc-700">
                {staffDailyLog?.data?.date}
              </h5>
            </div>
            <div className="flex justify-between gap-5 pr-20 mt-9">
              <div className="flex items-start justify-center gap-2">
                <div className="mt-0 text-blue-500">
                  <Hourglass size={36} />
                </div>
                <div className="ml-1">
                  <p className="text-3xl font-semibold text-blue-500">
                    {hours}H {minutes}M
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
                    {staffDailyLog?.data?.used_rp}
                  </p>
                  <p className="text-sm font-normal text-green-600">spent RP</p>
                </div>
              </div>
              <div className="flex items-start justify-center gap-2">
                <div className="mt-0 text-red-500">
                  <TrendingDown size={36} />
                </div>
                <div className="ml-1">
                  <p className="text-3xl font-semibold text-red-500">
                    {staffDailyLog?.data?.loss_rp}
                  </p>
                  <p className="text-sm text-red-600">Loss RP</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <DataTable
          loading={staffDailyLogLoading}
          border
          columns={columns}
          data={staffDailyLog?.data?.task || []}
        />
      </div>
    </div>
  );
};

export default MemberTimeLogModal;
