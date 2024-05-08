import { IProject } from "@/interface/team-lead-report-interface";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useCommonStore } from "@/store/common-store";
import Image from "next/image";
import React, { FC } from "react";

interface IProps {
  data: IProject[];
}

const getColor = (percentage: number): string => {
  if (percentage < 20) {
    return "#EE6666";
  } else if (percentage < 40) {
    return "#73C0DE";
  } else if (percentage < 80) {
    return "#9A60B4";
  } else {
    return "#91CC75";
  }
};

const MarketResource: FC<IProps> = ({ data }) => {
  const { filterConfig } = useCommonStore();

  const totalRPAllProjects = data?.reduce(
    (total: number, project: IProject) => {
      const { total_rp } = project;
      if (total_rp) {
        return total + parseFloat(total_rp);
      }
      return total;
    },
    0
  );

  const marketDataMap = data?.reduce(
    (
      acc: Map<
        string,
        { projects: number; totalRP: number; percentage: number }
      >,
      project: IProject
    ) => {
      const { market, total_rp } = project;
      if (market && total_rp) {
        const totalRP = parseFloat(total_rp)?.toFixed(2); // Ensure two decimal places
        const percentage = (parseFloat(totalRP) / totalRPAllProjects) * 100;
        if (!acc?.has(market)) {
          acc?.set(market, {
            projects: 1,
            totalRP: parseFloat(totalRP),
            percentage,
          });
        } else {
          const existingMarket = acc?.get(market);
          if (existingMarket) {
            acc.set(market, {
              projects: existingMarket?.projects + 1,
              totalRP: existingMarket?.totalRP + parseFloat(totalRP),
              percentage: existingMarket?.percentage + percentage,
            });
          }
        }
      }
      return acc;
    },
    new Map<string, { projects: number; totalRP: number; percentage: number }>()
  );

  const marketDataArray = marketDataMap
    ? Array?.from(
        marketDataMap,
        ([market, { projects, totalRP, percentage }]) => ({
          market,
          projects,
          totalRP,
          percentage,
        })
      )
    : [];

  return (
    <Card className="bg-slate-50 border-slate-200 w-full">
      <CardContent>
        <p className="text-zinc-700 text-base font-medium mb-3">
          Market Resource Utilization
        </p>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {marketDataArray.map((item, index) => (
            <Card
              key={index}
              className={`border-l-[6px] rounded-[6px]`}
              style={{ borderLeftColor: getColor(item?.percentage) }}
            >
              <CardContent className="!py-2 !px-3">
                <div className="flex justify-start items-center gap-2  mb-2">
                  <Image
                    src={
                      filterConfig?.markets?.find(
                        (configItem: any) => configItem?.title === item?.market
                      )?.flag
                    }
                    height={16}
                    width={16}
                    style={{ objectFit: "contain" }}
                    alt="Flag"
                  />
                  <p className="text-sm text-zinc-700 font-normal">
                    {item?.market}
                  </p>
                </div>
                <div>
                  <p className="text-3xl text-zinc-700 font-semibold mb-2 whitespace-nowrap">
                    {item?.percentage.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 font-normal">
                    Project:
                    <span className="ms-1 font-medium">{item?.projects}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketResource;
