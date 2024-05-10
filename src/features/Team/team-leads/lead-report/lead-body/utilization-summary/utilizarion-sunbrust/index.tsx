import React, { FC } from "react";
import ReactEcharts, { EChartsOption } from "echarts-for-react";
import { IProject } from "@/interface/team-lead-report-interface";

interface IProps {
  data: {
    available_rp: number;
    commercial_rp: number;
    inhouse_rp: number;
    total_rp: number;
  };
  tab: string;
  projects: IProject[];
}
const UtilizationSunburst: FC<IProps> = ({ data, tab, projects }) => {
  const loss_rp = (data.available_rp - data.total_rp).toFixed(2);
  var chartData = [
    {
      name: "Loss",
      children: [
        {
          name: "Loss",
          value: loss_rp ? parseFloat(loss_rp) : "",
          children: [
            {
              name: "Loss",
              value: loss_rp ? parseFloat(loss_rp) : 0,
            },
          ],
        },
      ],
    },
    {
      name: "Spent",
      children: [
        {
          name: "In-House",
          value: data.inhouse_rp ? parseFloat(data.inhouse_rp.toFixed(2)) : 0,
          children: [],
        },
        {
          name: "Commercial",
          value: data.commercial_rp
            ? parseFloat(data.commercial_rp.toFixed(2))
            : 0,
        },
      ],
    },
  ];

  const option: EChartsOption = {
    series: [
      {
        type: "sunburst",
        data: chartData,
        radius: [0, "100%"],
        label: {
          rotate: "radial",
        },
      },
    ],
  };

  return (
    <div>
      <ReactEcharts option={option} />
    </div>
  );
};

export default UtilizationSunburst;
