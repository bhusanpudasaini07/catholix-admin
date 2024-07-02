import { EChartsOption } from "echarts-for-react";
import React from "react";
import ReactECharts from "echarts-for-react";
interface IProps {
  option: EChartsOption;
}

const GCPercentChart = ({ option }: IProps) => {
  return (
    <div className="col-span-3">
      <p className="font-semibold text-zinc-900">GC %</p>
      <ReactECharts
        opts={{ renderer: "svg" }}
        option={option}
        style={{ height: 230 }}
      />
    </div>
  );
};

export default GCPercentChart;
