import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useQuery } from 'react-query';

import { IStaffProjects } from '@/interface/staff-interface';
import { getStaffProjects } from '@/services/staff/staff-service';

const useStaffProjectOverview = () => {
  const {
    query: { username },
  } = useRouter();

  // STATES

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [overviewDateOpen, setOverviewDateOpen] = useState(false);

  const [projectStates, setProjectStates] = useState({
    total: 0,
    client: 0,
    inhouse: 0,
    risk: 0,
  });

  // For status show (Projects Overview > total, client, inhouse, risk)
  const { isLoading: staffProjectStatusLoading } = useQuery<IStaffProjects>({
    queryFn: async () => {
      const currentDate = moment().format("YYYY-MM-DD");
      const sixMonthsAgo = moment().subtract(6, "months").format("YYYY-MM-DD");
      const dateRange = { from: sixMonthsAgo, to: currentDate };
      if (username) {
        const response = await getStaffProjects(
          username, //staff id
          date?.to ? moment(date?.from).format("YYYY-MM-DD") : dateRange?.from, //date_from
          date?.to ? moment(date?.to).format("YYYY-MM-DD") : dateRange?.to //date_to
        );

        return response;
      }
    },
    queryKey: ["staffProjects", username, date?.to],
    onSuccess: (res) => {
      const totalProjects = res?.data?.projects?.length;
      const clientProjects = res?.data?.projects?.filter(
        (item) => item?.source === "Client"
      ).length;
      const inhouseProjects = res?.data?.projects?.filter(
        (item) => item?.source === "In-House"
      ).length;
      const riskProjects = res?.data?.projects?.filter(
        (item) => item?.risk_status === "High"
      ).length;

      setProjectStates({
        total: totalProjects,
        client: clientProjects,
        inhouse: inhouseProjects,
        risk: riskProjects,
      });
    },
  });
  return {
    overviewDateOpen,
    setOverviewDateOpen,
    staffProjectStatusLoading,
    projectStates,
    date,
    setDate,
  };
};

export default useStaffProjectOverview;
