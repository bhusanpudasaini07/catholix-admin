import ReactECharts from "echarts-for-react";
import React from "react";
import { format, addDays } from "date-fns";

const StaffTimeGraph = () => {
  const startDate = new Date("2023-01-01");
  const data: any = {
    id: "1",
    employee_id: "E001",
    username: "johndoe",
    fullname: "John Doe",
    daily_time: Array.from({ length: 14 }).map((_, index) => ({
      date: format(addDays(startDate, index), "yyyy-MM-dd"),
      available_time: 25200, // 7 hours in seconds
      used_time: Math.floor(Math.random() * 25200), // Random used time for demonstration
      commercial_time: Math.floor(Math.random() * 15120), // Random commercial time for demonstration
      inhouse_time: Math.floor(Math.random() * 12600), // Random in-house time for demonstration
    })),
  };

  const chartData = data.daily_time.map((day: any) => {
    const availableTime = day?.available_time;
    const usedTime = day?.used_time;
    const commercialTime = day?.commercial_time;
    const inhouseTime = day?.inhouse_time;
    let exceededTime = 0;
    let usedTimePercentage = 0;
    let exceededTimePercentage = 0;
    let unusedTimePercentage = 0;
    let commercialTimePercentage = parseFloat(
      ((commercialTime / availableTime) * 100).toFixed(3)
    );
    let inhouseTimePercentage = parseFloat(
      ((inhouseTime / availableTime) * 100).toFixed(3)
    );

    if (usedTime > availableTime) {
      exceededTime = usedTime - availableTime;
      usedTimePercentage = 100;
      exceededTimePercentage = parseFloat(
        ((exceededTime / usedTime) * 100).toFixed(3)
      );
      unusedTimePercentage = 0;
    } else {
      usedTimePercentage = parseFloat(
        ((usedTime / availableTime) * 100).toFixed(3)
      );
      unusedTimePercentage = 100 - usedTimePercentage;
      exceededTimePercentage = 0;
    }

    return {
      date: day.date,
      availableTime: 100, // This represents the full scale of the graph
      usedTime: usedTimePercentage,
      exceededTime: exceededTimePercentage,
      unusedTime: unusedTimePercentage,
      commercialTime: commercialTimePercentage,
      inhouseTime: inhouseTimePercentage,
      apiData: {
        used: usedTime,
        available: availableTime,
        commercial: commercialTime,
        inhouse: inhouseTime,
      },
    };
  });

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: [
        {
          name: "Client",
          itemStyle: {
            color: "#5470C6",
          },
        },
        {
          name: "In-house",
          itemStyle: {
            color: "#91CC75",
          },
        },
        {
          name: "Overused",
          itemStyle: {
            color: "#EF4444",
          },
        },
        {
          name: "Missed",
          itemStyle: {
            color: "#F6E7C6",
          },
        },

        // {
        //   name: "Available",
        //   itemStyle: {
        //     color: "#C0C0C0",
        //   },
        // },
      ],
      borderRadius: [6, 6, 6, 6],
      top: "5%",
      right: "0%",
      itemWidth: 16,
      itemHeight: 16,
    },
    grid: {
      left: "0%",
      right: "0%",
      bottom: "13%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: chartData.map((item: any) => format(new Date(item?.date), "EEE")),
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      show: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: "Client",
        type: "bar",
        stack: "total",
        data: chartData.map((item: any) => ({
          value: item?.commercialTime,
          itemStyle: {
            color: "#5470C6",
          },
        })),
        label: {
          show: false,
          position: "inside",
        },
      },
      {
        name: "In-house",
        type: "bar",
        stack: "total",
        data: chartData.map((item: any) => ({
          value: item?.inhouseTime,
          itemStyle: {
            color: "#91CC75",
          },
        })),
        label: {
          show: false,
          position: "inside",
        },
      },
      {
        name: "Overused",
        type: "bar",
        stack: "total",
        data: chartData.map((item: any) => item?.exceededTime),
        itemStyle: {
          color: "#EF4444",
        },
        label: {
          show: false,
          position: "inside",
        },
      },
      {
        name: "Missed",
        type: "bar",
        stack: "total",
        data: chartData.map((item: any) => ({
          value: item?.unusedTime.toFixed(2),
          itemStyle: {
            color: "#F6E7C6",
          },
        })),
        label: {
          show: false,
          position: "inside",
        },
      },
      {
        name: "Available",
        type: "bar",
        stack: "total",
        data: chartData.map((item: any) => ({
          value: item?.availableTime,
          itemStyle: {
            color: "#f4f4f5",
          },
        })),
        label: {
          show: false,
          position: "inside",
        },
      },
    ],
  };

  return (
    <div className="text-center">
      <ReactECharts option={option} opts={{ renderer: "svg" }} />
    </div>
  );
};

export default StaffTimeGraph;
