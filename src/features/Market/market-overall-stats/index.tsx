import ReactEcharts, { EChartsOption } from "echarts-for-react";
import Image from "next/image";
import React, { RefObject } from "react";

import { IMarkets } from "@/interface/market-interface";
import { Card, CardContent } from "@/shared/components/ui/card";
import MarketDataCardSkeleton from "@/shared/components/skeleton-loading/market/market-data-card-skeleton";
import PieChartSkeleton from "@/shared/components/skeleton-loading/pie-chart-skeleton";
import Link from "next/link";

interface IProps {
  marketsPieChartOption: EChartsOption;
  marketBarChartOption: EChartsOption;
  pieChartRef: RefObject<ReactEcharts>;
  marketStats: IMarkets[];
  marketLoading: boolean;
}

const MarketOverallStats = ({
  marketsPieChartOption,
  marketBarChartOption,
  pieChartRef,
  marketStats,
  marketLoading,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-9">
          <p className="text-lg font-medium text-zinc-700">Overall Stats</p>
        </div>
        <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
          <div className="flex flex-wrap gap-6">
            {marketLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <MarketDataCardSkeleton key={index} />
                ))
              : marketStats?.map((item) => (
                  <div
                    key={item?.id}
                    className="relative w-[160px] px-6 pt-2 h-fit pb-3 border rounded border-zinc-200"
                  >
                    <Link
                      className="absolute top-0 right-0 bottom-0 left-0"
                      href={`#${item?.title}`}
                    />
                    <div
                      style={{ backgroundColor: item?.color }}
                      className={
                        "absolute top-0 bottom-0 left-0 w-1 rounded-tl rounded-bl"
                      }
                    ></div>

                    <div className="flex gap-1 items-center mb-3">
                      {/* {item?.flag === "" ? ( */}
                      <Image
                        src={item?.flag ?? ""}
                        alt="Flag"
                        width={16}
                        height={16}
                      />
                      {/* // ) : ( */}
                      {/* // <div className="rounded border border-zinc-200 size-4"></div>
                      // )} */}

                      <p className="flex gap-2 items-center text-sm text-zinc-700">
                        {item?.title}
                      </p>
                    </div>
                    <p className="text-2xl font-semibold leading-10 text-zinc-700">
                      {item?.rpPercentage}%
                    </p>
                    <p className="text-sm text-zinc-600">
                      Projects:{" "}
                      <span className="font-medium">
                        {item?.project_count ?? 0}
                      </span>
                    </p>
                  </div>
                ))}
          </div>
          <div className="pl-6 border-0 border-l">
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                {marketLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <PieChartSkeleton height={200} width={200} />
                  </div>
                ) : (
                  <ReactEcharts
                    option={marketsPieChartOption}
                    opts={{ renderer: "svg" }}
                    ref={pieChartRef}
                  />
                )}
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
