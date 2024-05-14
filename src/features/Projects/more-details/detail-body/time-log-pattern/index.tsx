import ReactECharts from "echarts-for-react";
import moment from "moment";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import useTimeLog from "@/hooks/project/detail/more-detail/useTimeLog.hook";
import DateRangeFilter from "@/shared/components/date-range-filter";
import GraphSkeleton from "@/shared/components/skeleton-loading/graph-skeleton";
import { Card, CardContent } from "@/shared/components/ui/card";
import DatePicker from "@/shared/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import CustomDateFilter from "@/shared/components/custom-date-filter";

const TimeLogPattern = () => {
  const {
    timeLogLoading,
    // STATES

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
        <div className="flex justify-between items-center mb-10 w-full">
          <div className="flex gap-3 justify-start items-center">
            <p className="text-lg font-medium text-zinc-700">
              Time Log Pattern
            </p>
          </div>
          <div className="flex gap-3 items-center">
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

            <CustomDateFilter
              defaultSelected="date_range"
              tabContent={["date_range", "weekly", "monthly"]}
              date={date}
              setDate={setDate}
            />
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
        {/* <Tabs
          defaultValue={tab}
          onValueChange={(e) => {
            setTab(e);
            setDate({ from: undefined, to: undefined });
          }}
        >
         
        </Tabs> */}
      </CardContent>
    </Card>
  );
};

export default TimeLogPattern;
