import ReactECharts from "echarts-for-react";
import React from "react";

import { Card, CardContent } from "@/shared/components/ui/card";

const TaskProgressStatus = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-7">
          <p className="text-lg font-medium text-zinc-700">
            Task Progress Status
          </p>
        </div>
        <div className="w-full">
          <ReactECharts
            option={{}}
            style={{ height: 200 }}
            opts={{ renderer: "svg" }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskProgressStatus;
