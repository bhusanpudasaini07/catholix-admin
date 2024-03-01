import React from "react";
import ReactECharts from "echarts-for-react";
import { calculateUsedAndUnusedRpPercentage } from "@/shared/utils/rp-utils";

interface IProps {
  rp: {
    unapproved_estimation: number;
    approved_estimation: number;
    approved_rp: number;
    unapproved_rp: number;
    sales_rp: number | null;
    used_rp: number | null;
  };
}
const UsedRpMoreDetail = ({ rp }: IProps) => {
  const { usedPercentage, unusedPercentage } =
    calculateUsedAndUnusedRpPercentage(rp?.sales_rp, rp?.used_rp);

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
            return `${usedPercentage ?? 0}%\nused`;
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
            itemStyle: { color: "#FACC15" },
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
  return (
    <ReactECharts
      option={option}
      style={{ height: "120px" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default UsedRpMoreDetail;
