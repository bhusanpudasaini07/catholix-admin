import DateRangeFilter from "@/shared/components/date-range-filter";
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
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
export const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 31); // currently one mont

const MemberResourceHeader = () => {
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneWeekAgo,
    to: new Date(),
  });

  const handleChange = (value: any) => {
    setSelected(value);
  };
  return (
    <div className="flex justify-between items-center px-8 py-6 bg-light-white border-b-slate-100">
      <div className="">
        <h3 className="mb-1.5 text-2xl font-medium text-zinc-700 whitespace-nowrap">
          Member Resource Report
        </h3>
        <p className="text-base whitespace-nowrap text-zinc-500">
          List of Members
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-end items-center">
        <Select defaultValue="all">
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>

        <Tabs
          defaultValue="monthly"
          className="flex flex-row-reverse flex-wrap gap-3 items-center"
        >
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Report</TabsTrigger>
            <TabsTrigger value="multi_week">Multiple Weekly Report</TabsTrigger>
          </TabsList>

          <TabsContent className="!m-0" value="monthly">
            <DateRangeFilter
              placeholder="Select Monthly"
              dateRangeOpen={dateRangeOpen}
              setDateRangeOpen={setDateRangeOpen}
              setDateRange={setDateRange}
              dateRange={dateRange}
              buttonClassName="min-w-[240px]"
            />
          </TabsContent>
          <TabsContent className="!m-0" value="daily">
            <DateRangeFilter
              placeholder="Select Daily"
              dateRangeOpen={dateRangeOpen}
              setDateRangeOpen={setDateRangeOpen}
              setDateRange={setDateRange}
              dateRange={dateRange}
              buttonClassName="min-w-[240px]"
            />
          </TabsContent>
          {/* <TabsContent className="!m-0" value="weekly">
            <Select onValueChange={handleChange} value={selected}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Weekly" />
              </SelectTrigger>
              <SelectContent>
                {weeklyData.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TabsContent> */}
          <TabsContent className="!m-0" value="multi_week">
            <DateRangeFilter
              placeholder="Select Multiple Weekly"
              dateRangeOpen={dateRangeOpen}
              setDateRangeOpen={setDateRangeOpen}
              setDateRange={setDateRange}
              dateRange={dateRange}
              buttonClassName="min-w-[240px]"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MemberResourceHeader;
