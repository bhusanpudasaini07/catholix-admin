import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";
import ReactECharts from "echarts-for-react";
import useEstimatedActual from "@/hooks/project/estimated-actual/useEstimatedActual.hook";

const OverallRoles = () => {
  const { overallRolesOption } = useEstimatedActual();
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-9">
          <p className="text-lg font-medium text-zinc-700">Overall Roles</p>
        </div>
        <div className="w-full">
          <ReactECharts
            option={overallRolesOption}
            style={{ height: "350px" }}
            opts={{ renderer: "svg" }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallRoles;
