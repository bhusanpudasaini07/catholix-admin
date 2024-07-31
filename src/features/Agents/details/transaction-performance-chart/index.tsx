import React from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface IProps {
  chartOption: EChartsOption;
  loading: boolean;
}
const TransactionPerformanceChart = ({ chartOption, loading }: IProps) => {
  return (
    <div>
      <p className="text-sm font-semibold text-zinc-700">
        Transaction Performance By Agent
      </p>
      {loading ? (
        <Skeleton className="w-full h-[270px] mt-4" />
      ) : (
        <ReactECharts
          option={chartOption}
          opts={{ renderer: "svg" }}
          style={{ width: "100%", height: "300px" }}
        />
      )}
    </div>
  );
};

export default TransactionPerformanceChart;
