import React from "react";
import ReactECharts from "echarts-for-react";
import { calculateUsedAndUnusedRpPercentage } from "@/shared/utils/rp-utils";

interface IProps {
  totalRP: number;
  totalAdditionalRP: number;
}

const SummaryPieChart = ({ totalRP, totalAdditionalRP }: IProps) => {
  //   Chart Calculations and Options
  const { usedPercentage, unusedPercentage } =
    calculateUsedAndUnusedRpPercentage(totalRP ?? 0, totalAdditionalRP ?? 0);

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      left: "center",
      show: false,
    },
    series: [
      {
        type: "pie",
        radius: ["70%", "100%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center", // Position it in the center
          formatter: () => {
            // Custom formatter to display both percentages
            return `${usedPercentage ?? 0}%`;
          },
          fontSize: 16,
          color: "black",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 16,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: usedPercentage ?? 0,
            name: "Used",
            itemStyle: {
              color:
                usedPercentage > 80
                  ? "#22C55E"
                  : usedPercentage < 20
                  ? "#EF4444"
                  : " #FACC15",
            },
            label: { show: true },
          },
          {
            value: unusedPercentage ?? 0,
            name: "Unused",
            itemStyle: { color: "#F4F4F5" },
            label: { show: false, fontsize: 50 },
          },
        ],
      },
    ],
  };
  return <ReactECharts option={option} style={{ height: "100px" }} />;
};

export default SummaryPieChart;
