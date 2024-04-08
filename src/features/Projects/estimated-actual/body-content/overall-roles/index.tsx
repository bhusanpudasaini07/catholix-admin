import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";
import ReactECharts from "echarts-for-react";
import useEstimatedActual from "@/hooks/project/estimated-actual/useEstimatedActual.hook";

const OverallRoles = () => {
  const { overallRolesOption } = useEstimatedActual();
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-9">
          <p className="text-lg font-medium text-zinc-700">Overall Roles</p>
        </div>
        <div className="w-full">
          <div className="flex gap-6 justify-end items-center">
            <div className="flex gap-1.5 items-center">
              <div className="bg-red-500 rounded-sm size-4"></div>
              <p className="text-sm text-zinc-700">Over</p>
            </div>
            <div className="flex gap-1.5 items-center">
              <div className="bg-green-100 rounded-sm size-4"></div>
              <p className="text-sm text-zinc-700">Budget</p>
            </div>
            <div className="flex gap-1.5 items-center">
              <div className="bg-blue-100 rounded-sm size-4"></div>
              <p className="text-sm text-zinc-700">Estimate</p>
            </div>
          </div>
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
