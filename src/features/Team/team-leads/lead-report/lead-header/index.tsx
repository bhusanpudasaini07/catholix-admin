import { getLeadsList } from "@/services/lead-report/lead-report.service";
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
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { useQuery } from "react-query";

interface IProps {
  setDateRange?: any;
  dateRange?: any;
}

const LeadHeader: FC<IProps> = ({ setDateRange, dateRange }) => {
  const router = useRouter();
  const current_id = router.query?.lead_id || undefined;

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
    <div className="flex justify-between items-center bg-white p-8">
      <div className="">
        <h3 className="mb-1.5 text-2xl font-medium text-zinc-700">
          Lead Report - All
        </h3>
        <p className="text-base text-zinc-500">Report of all the members</p>
      </div>
      <div className="flex justify-end items-center gap-2">
        <Select
          value={current_id ? current_id?.toString() : "all"}
          onValueChange={(e) => handleLeadsId(e)}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {leadList?.data
              ?.filter((lead: any) => lead?.status === "Active")
              ?.map((lead: any) => (
                <SelectItem key={lead.id} value={lead.id}>
                  {lead.fullname}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Tabs
          defaultValue="weekly"
          className=" flex items-center flex-row-reverse gap-3"
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

export default LeadHeader;
