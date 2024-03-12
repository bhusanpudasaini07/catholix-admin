import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import LeadReportBody from './lead-body';
import LeadHeader from './lead-header';

export const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 31); // currently one mont

const LeadReportContent = () => {
  const router = useRouter();
  // const current_id = router?.query?.lead_id;
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneWeekAgo,
    to: new Date(),
  });
  // useEffect(() => {
  //   if (current_id === undefined) {
  //     router.push("/team-leads/lead-report?lead_id=all");
  //   } else {
  //     router.push(`/team-leads/lead-report?lead_id=${current_id}`);
  //   }
  // }, [current_id]);
  return (
    <div>
      <LeadHeader setDateRange={setDateRange} dateRange={dateRange} />
      <LeadReportBody dateRange={dateRange} />
    </div>
  );
};

export default LeadReportContent;
