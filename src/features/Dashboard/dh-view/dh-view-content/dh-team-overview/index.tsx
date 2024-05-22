import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";
import ReactECharts from "echarts-for-react";

const DHTeamOverview = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-7">
          <p className="text-lg font-medium text-zinc-700">Team Overview</p>
        </div>
        <div className="w-full">
          <ReactECharts
            option={{}}
            opts={{ renderer: "svg" }}
            style={{ height: 230 }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DHTeamOverview;
