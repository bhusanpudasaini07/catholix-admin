import { EChartsOption } from "echarts-for-react";
import React from "react";
import ReactECharts from "echarts-for-react";

interface IProps {
  option: EChartsOption;
}

const GANumberChart = ({ option }: IProps) => {
  return (
    <div className="col-span-2">
      <p className="font-semibold text-zinc-900">Number of GA base on region</p>
      <ReactECharts
        opts={{ renderer: "svg" }}
        option={option}
        style={{ height: 230 }}
      />
    </div>
  );
};

export default GANumberChart;
