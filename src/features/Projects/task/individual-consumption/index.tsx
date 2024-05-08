import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

import ReactECharts from "echarts-for-react";
import { DataTable } from "@/shared/components/data-table/data-table";
import useTaskDetail from "@/hooks/project/task-detail/useTaskDetail.hook";

const TaskIndividualConsumption = () => {
  const { individualConsumptionColumn } = useTaskDetail();
  return (
    <Card className="mb-4 h-fit">
      <CardContent>
        <div className="flex gap-4 justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">
            Individual Consumption
          </p>
        </div>

        <div>
          <ReactECharts option={{}} opts={{ renderer: "svg" }} />

          <DataTable
            data={[]}
            columns={individualConsumptionColumn}
            border
            lottieHeight={120}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskIndividualConsumption;
