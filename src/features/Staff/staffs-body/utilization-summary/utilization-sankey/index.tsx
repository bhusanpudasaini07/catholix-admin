import React, { FC } from "react";
import ReactEcharts, { EChartsOption } from "echarts-for-react";
import { changeNumberFormat, timeFormatter } from "@/shared/utils/rp-utils";

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
}
const StaffUtilizationSankey: FC<IProps> = ({ data, tab }) => {
  const inhouse_rp = data?.total_rp - data?.client_rp;
  const inhouse_time = data?.total_time - data?.client_time;
  const spent_rp = (data?.client_rp + inhouse_rp).toFixed(2);
  const loss_rp = (data?.available_rp - Number(spent_rp)).toFixed(2);
  const available_rp_data = data?.available_rp.toFixed(2);

  const spentPercentage = (
    (Number(spent_rp) / Number(available_rp_data)) *
    100
  ).toFixed(2);
  const lossPercentage = (
    (Number(loss_rp) / Number(available_rp_data)) *
    100
  ).toFixed(2);
  const clientPercentage = (
    (Number(data?.client_rp) / Number(available_rp_data)) *
    100
  ).toFixed(2);
  const inhousePercentage = (
    (Number(inhouse_rp) / Number(available_rp_data)) *
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
    (data?.client_time / data?.available_time) *
    100
  ).toFixed(2);
  const inhouseTimePercentage = (
    (inhouse_time / data?.available_time) *
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
              parseFloat(available_rp_data)
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
              parseFloat(available_rp_data)
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
            value: data?.client_rp,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
          {
            source: `Spent-Budget (${spentPercentage}%)`,
            target: `In-house (${inhousePercentage}%)`,
            value: inhouse_rp,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
          {
            source: `Overall-Budget (${changeNumberFormat(
              parseFloat(available_rp_data)
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
            itemStyle: {
              color: "#5470C6",
              width: 300,
            },
          },
          {
            name: `Client (${timeFormatter(
              data?.client_time
            )}), (${clientTimePercentage}%)`,
            itemStyle: {
              color: "#0A82FD",
              width: 100,
              height: 40,
            },
          },
          {
            name: `In-house (${timeFormatter(
              inhouse_time
            )}), (${inhouseTimePercentage}%)`,
            itemStyle: {
              color: "#73d8de",
              width: 100,
              height: 40,
            },
          },
          {
            name: `Spent-Time (${timeFormatter(
              data?.total_time
            )}), (${spentTimePercentage}%)`,
            itemStyle: {
              color: "#91CC75",
              width: 100,
              height: 40,
            },
          },
          {
            name: `Loss-Time (${timeFormatter(
              lossTime
            )}), (${lossTimePercentage}%)`,

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
            target: `Spent-Time (${timeFormatter(
              data?.total_time
            )}), (${spentTimePercentage}%)`,
            value: spentTimePercentage,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
          {
            source: `Spent-Time (${timeFormatter(
              data?.total_time
            )}), (${spentTimePercentage}%)`,
            target: `Client (${timeFormatter(
              data?.client_time
            )}), (${clientTimePercentage}%)`,
            value: clientTimePercentage,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
          {
            source: `Spent-Time (${timeFormatter(
              data?.total_time
            )}), (${spentTimePercentage}%)`,
            target: `In-house (${timeFormatter(
              inhouse_time
            )}), (${inhouseTimePercentage}%)`,
            value: inhouseTimePercentage,
            lineStyle: {
              color: "source",
              opacity: 0.3,
            },
          },
          {
            source: `Overall-Time (${timeFormatter(data?.available_time)})`,
            target: `Loss-Time (${timeFormatter(
              lossTime
            )}), (${lossTimePercentage}%)`,
            value: lossTimePercentage,
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
    <ReactEcharts
      option={tab === "budget" ? option : optionTime}
      style={{ height: "100%", minHeight: "300px" }}
    />
  );
};

export default StaffUtilizationSankey;
