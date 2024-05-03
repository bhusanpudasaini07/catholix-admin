import { useState } from "react";
import { DateRange } from "react-day-picker";

import LeadReportBody from "./lead-body";
import LeadHeader from "./lead-header";

export const oneWeekAgo = new Date();
const oneMonthAgo = new Date();
oneMonthAgo?.setMonth(oneMonthAgo?.getMonth() - 1);

const LeadReportContent = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneMonthAgo,
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
