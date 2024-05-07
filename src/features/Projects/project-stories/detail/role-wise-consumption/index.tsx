import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import useStoryDetail from "@/hooks/project/stories/useStoryDetail.hook";

import ReactECharts from "echarts-for-react";

const StoryRoleWiseConsumption = () => {
  const {
    roleWiseOption,
    setRoleWiseOption,
    roleWiseConsumptionColumn,
    roleWiseSankeyOption,
  } = useStoryDetail();
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">
            Role-wise Budget Consumption
          </p>

          <Select
            defaultValue={roleWiseOption}
            onValueChange={(e) => setRoleWiseOption(e)}
          >
            <SelectTrigger className="max-w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utilization">Budget Utilization</SelectItem>
              <SelectItem value="consumed">Budget Consumed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2">
          <DataTable
            data={[]}
            columns={roleWiseConsumptionColumn}
            border
            lottieHeight={120}
          />
          <div className="w-full">
            <ReactECharts
              option={roleWiseSankeyOption}
              opts={{ renderer: "svg" }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryRoleWiseConsumption;
