import { getLeadsList } from "@/services/lead-report/lead-report-service";
import DateRangeFilter from "@/shared/components/date-range-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { useQuery } from "react-query";

interface IProps {
  setDateRange: any;
  dateRange: any;
}

const TrendingGraphHeader: FC<IProps> = ({ setDateRange, dateRange }) => {
  const router = useRouter();
  const current_id = router.query?.lead_id || undefined;
  const [selected, setSelected] = useState<string>("");
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const { data: leadList, isLoading: leadsLoading } = useQuery<any>(
    ["getTeamLeadList"],
    async () => {
      const response = getLeadsList();
      return response;
    }
  );

  const handleLeadsId = (id: string) => {
    router.push(`/team-leads/lead-report/trending-graph?lead_id=${id}`);
  };
  return (
    <div className="flex justify-between items-center bg-white p-8">
      <div className="">
        <h3 className="mb-1.5 text-2xl font-medium text-zinc-700">
          Trendline Graph
        </h3>
        <p className="text-base text-zinc-500">Report of all the members</p>
      </div>
      <div className="flex justify-end items-center gap-2">
        <div className="">
          <Select
            value={current_id ? current_id?.toString() : "all"}
            onValueChange={(e) => handleLeadsId(e)}
          >
            <SelectTrigger className="w-[220px] h-[36px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {leadList?.data
                .filter((lead: any) => lead?.status === "Active")
                .map((lead: any) => (
                  <SelectItem key={lead?.id} value={lead?.id}>
                    {lead?.fullname}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <DateRangeFilter
          placeholder="Select Monthly"
          dateRangeOpen={dateRangeOpen}
          setDateRangeOpen={setDateRangeOpen}
          setDateRange={setDateRange}
          dateRange={dateRange}
        />
      </div>
    </div>
  );
};

export default TrendingGraphHeader;
