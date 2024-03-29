import ReactEcharts, { EChartsOption } from "echarts-for-react";
import Image from "next/image";
import React, { RefObject } from "react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/utils";
import { useCommonStore } from "@/store/common-store";

interface IProps {
  marketsPieChartOption: EChartsOption;
  marketBarChartOption: EChartsOption;
  pieChartRef: RefObject<ReactEcharts>;
}

const MarketOverallStats = ({
  marketsPieChartOption,
  marketBarChartOption,
  pieChartRef,
}: IProps) => {
  const { filterConfig } = useCommonStore();

  const marketData = [
    {
      id: "nepal",
      title: "Nepal",
      percentage: "54%",
      projectNum: 10,
      color: "bg-teal-400",
    },
    {
      id: "japan",
      title: "Japan",
      percentage: "24%",
      projectNum: 10,
      color: "bg-lime-500",
    },
    {
      id: "usa",
      title: "USA",
      percentage: "17%",
      projectNum: 5,
      color: "bg-violet-600",
    },
    {
      id: "europe",
      title: "Europe",
      percentage: "5%",
      projectNum: 1,
      color: "bg-indigo-400",
    },
    {
      id: "singapore",
      title: "Singapore",
      percentage: "0%",
      projectNum: 0,
      color: "bg-yellow-400",
    },
    {
      id: "korea",
      title: "Korea",
      percentage: "54%",
      projectNum: 10,
      color: "bg-red-400",
    },
  ];

  const getMarketFlag = (value: string) => {
    const flag = filterConfig?.markets?.find(
      (market: { id: number; title: string; flag: string }) =>
        market?.title === value
    )?.flag;
    return flag;
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-9">
          <p className="text-lg font-medium text-zinc-700">Overall Stats</p>
        </div>
        <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
          <div className="flex flex-wrap items-center gap-6">
            {marketData?.map((item) => (
              <div
                key={item?.id}
                className="relative w-[160px] px-6 pt-2 pb-3 border rounded border-zinc-200"
              >
                <div
                  className={cn(
                    item?.color,
                    "absolute left-0 top-0 bottom-0 w-1 rounded-tl rounded-bl"
                  )}
                ></div>
                <div className="flex items-center gap-1 mb-3">
                  <Image
                    src={getMarketFlag(item?.title) ?? ""}
                    alt="Flag"
                    width={16}
                    height={16}
                  />
                  <p className="flex items-center gap-2 text-sm text-zinc-700">
                    {item?.title}
                  </p>
                </div>
                {/* {projectLoading ? (
                    <div className="pl-4">
                      <Skeleton className="w-20 h-5 mt-2" />
                    </div>
                  ) : (
                   
                  )} */}
                <p className="text-2xl font-semibold leading-10 text-zinc-700">
                  {item?.percentage}
                </p>
                <p className="text-sm text-zinc-600">
                  Projects:{" "}
                  <span className="font-medium">{item?.projectNum}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="pl-6 border-0 border-l">
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                <ReactEcharts
                  option={marketsPieChartOption}
                  opts={{ renderer: "svg" }}
                  ref={pieChartRef}
                />
              </div>
              <div className="col-span-2">
                <ReactEcharts
                  option={marketBarChartOption}
                  opts={{ renderer: "svg" }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverallStats;
