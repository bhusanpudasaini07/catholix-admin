import ReactECharts, { EChartsInstance } from "echarts-for-react";

import { IType, ITypeCount } from "@/interface/project-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  columns: ColumnDef<ITypeCount>[];
  statusData: IType | undefined;
  loading: boolean;
  typeOption: any;
  selectValue: string;
  setSelectValue: (
    type: "status" | "category" | "platform",
    value: string
  ) => void;
  chartRef: EChartsInstance;
}

const Status = ({
  columns,
  loading,
  statusData,
  typeOption,
  selectValue,
  setSelectValue,
  chartRef,
}: IProps) => {
  return (
    <Card className="mt-4">
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-3 justify-start items-center">
            <p className="text-lg font-medium text-zinc-700">Status</p>
          </div>
          <Select
            defaultValue={selectValue}
            onValueChange={(e) => setSelectValue("status", e)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder="Budget Utilization"
                defaultValue={"Budget Utilization"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utilization">Budget Utilization</SelectItem>
              <SelectItem value="consumption">Budget Consumption</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="overflow-hidden col-span-6 rounded-md grow">
            <DataTable
              border={true}
              loading={loading}
              columns={columns}
              data={statusData?.count ?? []}
            />
          </div>
          <div className="col-span-6 max-h-[400px] w-auto">
            <ReactECharts
              ref={chartRef}
              option={typeOption}
              opts={{ renderer: "svg" }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Status;
