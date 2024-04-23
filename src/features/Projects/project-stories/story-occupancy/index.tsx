import ReactEcharts from "echarts-for-react";
import React from "react";

import useProjectStories from "@/hooks/project/detail/useProjectStories.hook";
import { Card, CardContent } from "@/shared/components/ui/card";
import GraphSkeleton from "@/shared/components/skeleton-loading/graph-skeleton";
import PieChartSkeleton from "@/shared/components/skeleton-loading/pie-chart-skeleton";

const UserStoryOccupancy = () => {
  const { storyOccupancyOption, occupancyChartRef, isLoading } =
    useProjectStories();
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">
            User Story Occupancy
          </p>
        </div>

        <div>
          {isLoading ? (
            <PieChartSkeleton height={250} width={250} />
          ) : (
            <ReactEcharts
              ref={occupancyChartRef}
              option={storyOccupancyOption}
              opts={{ renderer: "svg" }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStoryOccupancy;
