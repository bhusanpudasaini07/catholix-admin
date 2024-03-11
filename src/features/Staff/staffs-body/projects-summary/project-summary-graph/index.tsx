import React from "react";
import ReactECharts from "echarts-for-react";

const ProjectSummaryGraph = ({ chartData, title }: any) => {
  const option = {
    title: {
      text: title ? title : "",
      left: "left",
      weight: 400,
      textStyle: {
        fontWeight: 400,
      },
    },
    tooltip: {
      trigger: "item",
    },
    color: ["#2DD4BF", "#0891B2", "#818CF8", "#7C3AED", "#FACC15", "#84CC16"],
    series: [
      {
        type: "pie",
        radius: ["55%", "90%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
          fontSize: 20,
          formatter: (item: any) => {
            return "{a|" + item?.value + "}\n{b|" + item?.name + "}";
          },
          rich: {
            a: {
              fontSize: 25,
              color: "#3F3F46",
              lineHeight: 20,
              fontWeight: 600,
            },
            b: {
              fontSize: 14,
              color: "#3F3F46",
              lineHeight: 30,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData || [],
      },
    ],
  };
  return (
    <ReactECharts
      className="min-h-[400px]"
      option={option}
      opts={{ renderer: "svg" }}
    />
  );
};

export default ProjectSummaryGraph;
