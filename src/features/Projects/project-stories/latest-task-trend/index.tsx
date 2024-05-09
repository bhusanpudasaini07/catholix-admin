import ReactECharts from "echarts-for-react";
import React from "react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import useLatestTrend from "@/hooks/project/detail/useLatestTrend.hook";
import { useRouter } from "next/router";
import GraphSkeleton from "@/shared/components/skeleton-loading/graph-skeleton";

const LatestTaskTrend = () => {
  const router = useRouter();
  const { cardTrendOption, trendDataLoading } = useLatestTrend();
  return (
    <Card>
      <CardContent>
        <div className="flex gap-4 justify-start items-center mb-6">
          <p className="text-lg font-medium text-zinc-700">Latest Task Trend</p>
          <Button
            size={"sm"}
            variant={"white"}
            onClick={() =>
              router?.push(
                `/projects/${router?.query?.code}/project-stories/latest-task-trend`
              )
            }
          >
            Detail View
          </Button>
        </div>

        {trendDataLoading ? (
          <GraphSkeleton className="max-h-[300px] overflow-hidden" />
        ) : (
          <ReactECharts
            option={cardTrendOption}
            opts={{ renderer: "svg" }}
            style={{ height: 260 }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LatestTaskTrend;
