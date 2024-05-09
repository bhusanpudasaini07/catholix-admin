import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

import { getLeadsList } from "@/services/lead-report/lead-report-service";
import DateRangeFilter from "@/shared/components/date-range-filter";
import { Button } from "@/shared/components/ui/button";
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

interface IProps {
  dateRange: DateRange | undefined;
  dateRangeOpen: boolean;
  setDateRangeOpen: (arg: boolean) => void;
  setDateRange: (arg: DateRange) => void;
  handleChange: (value: any) => void;
  selected: string;
  setSelected: (arg: string) => void;
  weeklyData: { value: string; label: string }[];
}

const ProjectRPConsumptionHeader = ({
  dateRange,
  dateRangeOpen,
  setDateRangeOpen,
  setDateRange,
  handleChange,
  selected,
  setSelected,
  weeklyData,
}: IProps) => {
  const router = useRouter();
  const current_id = router.query?.lead_id || undefined;

  return (
    <div className="flex justify-between items-center p-8 bg-white">
      <div className="flex gap-4 items-start">
        <Button
          onClick={() =>
            router.push(`/team-leads/lead-report?lead_id=${current_id}`)
          }
          variant={"table"}
          className="h-auto gap-2 p-2.5"
          size={"sm"}
        >
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h3 className="mb-1.5 text-2xl font-medium text-zinc-700">
            Project Budget Consumption
          </h3>
          <p className="text-base text-zinc-500">List by country</p>
        </div>
      </div>
      <div className="flex gap-2 justify-end items-center">
        <Tabs
          defaultValue="monthly"
          className="flex flex-row-reverse gap-3 items-center"
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
            />
          </TabsContent>
          <TabsContent className="!m-0" value="daily">
            <DateRangeFilter
              placeholder="Select Daily"
              dateRangeOpen={dateRangeOpen}
              setDateRangeOpen={setDateRangeOpen}
              setDateRange={setDateRange}
              dateRange={dateRange}
            />
          </TabsContent>
          <TabsContent className="!m-0" value="weekly">
            <Select onValueChange={handleChange} value={selected}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Weekly" />
              </SelectTrigger>
              <SelectContent>
                {weeklyData.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TabsContent>
          <TabsContent className="!m-0" value="multi_week">
            <DateRangeFilter
              placeholder="Select Multiple Weekly"
              dateRangeOpen={dateRangeOpen}
              setDateRangeOpen={setDateRangeOpen}
              setDateRange={setDateRange}
              dateRange={dateRange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectRPConsumptionHeader;
