import React, { FC } from "react";
import ReactEcharts, { EChartsOption } from "echarts-for-react";
import { changeNumberFormat, timeFormatter } from "@/shared/utils/rp-utils";

interface IProps {
  data: {
    available_rp: number;
    commercial_rp: number;
    inhouse_rp: number;
    available_time: number;
    commercial_time: number;
    inhouse_time: number;
    total_time: number;
  };
  tab: string;
}
const UtilizationSankey: FC<IProps> = ({ data, tab }) => {
  const spent_rp = (data?.commercial_rp + data?.inhouse_rp).toFixed(2);
  const loss_rp = (data?.available_rp - Number(spent_rp)).toFixed(2);
  const total_rp = data?.available_rp.toFixed(2);

  const spentPercentage = ((Number(spent_rp) / Number(total_rp)) * 100).toFixed(
    2
  );
  const lossPercentage = ((Number(loss_rp) / Number(total_rp)) * 100).toFixed(
    2
  );
  const clientPercentage = (
    (Number(data?.commercial_rp) / Number(total_rp)) *
    100
  ).toFixed(2);
  const inhousePercentage = (
    (Number(data?.inhouse_rp) / Number(total_rp)) *
    100
  ).toFixed(2);

  const lossTime = data?.available_time - data?.total_time;

  const spentTimePercentage = (
    (data?.total_time / data?.available_time) *
    100
  ).toFixed(2);
  const lossTimePercentage = ((lossTime / data?.available_time) * 100).toFixed(
    2
  );
  const clientTimePercentage = (
    (data?.commercial_time / data?.available_time) *
    100
  ).toFixed(2);
  const inhouseTimePercentage = (
    (data?.inhouse_time / data?.available_time) *
    100
  ).toFixed(2);

  const option: EChartsOption = {
    series: [
      {
        type: "sankey",
        layout: "none",
        emphasis: {
          focus: "adjacency",
        },
        bottom: "15%",
        top: "10%",
        data: [
          {
            name: `Overall-Budget (${changeNumberFormat(
              parseFloat(total_rp)
            )})`,
            format: (value: any) => changeNumberFormat(value),
            itemStyle: {
              color: "#5470C6",
              width: 300,
            },
          },
          {
            name: `Client (${clientPercentage}%)`,
            itemStyle: {
              color: "#0A82FD",
              width: 100,
              height: 40,
            },
          },
          {
            name: `In-house (${inhousePercentage}%)`,
            itemStyle: {
              color: "#73d8de",
              width: 100,
              height: 40,
            },
          },
          {
            name: `Spent-Budget (${spentPercentage}%)`,
            itemStyle: {
              color: "#91CC75",
              width: 100,
              height: 40,
            },
          },
          {
            name: `Loss-Budget (${lossPercentage}%)`,
            itemStyle: {
              color: "#EE6666",
              width: 100,
              height: 40,
            },
          },
        ],
        links: [
          {
            source: `Overall-Budget (${changeNumberFormat(
              parseFloat(total_rp)
            )})`,
            target: `Spent-Budget (${spentPercentage}%)`,
            value: spent_rp,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
          {
            source: `Spent-Budget (${spentPercentage}%)`,
            target: `Client (${clientPercentage}%)`,
            value: data?.commercial_rp,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
          {
            source: `Spent-Budget (${spentPercentage}%)`,
            target: `In-house (${inhousePercentage}%)`,
            value: data?.inhouse_rp,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
          {
            source: `Overall-Budget (${changeNumberFormat(
              parseFloat(total_rp)
            )})`,
            target: `Loss-Budget (${lossPercentage}%)`,
            value: loss_rp,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
        ],
      },
    ],
    tooltip: {
      trigger: "item",
    },
  };

  const optionTime: EChartsOption = {
    series: [
      {
        type: "sankey",
        layout: "none",
        emphasis: {
          focus: "adjacency",
        },
        bottom: "15%",
        top: "10%",
        data: [
          {
            name: `Overall-Time (${timeFormatter(data?.available_time)})`,
            format: (value: any) => changeNumberFormat(value),
            itemStyle: {
              color: "#5470C6",
              width: 300,
            },
          },
          {
            name: `Client (${clientTimePercentage}%)`,
            itemStyle: {
              color: "#0A82FD",
              width: 100,
              height: 40,
            },
          },
          {
            name: `In-house (${inhouseTimePercentage}%)`,
            itemStyle: {
              color: "#73d8de",
              width: 100,
              height: 40,
            },
          },
          {
            name: `Spent-Time (${spentTimePercentage}%)`,
            itemStyle: {
              color: "#91CC75",
              width: 100,
              height: 40,
            },
          },
          {
            name: `Loss-Time (${lossTimePercentage}%)`,
            itemStyle: {
              color: "#EE6666",
              width: 100,
              height: 40,
            },
          },
        ],
        links: [
          {
            source: `Overall-Time (${timeFormatter(data?.available_time)})`,
            target: `Spent-Time (${spentTimePercentage}%)`,
            value: data?.available_time,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
          {
            source: `Spent-Time (${spentTimePercentage}%)`,
            target: `Client (${clientTimePercentage}%)`,
            value: data?.commercial_time,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
          {
            source: `Spent-Time (${spentTimePercentage}%)`,
            target: `In-house (${inhouseTimePercentage}%)`,
            value: data?.inhouse_time,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
          {
            source: `Overall-Time (${timeFormatter(data?.available_time)})`,
            target: `Loss-Time (${lossTimePercentage}%)`,
            value: lossTime,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
        ],
      },
    ],
    tooltip: {
      trigger: "item",
    },
  };
  return (
    <div>
      <ReactEcharts
        option={tab === "budget" ? option : optionTime}
        style={{ height: "350px" }}
      />
    </div>
  );
};

export default UtilizationSankey;
