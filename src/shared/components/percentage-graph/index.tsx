import React from "react";
import ReactECharts from "echarts-for-react";

interface IProps {
  fillPercentage: string;
  emptyPercentage: string;
  fillColor?: string;
  emptyColor?: string;
  fillLabel?: string;
  emptyLabel?: string;
}
const PercentageGraph = ({
  fillPercentage,
  emptyPercentage,
  fillColor,
  emptyColor,
  fillLabel,
  emptyLabel,
}: IProps) => {
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
            return `${fillPercentage ?? 0}%${fillLabel ? fillLabel : "\nUsed"}`;
          },
          fontSize: 18,
          fontWeight: "bold",
          color: "black",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 16,
          },
          scale: false,
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: fillPercentage ?? 0,
            name: `${fillLabel ? fillLabel : "Used"}`,
            itemStyle: { color: ` ${fillColor ? fillColor : "#FACC15"}` },
            label: { show: true },
          },
          {
            value: emptyPercentage ?? 0,
            name: `${emptyLabel ? emptyLabel : "Unused"}`,
            itemStyle: { color: ` ${emptyColor ? emptyColor : "#F4F4F5"} ` },
            label: { show: false, fontsize: 50 },
          },
        ],
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      style={{ height: "120px" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default PercentageGraph;
