import ReactECharts, { EChartsInstance } from "echarts-for-react";
import React, { useEffect, useRef } from "react";

const ProjectSummaryGraph = ({ chartData, title }: any) => {
  // REF for Chart
  const chartRef = useRef<EChartsInstance>(null);

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
        radius: ["50%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          fontSize: 20,
          formatter: (item: any) => {
            return (
              "{a|" +
              (item?.value ? parseFloat(item.value).toFixed(2) : "") +
              "}\n{b|" +
              item?.name +
              "}"
            );
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

  useEffect(() => {
    const myChart = chartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return (
                  "{a|" +
                  (params?.value ? parseFloat(params.value).toFixed(2) : "") +
                  "}\n{b|" +
                  params?.name +
                  "}"
                );
              },
              rich: {
                a: {
                  fontSize: 22,
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
          },
        ],
      });
    });

    option && myChart.setOption(option);

    return () => {
      myChart.off("mouseover");
    };
  }, [option]);
  return (
    <ReactECharts
      className="max-h-[250px]"
      ref={chartRef}
      option={option}
      opts={{ renderer: "svg" }}
    />
  );
};

export default ProjectSummaryGraph;
