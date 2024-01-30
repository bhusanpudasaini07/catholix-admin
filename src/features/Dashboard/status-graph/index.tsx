import { IDashboardData } from "@/interface/dashboard-interface";
import React from "react";
import ReactEcharts from "echarts-for-react";

interface IProps {
  dashboardData: IDashboardData | undefined;
}

const InvoiceStatusGraph = ({ dashboardData }: IProps) => {
  const option = {
    color: ["#00AA73", "#E16C68", "#FFB833", "#686de0"],
    legend: {
      orient: "vertical",
      left: "left",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: Object.keys(dashboardData?.invoice_status || {})?.map((key) => ({
          value: dashboardData?.invoice_status?.[key],
          name: `${key.charAt(0).toUpperCase()}${key.slice(1)} Invoice`,
        })),
      },
    ],
  };

  return (
    <div className="border rounded p-8 h-full">
      <p className="text-color font-medium text-lg">Total Invoice Status</p>
      <ReactEcharts option={option} style={{ height: "400px" }} />
    </div>
  );
};

export default InvoiceStatusGraph;
