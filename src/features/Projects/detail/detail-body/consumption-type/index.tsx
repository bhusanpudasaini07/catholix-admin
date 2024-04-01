import ReactECharts from "echarts-for-react";
import React from "react";

import useConsumptionType from "@/hooks/project/detail/useConsumptionType.hook";
import useProjectRpSummary from "@/hooks/project/detail/useProjectRpSummary.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

const ConsumptionType = () => {
  const { rpSummary, rpLoading } = useProjectRpSummary();

  const {
    staffColumns,
    roleColumns,
    staffWiseOption,
    roleWiseOption,
    teamChartRef,
    roleChartRef,
  } = useConsumptionType();

  const teamWiseSortedData = rpSummary?.data?.staffwise
    ? [...rpSummary.data.staffwise]?.sort(
        (a, b) => Number(b?.rp) - Number(a?.rp)
      )
    : [];
  const roleWiseSortedData = rpSummary?.data?.rolewise
    ? [...rpSummary.data.rolewise]?.sort(
        (a, b) => Number(b?.rp) - Number(a?.rp)
      )
    : [];

  return (
    <div className="grid grid-cols-12 gap-4 mt-4">
      {/* Team Wise */}
      <div className="col-span-12 xl:col-span-6">
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-3">
              <div className="flex gap-3 justify-start items-center">
                <p className="text-lg font-medium text-zinc-700">
                  Team Wise Consumption
                </p>
                {/* <Button variant={"white"} size={"sm"}>
                  More Details
                </Button> */}
              </div>
            </div>
            <div className="">
              <ReactECharts
                ref={teamChartRef}
                opts={{ renderer: "svg" }}
                option={staffWiseOption}
              />
            </div>
            <div className="overflow-hidden rounded-md grow">
              <DataTable
                columns={staffColumns}
                border={true}
                loading={rpLoading}
                headerSticky={true}
                height="max-h-[340px]"
                data={teamWiseSortedData ?? []}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role Wise */}
      <div className="col-span-12 xl:col-span-6">
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-3">
              <div className="flex gap-3 justify-start items-center">
                <p className="text-lg font-medium text-zinc-700">
                  Role Wise Consumption
                </p>
                {/* <Button variant={"white"} size={"sm"}>
                  More Details
                </Button> */}
              </div>
            </div>
            <div className="">
              <ReactECharts
                option={roleWiseOption}
                ref={roleChartRef}
                opts={{ renderer: "svg" }}
              />
            </div>
            <div className="overflow-hidden rounded-md grow">
              <DataTable
                border={true}
                columns={roleColumns}
                loading={rpLoading}
                headerSticky={true}
                height="max-h-[340px]"
                data={roleWiseSortedData ?? []}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsumptionType;
