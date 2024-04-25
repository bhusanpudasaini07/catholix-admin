import ReactECharts from "echarts-for-react";
import React from "react";

import useProjectStories from "@/hooks/project/detail/useProjectStories.hook";
import GraphSkeleton from "@/shared/components/skeleton-loading/graph-skeleton";
import { Card, CardContent } from "@/shared/components/ui/card";

const UserStatusBugCount = () => {
  const { userStoryStatusOption, userStoryBugOption, isLoading } =
    useProjectStories();
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-10">
            <p className="text-lg font-medium text-zinc-700">
              User Story Status
            </p>
          </div>
          {isLoading ? (
            <GraphSkeleton className="max-h-[300px] overflow-hidden" />
          ) : (
            <ReactECharts
              option={userStoryStatusOption}
              opts={{ renderer: "svg" }}
            />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-10">
            <p className="text-lg font-medium text-zinc-700">
              User Story Bug Count
            </p>
          </div>

          {isLoading ? (
            <GraphSkeleton className="max-h-[300px] overflow-hidden" />
          ) : (
            <ReactECharts
              option={userStoryBugOption}
              opts={{ renderer: "svg" }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatusBugCount;
