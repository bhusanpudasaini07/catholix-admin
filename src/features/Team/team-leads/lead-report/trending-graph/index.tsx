import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';

import TrendingGraphBody from './trending-graph-body';
import TrendingGraphHeader from './trending-graph-header';

const TrendingGraphContent = () => {
  const router = useRouter();
  const current_id = router.query?.lead_id || undefined;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneWeekAgo,
    to: new Date(),
  });

  return (
    <div>
      <TrendingGraphHeader dateRange={dateRange} setDateRange={setDateRange} />
      <TrendingGraphBody
        id={current_id}
        end_date={dateRange?.to}
        start_date={dateRange?.from}
      />
    </div>
  );
};

export default TrendingGraphContent;
