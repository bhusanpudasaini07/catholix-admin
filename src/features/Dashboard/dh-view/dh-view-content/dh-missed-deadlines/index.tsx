import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface IProps {
  columns: ColumnDef<any>[];
}

const DHMissedDeadlines = ({ columns }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-7">
          <p className="text-lg font-medium text-zinc-700">Missed Deadlines</p>
        </div>

        <DataTable
          columns={columns}
          data={[]}
          border
          headerSticky
          height="max-h-[200px]"
          lottieHeight={80}
          loading={false}
          loadingDataNum={5}
        />
      </CardContent>
    </Card>
  );
};

export default DHMissedDeadlines;
