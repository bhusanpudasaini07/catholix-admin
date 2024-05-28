import React, { FC } from "react";
import ReactEcharts, { EChartsOption } from "echarts-for-react";
import { IProject } from "@/interface/team-lead-report-interface";

interface IProps {
  data: {
    available_rp: number;
    client_rp: number;
    available_time: number;
    client_time: number;
    total_time: number;
    total_rp: number;
  };
  tab: string;
  projects: IProject[];
}
const StaffUtilizationSunburst: FC<IProps> = ({ data, tab, projects }) => {
  const loss_rp = (data?.available_rp - data?.total_rp).toFixed(2);
  const loss_time = (data?.available_time - data?.total_time).toFixed(2);

  const chartData =
    tab === "time"
      ? getTimeChartData(data, loss_time)
      : getRpChartData(data, loss_rp);

  const option: EChartsOption = {
    series: [
      {
        type: "sunburst",
        data: chartData,
        radius: [0, "90%"],
        label: {
          rotate: "radial",
        },
      },
    ],
  };

  return (
    <ReactEcharts
      style={{ height: "100%", minHeight: "300px" }}
      option={option}
    />
  );
};

const getTimeChartData = (data: any, loss_time: string) => [
  {
    name: "Loss",
    children: [
      {
        name: "Loss",
        value: loss_time ? parseFloat(loss_time) : "",
      },
    ],
  },
  {
    name: "Spent",
    children: [
      {
        name: "In-House",
        value: data?.inhouse_time
          ? parseFloat(data?.inhouse_time.toFixed(2))
          : 0,
        children: [],
      },
      {
        name: "Commercial",
        value: data?.commercial_time
          ? parseFloat(data?.commercial_time.toFixed(2))
          : 0,
      },
    ],
  },
];

const getRpChartData = (data: any, loss_rp: string) => [
  {
    name: "Loss",
    children: [
      {
        name: "Loss",
        value: loss_rp ? parseFloat(loss_rp) : "",
      },
    ],
  },
  {
    name: "Spent",
    children: [
      {
        name: "In-House",
        value: data?.inhouse_rp ? parseFloat(data?.inhouse_rp.toFixed(2)) : 0,
        children: [],
      },
      {
        name: "Commercial",
        value: data?.commercial_rp
          ? parseFloat(data?.commercial_rp.toFixed(2))
          : 0,
      },
    ],
  },
];

export default StaffUtilizationSunburst;
