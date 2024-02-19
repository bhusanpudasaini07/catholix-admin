import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { Button } from "@/shared/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import GraphSkeleton from "@/shared/components/skeleton-loading/graph-skeleton";
import useRPConsumption from "@/hooks/project/detail/useRPConsumption.hook";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Card, CardContent } from "@/shared/components/ui/card";
import DateRangeFilter from "@/shared/components/date-range-filter";

const RpConsumption = () => {
  const {
    dateType,
    wiseType,
    setWiseType,
    date,
    setDate,
    dateRangeOpen,
    setDateRangeOpen,
    isLoading,
    setDateType,
    lineOption,
    barStackOption,
    tab,
    setTab,
    barType,
    setBarType,
    barLabelRotationOption,
  } = useRPConsumption();

  return (
    <Card className="mt-7">
      <CardContent>
        <Tabs defaultValue={tab} onValueChange={(e) => setTab(e)}>
          <div className="flex flex-col flex-wrap justify-between w-full gap-4 mb-10 xl:items-center xl:flex-row">
            <div className="flex items-center justify-start gap-3">
              <p className="text-lg font-medium text-zinc-700">
                RP Consumption
              </p>
              <Button variant={"white"} size={"sm"}>
                View Burndown Chart
              </Button>
            </div>
            <div className="flex items-center gap-3">
              {/* <div className="w-[30%]">
                <DateRangeFilter
                  dateRangeOpen={dateRangeOpen}
                  setDateRangeOpen={setDateRangeOpen}
                  dateRange={date}
                  setDateRange={setDate}
                />
              </div> */}
              <Select
                defaultValue={dateType}
                onValueChange={(e) => setDateType(e)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>

              <Select
                defaultValue={wiseType}
                onValueChange={(e) => setWiseType(e)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="role">Role-wise</SelectItem>
                  <SelectItem value="department">Department-wise</SelectItem>
                </SelectContent>
              </Select>

              {/* To change the bar type */}
              <Select
                defaultValue={barType}
                onValueChange={(e) => setBarType(e)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sum">Summed Up</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                </SelectContent>
              </Select>
              <TabsList className="grid w-auto grid-cols-2">
                <TabsTrigger value="line">Line Chart</TabsTrigger>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              </TabsList>
            </div>
          </div>
          {!isLoading ? (
            <>
              {/* Line graph */}
              <TabsContent value="line">
                <ReactECharts
                  style={{ minHeight: "500px" }}
                  option={lineOption}
                  notMerge={true}
                />
              </TabsContent>

              {/* Bar Chart */}
              <TabsContent value="bar">
                <ReactECharts
                  option={
                    barType === "sum" ? barStackOption : barLabelRotationOption
                  }
                  style={{ minHeight: "500px" }}
                  notMerge={true}
                />
              </TabsContent>
            </>
          ) : (
            // Bar graph
            <div className="w-full">
              <GraphSkeleton />
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RpConsumption;
