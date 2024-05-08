import React, { FC } from "react";
import ReactEcharts, { EChartsOption } from "echarts-for-react";

interface IProps {
  data: {
    available_rp: number;
    commercial_rp: number;
    inhouse_rp: number;
  };
}
const UtilizationSankey: FC<IProps> = ({ data }) => {
  const spent_rp = (data?.commercial_rp + data?.inhouse_rp).toFixed(2);
  const loss_rp = (data?.available_rp - Number(spent_rp)).toFixed(2);

  const option: EChartsOption = {
    series: [
      {
        type: "sankey",
        layout: "none",
        emphasis: {
          focus: "adjacency",
        },
        data: [
          { name: "Overall-Budget", format: (value: any) => value.toFixed(2) },
          { name: "Spent-Budget" },
          { name: "Client" },
          { name: "In-house" },
          { name: "Loss-Budget" },
        ],
        links: [
          { source: "Overall-Budget", target: "Spent-Budget", value: spent_rp },
          {
            source: "Spent-Budget",
            target: "Client",
            value: data?.commercial_rp,
          },
          {
            source: "Spent-Budget",
            target: "In-house",
            value: data?.inhouse_rp,
          },
          { source: "Overall-Budget", target: "Loss-Budget", value: loss_rp },
        ],
      },
    ],
    tooltip: {
      trigger: "item",
    },
    color: ["#075BB2", "#22C55E", "#EF4444", "#0A82FD", "#075BB2"],
  };
  return (
    <div>
      <ReactEcharts option={option} />
    </div>
  );
};

export default UtilizationSankey;
