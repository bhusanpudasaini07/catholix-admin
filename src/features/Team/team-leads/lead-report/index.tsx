import { useState } from "react";
import { DateRange } from "react-day-picker";

import LeadReportBody from "./lead-body";
import LeadHeader from "./lead-header";

export const oneWeekAgo = new Date();
const sixMonthsAgo = new Date();
sixMonthsAgo?.setMonth(sixMonthsAgo?.getMonth() - 6);

const LeadReportContent = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: sixMonthsAgo,
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
