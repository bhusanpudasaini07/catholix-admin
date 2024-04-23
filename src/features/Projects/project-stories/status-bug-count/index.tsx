import ReactECharts from "echarts-for-react";
import React from "react";

import useProjectStories from "@/hooks/project/detail/useProjectStories.hook";
import { Card, CardContent } from "@/shared/components/ui/card";

const UserStatusBugCount = () => {
  const { userStoryStatusOption, userStoryBugOption } = useProjectStories();
  return (
    <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-10">
            <p className="text-lg font-medium text-zinc-700">
              User Story Status
            </p>
          </div>
          <ReactECharts
            option={userStoryStatusOption}
            opts={{ renderer: "svg" }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-10">
            <p className="text-lg font-medium text-zinc-700">
              User Story Bug Count
            </p>
          </div>
          <ReactECharts
            option={userStoryBugOption}
            opts={{ renderer: "svg" }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatusBugCount;
