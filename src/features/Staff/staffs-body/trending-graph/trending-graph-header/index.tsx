import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
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

interface IProps {
  setDateRange: any;
  dateRange: any;
}

const StaffsTrendingGraphHeader: FC<IProps> = ({ setDateRange, dateRange }) => {
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
    <div className="flex items-center justify-between p-8 bg-white">
      <div className="flex items-start justify-start gap-3">
        <div className="">
          <Button
            onClick={() => router.back()}
            variant={"table"}
            className="h-auto gap-2 p-2.5"
            size={"sm"}
          >
            <ArrowLeft size={18} />
          </Button>
        </div>
        <div className="">
          <h3 className="mb-1.5 text-2xl font-medium text-zinc-700">
            Trendline Graph
          </h3>
          <p className="text-base text-zinc-500">
            Graph of Budget Available Vs Used Vs Commercial
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        {/* <div className="">
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
        </div> */}
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

export default StaffsTrendingGraphHeader;
