import React from "react";
import ReactECharts from "echarts-for-react";

const UsedRp = () => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
          formatter: `{b} {c}`,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 52,
            name: "Used",
            itemStyle: { color: "#0A82FD" },
            label: { show: true },
          },
          {
            value: 48,
            name: "Unused",
            itemStyle: { color: "#F4F4F5" },
            label: { show: false, fontsize: 50 },
          },
        ],
      },
    ],
  };
  return <ReactECharts option={option} />;
};

export default UsedRp;
