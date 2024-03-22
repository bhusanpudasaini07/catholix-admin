import ReactECharts from "echarts-for-react";
import React from "react";

import { ITeamMemberDetails } from "@/interface/team-member-interface";

type TProps = {
  data: ITeamMemberDetails;
};

const WorkLoadChart = ({ data }: TProps) => {
  //to check how many days the time has exceed available time.
  const timeExceedCount = data?.daily_time?.reduce((acc, curr) => {
    if (Number(curr?.used_time) > Number(curr?.available_time)) {
      acc += 1;
    }
    return acc;
  }, 0);

  const chartData = data?.daily_time?.map((day) => {
    const availableTime = parseFloat(day.available_time);
    const usedTime = parseFloat(day.used_time);
    let exceededTime = 0;
    let usedTimePercentage = 0;
    let exceededTimePercentage = 0;
    let unusedTimePercentage = 0; // Initialize unusedTimePercentage

    if (usedTime > availableTime) {
      exceededTime = usedTime - availableTime;
      usedTimePercentage = 100; // Adjust to reflect the percentage of used time relative to itself when exceeding
      exceededTimePercentage = (exceededTime / usedTime) * 100;
      unusedTimePercentage = 0; // No unused time when used time exceeds available time
    } else {
      usedTimePercentage = (usedTime / availableTime) * 100;
      unusedTimePercentage = 100 - usedTimePercentage; // Calculate unused time percentage
      exceededTimePercentage = 0; // No exceeded time when used time is within or equal to available time
    }

    // Ensure percentages are not NaN. If NaN, default to 0
    usedTimePercentage = isNaN(usedTimePercentage) ? 0 : usedTimePercentage;
    exceededTimePercentage = isNaN(exceededTimePercentage)
      ? 0
      : exceededTimePercentage;
    unusedTimePercentage = isNaN(unusedTimePercentage)
      ? 100
      : unusedTimePercentage;

    return {
      availableTime: 100, // Always 100% as a base, representing the total available time
      usedTime: usedTimePercentage,
      exceededTime: exceededTimePercentage,
      unusedTime: unusedTimePercentage, // Add unusedTime to the return object
      apiData: {
        used: usedTime,
        available: availableTime,
      },
    };
  });

  // Chart option
  const option = {
    grid: {
      left: "-20px",
      right: "0%",
      bottom: "0%",
      top: "0%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        name: "Used Time",
        type: "bar",
        stack: "total",
        data: chartData.map((item) => ({
          value: item.usedTime,
          itemStyle: {
            color:
              item?.usedTime > item?.availableTime / 2 ? "#22C55E" : "#FACC15",
          },
        })),
      },
      {
        name: "Exceeded Time",
        type: "bar",
        stack: "total",
        data: chartData.map((item) => item.exceededTime),
        itemStyle: {
          color: "#EF4444",
        },
      },
      {
        name: "Available Time",
        type: "bar",
        stack: "total",
        data: chartData.map((item) => ({
          value: item.unusedTime,
          itemStyle: {
            color:
              item?.apiData?.available > 0 && item?.apiData?.used === 0
                ? "#FFE7CE"
                : "#F4F4F5",
          },
        })),
      },
    ],
  };

  return (
    <div className="w-[200px] text-center">
      <ReactECharts
        option={option}
        style={{ height: "100px", width: "100%" }}
        opts={{ renderer: "svg" }}
      />
      <p className="font-semibold text-zinc-500">
        {timeExceedCount ?? 0}/{data?.daily_time?.length}
      </p>
    </div>
  );
};

export default WorkLoadChart;
