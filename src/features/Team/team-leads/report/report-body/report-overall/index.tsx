import React, { useEffect, useRef } from "react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { changeNumberFormat } from "@/shared/utils/rp-utils";
import ReactECharts, { EChartsInstance } from "echarts-for-react";
import PieChartSkeleton from "@/shared/components/skeleton-loading/pie-chart-skeleton";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface IProps {
  totalRP: number;
  totalCommercialRp: number;
  totalInhouseRP: number;
  loading: boolean;
}

const ReportOverall = ({
  totalRP,
  totalCommercialRp,
  totalInhouseRP,
  loading,
}: IProps) => {
  const chartRef = useRef<EChartsInstance>(null);
  const summaryData = [
    {
      id: "total",
      title: "Total Budget",
      color: "bg-zinc-700",
      value: totalRP,
      percentage: 0,
      chartColor: "",
    },
    {
      id: "client",
      title: "Client Budget",
      color: "bg-blue-500",
      value: totalCommercialRp,
      percentage: (totalCommercialRp / totalRP) * 100,
      chartColor: "#5470C6",
    },
    {
      id: "in_house",
      title: "In-house Budget",
      color: "bg-green-500",
      value: totalInhouseRP,
      percentage: (totalInhouseRP / totalRP) * 100,
      chartColor: "#91CC75",
    },
    {
      id: "loss",
      title: "Loss Budget",
      color: "bg-[#EE6666]",
      value: totalRP - (totalCommercialRp + totalInhouseRP),
      percentage:
        ((totalRP - (totalCommercialRp + totalInhouseRP)) / totalRP) * 100,
      chartColor: "#EE6666",
    },
  ];

  const option = {
    tooltip: {
      trigger: "item",
    },

    series: [
      {
        type: "pie",
        radius: ["60%", "90%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: (item: any) => {
            return "{a|" + item.value + "%" + "}\n{b|" + item.name + "}";
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
        data: summaryData
          ?.filter((item) => item?.id !== "total")
          .map((data) => ({
            value: (data?.percentage).toFixed(2),
            name: data?.title,
            itemStyle: {
              color: data?.chartColor,
            },
          })),
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
                  "{a|" + (params.value + "%") + "}\n{b|" + params?.name + "}"
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
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">Budget Executed</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 h-fit">
            {summaryData?.map((item) => (
              <div key={item?.id}>
                <div className="flex gap-2 items-center">
                  <div className={`${item?.color} w-2 h-6`}></div>
                  <p className="text-zinc-700">{item?.title}</p>
                </div>
                <div className="flex gap-2 items-center pl-4">
                  {loading ? (
                    <Skeleton className="mt-2 w-20 h-5" />
                  ) : (
                    <p className="text-2xl font-semibold text-zinc-700">
                      {changeNumberFormat(item?.value)}
                    </p>
                  )}
                  {loading ? (
                    <Skeleton className="mt-2 w-20 h-5" />
                  ) : (
                    item?.percentage > 0 && (
                      <span className="text-lg text-zinc-500">
                        | {item?.percentage.toFixed(2)}%
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
          <div>
            {loading ? (
              <PieChartSkeleton height={200} width={200} />
            ) : (
              <ReactECharts
                option={option}
                opts={{ renderer: "svg" }}
                style={{ height: 200 }}
                ref={chartRef}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportOverall;
