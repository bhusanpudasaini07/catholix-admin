import { IDashboardData } from "@/interface/dashboard-interface";
import React, { useMemo } from "react";
import ReactEcharts from "echarts-for-react";

interface IProps {
  dashboardData: IDashboardData | undefined;
}
const DashboardVendorBar = ({ dashboardData }: IProps) => {
  const barKey = useMemo(() => {
    const data = Object.keys(
      dashboardData?.highest_amount_invoice_per_vendor || {}
    )?.map((key) => key);
    return data;
  }, [dashboardData]);

  const barValue = useMemo(() => {
    const data = Object.keys(
      dashboardData?.highest_amount_invoice_per_vendor || {}
    )?.map((key) => dashboardData?.highest_amount_invoice_per_vendor?.[key]);
    return data;
  }, [dashboardData]);

  const option = {
    xAxis: {
      type: "category",
      data: barKey || [],
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 10,
        showMinLabel: false,
        showMaxLabel: false,
        formatter: function (value: any) {
          return value.length > 10 ? value.slice(0, 18) + "..." : value;
        },
      },
    },
    yAxis: {
      type: "value",
    },
    color: ["#686de0"],
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        data: barValue || [],
        type: "bar",
      },
    ],
  };
  return (
    <div className="border rounded p-8 h-full">
      <p className="text-color font-medium text-lg">
        Invoice Amount per vendor
      </p>
      {dashboardData &&
      Object?.entries(dashboardData?.highest_amount_invoice_per_vendor)
        ?.length > 0 ? (
        <ReactEcharts option={option} style={{ height: "400px" }} />
      ) : (
        <div className="flex items-center justify-center h-[400px] flex-col text-gray-270">
          No data found.
        </div>
      )}
    </div>
  );
};

export default DashboardVendorBar;
