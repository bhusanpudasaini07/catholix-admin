import ReactECharts, { EChartsOption } from "echarts-for-react";
import React from "react";

import { IProjectTaskBugRatio } from "@/interface/project-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  columns: ColumnDef<IProjectTaskBugRatio>[];
  individualBugTaskColumn: ColumnDef<any>[];
  data: IProjectTaskBugRatio[];
  loading: boolean;
  bugRatioOption: EChartsOption;
  bugOption: EChartsOption;
}

const BugTaskRatio = ({
  data,
  columns,
  loading,
  individualBugTaskColumn,
  bugRatioOption,
  bugOption,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-4">
          <p className="text-lg font-medium text-zinc-700">
            Bugs Vs Task Ratio (Platform/Component)
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <DataTable
              columns={columns}
              border={true}
              loading={loading}
              data={data}
            />
          </div>
          <div>
            <p className="text-base font-medium text-zinc-700">PLAT_API</p>

            <div className="grid grid-cols-2 max-w-[600px] m-auto mb-12">
              <div className="flex flex-col items-center">
                <div className="w-full">
                  <ReactECharts
                    option={bugRatioOption}
                    opts={{ renderer: "svg" }}
                    style={{ height: 200 }}
                  />
                </div>
                <p className="text-sm font-medium text-zinc-500">
                  Bug to Task Ratio
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full">
                  <ReactECharts
                    option={bugOption}
                    opts={{ renderer: "svg" }}
                    style={{ height: 200 }}
                  />
                </div>
                <p className="text-sm font-medium text-zinc-500">Bug</p>
              </div>
            </div>

            <DataTable
              data={[]}
              columns={individualBugTaskColumn}
              border
              lottieHeight={100}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BugTaskRatio;
