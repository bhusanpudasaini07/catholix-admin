import React, { useState } from "react";
import TrendingGraphBody from "./trending-graph-body";
import TrendingGraphHeader from "./trending-graph-header";
import { DateRange } from "react-day-picker";

const TrendingGraphContent = () => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneWeekAgo,
    to: new Date(),
  });

  return (
    <div>
      <TrendingGraphHeader dateRange={dateRange} setDateRange={setDateRange} />
      <TrendingGraphBody />
    </div>
  );
};

export default TrendingGraphContent;
