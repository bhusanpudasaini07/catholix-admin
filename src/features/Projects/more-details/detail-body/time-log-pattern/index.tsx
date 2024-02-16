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
import { useState } from "react";
import { DateRange } from "react-day-picker";
import moment from "moment";

const TimeLogPattern = () => {
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [barType, setBarType] = useState("sum");
  const dataCount = 700;
  const data = generateData(dataCount);
  function generateData(count: number) {
    let baseValue = Math.random() * 10;
    let time = +new Date(2011, 0, 1);
    let smallBaseValue: number;

    function next(idx: number) {
      smallBaseValue =
        idx % 3 === 0
          ? Math.random() * 2
          : smallBaseValue + Math.random() * 8 - 5;
      baseValue += Math.random() * 20 - 10;
      return Math.max(0, Math.round(baseValue + smallBaseValue) + 2);
    }

    const categoryData = [];
    const valueData = [];

    for (let i = 0; i < count; i++) {
      categoryData.push(moment(time).format("YYYY-MM-DD\nHH:mm:ss"));
      valueData.push(next(i).toFixed(2));

      time += 100;
    }

    return {
      categoryData: categoryData,
      valueData: valueData,
    };
  }
  const lineOption = {
    color: ["#74b9ff"],
    xAxis: {
      type: "category",
      data: data.categoryData,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      // silent: false,
      // splitLine: {
      //   show: false,
      // },
      // splitArea: {
      //   show: false,
      // },
    },
    series: [
      {
        type: "bar",
        data: data.valueData,
        // Set `large` for large data amount
        large: true,
      },
    ],
  };

  const [tab, setTab] = useState("overall");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  return (
    <Card className="mt-7">
      <CardContent>
        <Tabs defaultValue={tab} onValueChange={(e) => setTab(e)}>
          <div className="flex items-center justify-between w-full mb-10">
            <div className="flex items-center justify-start gap-3">
              <p className="text-lg font-medium text-zinc-700">
                Time Log Pattern
              </p>
              <Button variant={"white"} size={"sm"}>
                More Details
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[30%]">
                <DateRangeFilter
                  dateRangeOpen={dateRangeOpen}
                  setDateRangeOpen={setDateRangeOpen}
                  dateRange={date}
                  setDateRange={setDate}
                />
              </div>
              <Select
                defaultValue={"all"}
                // onValueChange={(e) => setDateType(e)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="qa">QA</SelectItem>
                  <SelectItem value="designers">Designers</SelectItem>
                  <SelectItem value="developers">Developers</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <TabsList className="grid w-auto grid-cols-4">
                <TabsTrigger value="overall">Overall</TabsTrigger>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </div>
          </div>
          {!isLoading ? (
            <>
              {/* overall */}
              <TabsContent value="overall">
                <ReactECharts
                  style={{ minHeight: "500px" }}
                  option={lineOption}
                />
              </TabsContent>
              {/* daily */}
              <TabsContent value="daily">
                <ReactECharts
                  option={lineOption}
                  style={{ minHeight: "500px" }}
                />
              </TabsContent>
              {/* weekly */}
              <TabsContent value="weekly">
                <ReactECharts
                  option={lineOption}
                  style={{ minHeight: "500px" }}
                />
              </TabsContent>
              {/* monthly */}
              <TabsContent value="monthly">
                <ReactECharts
                  option={lineOption}
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
      </CardContent>
    </Card>
  );
};

export default TimeLogPattern;
