import ReactECharts from "echarts-for-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import moment from "moment";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import GraphSkeleton from "@/shared/components/skeleton-loading/graph-skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Card, CardContent } from "@/shared/components/ui/card";
import DateRangeFilter from "@/shared/components/date-range-filter";
import useTimeLog from "@/hooks/project/detail/more-detail/useTimeLog.hook";
import DatePicker from "@/shared/components/ui/date-picker";

const TimeLogPattern = () => {
  const {
    timeLogLoading,
    // STATES
    daily,
    setDaily,
    date,
    setDate,
    tab,
    setTab,
    dateRangeOpen,
    setDateRangeOpen,
    selectedRole,
    setSelectedRole,

    uniqueRoles,
    // Chart
    lineOption,
  } = useTimeLog();

  return (
    <Card>
      <CardContent>
        <Tabs
          defaultValue={tab}
          onValueChange={(e) => {
            setTab(e);
            setDate({ from: undefined, to: undefined });
            setDaily(undefined);
          }}
        >
          <div className="flex items-center justify-between w-full mb-10">
            <div className="flex items-center justify-start gap-3">
              <p className="text-lg font-medium text-zinc-700">
                Time Log Pattern
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select
                defaultValue={selectedRole}
                onValueChange={(e) => setSelectedRole(e)}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="max-h-[350px]">
                  <SelectItem value="all">All</SelectItem>
                  {uniqueRoles?.map((item: any, index) => (
                    <SelectItem value={item} key={index}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="w-[250px]">
                {tab !== "daily" ? (
                  <DateRangeFilter
                    dateRangeOpen={dateRangeOpen}
                    setDateRangeOpen={setDateRangeOpen}
                    dateRange={date}
                    setDateRange={setDate}
                  />
                ) : (
                  <DatePicker
                    text="Select Date"
                    date={daily}
                    setDate={setDaily}
                    mode={"single"}
                    className="w-full"
                  />
                )}
              </div>
              <TabsList className="grid w-auto grid-cols-4">
                <TabsTrigger value="overall">Overall</TabsTrigger>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </div>
          </div>
          {!timeLogLoading ? (
            <ReactECharts
              style={{ width: "100%", height: "500px" }}
              option={lineOption}
              opts={{ renderer: "svg" }}
            />
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

export default TimeLogPattern;
