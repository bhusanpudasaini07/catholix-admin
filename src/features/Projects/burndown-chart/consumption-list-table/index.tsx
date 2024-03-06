import { IBurndownDate, IDailyRP } from "@/interface/project-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React from "react";

interface IProps {
  columns: ColumnDef<IBurndownDate>[];
  data: any;
  loading: boolean;
  date: string;
  dailyLoading: boolean;
  dailyRPColumns: ColumnDef<IDailyRP>[];
  dailyTableData: IDailyRP[];
}

const ConsumptionListTable = ({
  columns,
  data,
  date,
  loading,
  dailyRPColumns,
  dailyLoading,
  dailyTableData,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-4 mb-10">
          <p className="text-lg font-medium text-zinc-700">
            Budget Consumption List
          </p>
        </div>
        <div className="grid grid-cols-5 gap-12">
          <div className="col-span-2">
            <DataTable
              columns={columns}
              data={data}
              border={true}
              loading={loading}
              headerSticky={true}
              height="max-h-[600px]"
            />
          </div>
          <div className="col-span-3">
            <p className="text-base font-medium mb-7 text-zinc-700">
              [{moment(date).format("ll")}] - Daily Budget Detail
            </p>
            <DataTable
              columns={dailyRPColumns}
              data={dailyTableData ?? []}
              border
              loading={dailyLoading}
              headerSticky
              height="max-h-[500px]"
              total={[
                {
                  columnId: "time",
                  format: (value) => {
                    return `${
                      moment.duration(value, "seconds").hours() > 0 &&
                      moment.duration(value, "seconds").hours() + "H"
                    } ${moment.duration(value, "seconds").minutes() + "M"}`;
                  },
                },
                {
                  columnId: "rp",
                  format: (value) => `${value.toFixed(2)}`,
                },
              ]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsumptionListTable;
