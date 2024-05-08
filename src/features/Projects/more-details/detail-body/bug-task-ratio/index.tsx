import ReactECharts, {
  EChartsInstance,
  EChartsOption,
} from "echarts-for-react";
import React from "react";

import {
  IProjectTaskBugRatio,
  IProjectTimeMembers,
} from "@/interface/project-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/shared/components/ui/skeleton";
import PieChartSkeleton from "@/shared/components/skeleton-loading/pie-chart-skeleton";

interface IProps {
  columns: ColumnDef<IProjectTaskBugRatio>[];
  individualBugTaskColumn: ColumnDef<any>[];
  data: IProjectTaskBugRatio[];
  loading: boolean;
  bugRatioOption: EChartsOption;
  bugOption: EChartsOption;
  individualBugLoading: boolean;
  individualBugData: IProjectTimeMembers[];
  bugsRef: EChartsInstance;
  bugTaskRef: EChartsInstance;
  platId: string;
}

const BugTaskRatio = ({
  data,
  columns,
  loading,
  individualBugTaskColumn,
  bugRatioOption,
  bugOption,
  individualBugLoading,
  individualBugData,
  bugsRef,
  bugTaskRef,
  platId,
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
            {loading || individualBugLoading ? (
              <Skeleton className="w-20 h-4" />
            ) : (
              <p className="mb-6 text-base font-medium text-zinc-700">
                {platId}
              </p>
            )}

            <div className="grid grid-cols-2 max-w-[600px] m-auto mb-12">
              <div className="flex flex-col items-center">
                <div className="w-full">
                  {loading || individualBugLoading ? (
                    <PieChartSkeleton height={200} width={200} />
                  ) : (
                    <div className="h-[190px] w-[300px] overflow-hidden">
                      <ReactECharts
                        option={bugRatioOption}
                        style={{ height: 300 }}
                        opts={{ renderer: "svg" }}
                        ref={bugTaskRef}
                      />
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-zinc-500">
                  Bug to Task Ratio
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full">
                  {loading || individualBugLoading ? (
                    <PieChartSkeleton height={200} width={200} />
                  ) : (
                    <ReactECharts
                      option={bugOption}
                      opts={{ renderer: "svg" }}
                      style={{ height: 200 }}
                      ref={bugsRef}
                    />
                  )}
                </div>
                <p className="text-sm font-medium text-zinc-500">Bug</p>
              </div>
            </div>

            <DataTable
              data={individualBugData}
              columns={individualBugTaskColumn}
              loading={individualBugLoading || loading}
              loadingDataNum={4}
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
