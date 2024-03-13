import ReactECharts, { EChartsInstance } from "echarts-for-react";
import React from "react";

import { ITypeCount, ITypes } from "@/interface/project-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
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
  categoryColumn: ColumnDef<ITypeCount>[];
  platformColumn: ColumnDef<ITypeCount>[];
  tableData: ITypes | undefined;
  loading: boolean;
  categoryOption: any;
  platformComponentOption: any;
  categoryValue: string;
  platformValue: string;
  setSelectValue: (
    type: "status" | "category" | "platform",
    value: string
  ) => void;
  categoryRef: EChartsInstance;
  platformRef: EChartsInstance;
}

const CategoryPlatform = ({
  categoryColumn,
  platformColumn,
  tableData,
  loading,
  categoryOption,
  platformComponentOption,
  categoryValue,
  platformValue,
  setSelectValue,
  categoryRef,
  platformRef,
}: IProps) => {
  return (
    <div className="grid grid-cols-12 gap-6 mt-6 mb-6">
      {/* Category */}
      <div className="col-span-6 ">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-9">
              <div className="flex items-center justify-start gap-3">
                <p className="text-lg font-medium text-zinc-700">Category</p>
              </div>
              <Select
                defaultValue={categoryValue}
                onValueChange={(e) => setSelectValue("category", e)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utilization">
                    Budget Utilization
                  </SelectItem>
                  <SelectItem value="consumption">
                    Budget Consumption
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <ReactECharts
                ref={categoryRef}
                option={categoryOption}
                opts={{ renderer: "svg" }}
              />
            </div>
            <div className="overflow-hidden rounded-md grow ">
              <DataTable
                columns={categoryColumn}
                border={true}
                loading={loading}
                data={tableData?.data[0]?.count ?? []}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Component */}
      <div className="col-span-6 ">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-9">
              <div className="flex items-center justify-start gap-3">
                <p className="text-lg font-medium text-zinc-700">
                  Platform/Component
                </p>
              </div>
              <Select
                defaultValue={platformValue}
                onValueChange={(e) => setSelectValue("platform", e)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utilization">
                    Budget Utilization
                  </SelectItem>
                  <SelectItem value="consumption">
                    Budget Consumption
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <ReactECharts
                ref={platformRef}
                option={platformComponentOption}
                opts={{ renderer: "svg" }}
              />
            </div>
            <div className="overflow-hidden rounded-md grow ">
              <DataTable
                columns={platformColumn}
                border={true}
                loading={loading}
                data={tableData?.data[1]?.count ?? []}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryPlatform;
