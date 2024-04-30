import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";

interface IProps {
  loading: boolean;
  option: EChartsOption;
}

const TrendOverviewGraph = ({ loading, option }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-4 justify-start items-center mb-6">
          <p className="text-lg font-medium text-zinc-700">Latest Task Trend</p>
        </div>

        {/* {isLoading ? (
  <GraphSkeleton className="max-h-[300px] overflow-hidden" />
) : ( */}
        <ReactECharts
          option={option}
          style={{ height: 500 }}
          opts={{ renderer: "svg" }}
        />
        {/* )} */}
      </CardContent>
    </Card>
  );
};

export default TrendOverviewGraph;
