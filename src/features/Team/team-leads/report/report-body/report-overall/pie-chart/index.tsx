import ReactECharts, { EChartsInstance } from 'echarts-for-react';
import React, { useEffect, useRef } from 'react';

import { calculateUsedAndUnusedRpPercentage } from '@/shared/utils/rp-utils';

interface IProps {
  totalRP: number;
  totalAdditionalRP: number;
}

const SummaryPieChart = ({ totalRP, totalAdditionalRP }: IProps) => {
  const chartRef = useRef<EChartsInstance>(null);
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
            return "{a|" + usedPercentage + "%" + "}";
          },
          rich: {
            a: {
              fontSize: 16,
              color: "#3F3F46",
              lineHeight: 20,
              fontWeight: 600,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
          },
          scale: false,
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
          },
          {
            value: unusedPercentage ?? 0,
            name: "Unused",
            itemStyle: { color: "#F4F4F5" },
          },
        ],
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      loadingOption={true}
      style={{ height: "100px" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default SummaryPieChart;
