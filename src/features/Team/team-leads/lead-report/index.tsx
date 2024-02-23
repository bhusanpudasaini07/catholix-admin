import LeadHeader from "./lead-header";
import LeadReportBody from "./lead-body";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 31); // currently one mont

const LeadReportContent = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneWeekAgo,
    to: new Date(),
  });
  return (
    <div>
      <LeadHeader setDateRange={setDateRange} dateRange={dateRange} />
      <LeadReportBody dateRange={dateRange} />
    </div>
  );
};

export default LeadReportContent;
