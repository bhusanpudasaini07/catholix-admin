import React from "react";
import ReactECharts from "echarts-for-react";

import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/data-table/data-table";

import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";
import useConsumptionType from "@/hooks/project/detail/useConsumptionType.hook";
import { Card, CardContent } from "@/shared/components/ui/card";
import useProjectRpSummary from "@/hooks/project/detail/useProjectRpSummary.hook";

const ConsumptionType = () => {
  const { rpSummary, rpLoading } = useProjectRpSummary();

  const { staffColumns, roleColumns, option } = useConsumptionType();

  return (
    <div className="grid grid-cols-12 gap-6 mt-4">
      {/* Team Wise */}
      <div className="col-span-12 xl:col-span-6 ">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center justify-start gap-3">
                <p className="text-lg font-medium text-zinc-700">
                  Team Wise Consumption
                </p>
                <Button variant={"white"} size={"sm"}>
                  More Details
                </Button>
              </div>
            </div>
            <div className="">
              <ReactECharts option={option} />
            </div>
            <div className="overflow-hidden rounded-md grow ">
              <DataTable
                columns={staffColumns}
                border={true}
                loading={rpLoading}
                data={rpSummary?.data?.staffwise?.slice(0, 5) ?? []}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role Wise */}
      <div className="col-span-12 xl:col-span-6 ">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center justify-start gap-3">
                <p className="text-lg font-medium text-zinc-700">
                  Role Wise Consumption
                </p>
                <Button variant={"white"} size={"sm"}>
                  More Details
                </Button>
              </div>
            </div>
            <div className="">
              <ReactECharts option={option} />
            </div>
            <div className="overflow-hidden rounded-md grow ">
              <DataTable
                border={true}
                columns={roleColumns}
                loading={rpLoading}
                data={rpSummary?.data?.rolewise.slice(0, 5) ?? []}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsumptionType;
