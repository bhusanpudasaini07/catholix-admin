import { useRouter } from "next/router";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

import TrendingGraphBody from "./trending-graph-body";
import TrendingGraphHeader from "./trending-graph-header";
import { useQuery } from "react-query";
import { getLeadsList } from "@/services/lead-report/lead-report-service";

const TrendingGraphContent = () => {
  const router = useRouter();
  const current_id = router.query?.lead_id || undefined;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneWeekAgo,
    to: new Date(),
  });

  const { data: leadList, isLoading: leadsLoading } = useQuery<any>(
    ["getTeamLeadList"],
    async () => {
      const response = getLeadsList();
      return response;
    }
  );

  const allId = leadList?.data.map((item: any) => item?.id);

  return (
    <div>
      <TrendingGraphHeader dateRange={dateRange} setDateRange={setDateRange} />
      <TrendingGraphBody
        id={current_id === "all" ? allId : current_id}
        end_date={dateRange?.to}
        start_date={dateRange?.from}
      />
    </div>
  );
};

export default TrendingGraphContent;
