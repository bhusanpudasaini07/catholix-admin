import { ILogEntry, ITimeLogs } from "@/interface/project-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface IProps {
  timeLogLoading: boolean;
  timeLogs: ITimeLogs | undefined;
  columns: ColumnDef<ILogEntry>[];
  setSearchText: (arg: string) => void;
  perPage: number;
  setPerPage: (arg: number) => void;
}

const TaskTimeTable = ({
  timeLogLoading,
  timeLogs,
  columns,
  setPerPage,
  setSearchText,
  perPage,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center justify-start gap-3">
            <p>Task & Time Spent</p>
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
            data={timeLogs?.data?.slice(0, perPage) ?? []}
          />
          <p
            onClick={() => setPerPage(perPage + 10)}
            className="py-4 text-sm font-medium text-center cursor-pointer text-zinc-700"
          >
            Load More
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskTimeTable;
