import React from "react";
import ReactECharts from "echarts-for-react";
import { Button } from "@/shared/components/ui/button";

const RpConsumption = () => {
  const option = {
    // title: {
    //   text: "Stacked Line",
    // },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };

  return (
    <div className="mt-7 card !p-6">
      <div className="w-full">
        <div className="flex justify-start items-center gap-3">
          <p className="font-medium text-lg text-zinc-700">RP Consumption</p>
          <Button variant={"white"}>View Full Graph</Button>
        </div>
        <div className=""></div>
      </div>
      <ReactECharts option={option} />
    </div>
  );
};

export default RpConsumption;
