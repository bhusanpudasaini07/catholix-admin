import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";
import ReactECharts, {
  EChartsInstance,
  EChartsOption,
} from "echarts-for-react";
import PieChartSkeleton from "@/shared/components/skeleton-loading/pie-chart-skeleton";

interface IProps {
  option: EChartsOption;
  loading: boolean;
  chartRef: EChartsInstance | null;
}

const DHTeamOverview = ({ option, loading, chartRef }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-0">
          <p className="text-lg font-medium text-zinc-700">Team Overview</p>
        </div>
        <div className="w-full">
          {loading ? (
            <PieChartSkeleton height={200} width={200} />
          ) : (
            <ReactECharts
              option={option}
              ref={chartRef}
              opts={{ renderer: "svg" }}
              style={{ height: 230 }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DHTeamOverview;
