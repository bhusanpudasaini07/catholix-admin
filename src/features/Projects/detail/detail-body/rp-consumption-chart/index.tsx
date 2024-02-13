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

const RpConsumption = () => {
  const {
    dateType,
    date,
    isLoading,
    setDateType,
    setDate,
    rpConsumption,
    lineOption,
    barStackOption,
    tab,
    setTab,
    barType,
    setBarType,
    barLabelRotationOption,
  } = useRPConsumption();

  return (
    <div className="mt-7 card !p-6">
      <Tabs defaultValue={tab} onValueChange={(e) => setTab(e)}>
        <div className="flex items-center justify-between w-full mb-10">
          <div className="flex items-center justify-start gap-3">
            <p className="text-lg font-medium text-zinc-700">RP Consumption</p>
            <Button variant={"white"} size={"sm"}>
              View Full Graph
            </Button>
          </div>
          <div className="flex items-center gap-3">
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

            {/* To change the bar type */}
            <Select
              defaultValue={barType}
              onValueChange={(e) => setBarType(e)}
              disabled={tab === "line"}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sum">Summed Up</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
              </SelectContent>
            </Select>
            <TabsList className="grid w-full grid-cols-2">
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
              />
            </TabsContent>

            {/* Bar Chart */}
            <TabsContent value="bar">
              <ReactECharts
                option={
                  barType === "sum" ? barStackOption : barLabelRotationOption
                }
                style={{ minHeight: "500px" }}
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
    </div>
  );
};

export default RpConsumption;
