import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";

interface IProps {
  loading: boolean;
  chartOption: EChartsOption;
  type: string;
}

const DealerChart = ({ loading, chartOption, type }: IProps) => {
  return (
    <div>
      <p className="text-sm font-semibold text-zinc-700">
        {type === "device"
          ? "Number of Registration By Device"
          : "Transaction Performance By Agent"}
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

export default DealerChart;
