import React from "react";
import ReactECharts from "echarts-for-react";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

interface IProps {
  option: any;
}

const ChartCard = ({ option }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-4 mb-10">
          <p className="text-lg font-medium text-zinc-700">RP Burndown Chart</p>
          <Button variant={"white"} size={"sm"}>
            View Team RP
          </Button>
        </div>
        <div>
          <ReactECharts
            style={{ height: "500px" }}
            opts={{ renderer: "svg" }}
            option={option}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
