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
import { ArrowLeft } from "lucide-react";

const ProjectRPConsumptionHeader = () => {
  const router = useRouter();
  const current_id = router.query?.lead_id || undefined;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 31);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneWeekAgo,
    to: new Date(),
  });

  const [selected, setSelected] = useState<string>("");

  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [activeLeads, setActiveLeads] = useState([]);

  const handleChange = (value: any) => {
    setSelected(value);
  };
  const weeklyData = [
    { value: "2022-10-10", label: "October 10, 2022" },
    { value: "2022-10-17", label: "October 17, 2022" },
    { value: "2022-10-24", label: "October 24, 2022" },
  ];

  const { data: leadList, isLoading: leadsLoading } = useQuery<any>(
    ["getTeamLeadList"],
    async () => {
      const response = getLeadsList();
      return response;
    }
  );

  const handleLeadsId = (id: string) => {
    router.push(`/team-leads/lead-report?lead_id=${id}`);
  };

  return (
    <div className="flex items-center justify-between p-8 bg-white">
      <div className="flex items-start gap-4">
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
      <div className="flex items-center justify-end gap-2">
        <Tabs
          defaultValue="monthly"
          className="flex flex-row-reverse items-center gap-3 "
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
