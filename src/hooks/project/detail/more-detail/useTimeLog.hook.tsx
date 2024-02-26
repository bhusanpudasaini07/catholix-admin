import { useRouter } from "next/router";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

import { getTimeLogs } from "@/services/project/project-service";
import moment from "moment";

const useTimeLog = () => {
  const {
    query: { code },
  } = useRouter();

  // STATES
  const [daily, setDaily] = useState<Date | undefined>(undefined);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [tab, setTab] = useState("overall");
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("all");

  let date_from = "";
  let date_to = "";

  if (tab === "daily" && daily) {
    date_from = daily ? moment(daily).format("YYYY-MM-DD") : "";
    date_to = daily ? moment(daily).format("YYYY-MM-DD") : "";
  } else {
    date_from = date?.from ? moment(date?.from).format("YYYY-MM-DD") : "";
    date_to = date?.to ? moment(date?.to).format("YYYY-MM-DD") : "";
  }

  const { data: timeLogs, isLoading: timeLogLoading } = useQuery({
    queryFn: async () => {
      if (code) {
        const response = await getTimeLogs(
          code,
          "", //Keyword
          1, //page
          2000000, //perpage
          "log_by,time", //fields
          date_from, //date_from,
          date_to //date_to
        );
        return response;
      }
    },
    queryKey: ["timeLogs", code, date_to],
  });

  const uniqueRoles = Array.from(
    new Set(
      timeLogs?.data?.map(
        (log: { log_by: { role_name: string } }) => log.log_by.role_name
      )
    )
  );

  //   const filteredTimeLogs = timeLogs?.data?.filter(
  //     (log: { log_by: { role_name: string } }) =>
  //       !selectedRole || log.log_by.role_name === selectedRole
  //   );

  //   const handleRoleSelect = (role: string) => {
  //     setSelectedRole(role);
  //   };

  //   const lineOptionFiltered = {
  //     ...lineOption,
  //     series: [
  //       {
  //         ...lineOption.series[0],
  //         data: filteredTimeLogs?.map((item: { time: number }) =>
  //           (item?.time / 3600).toFixed(2)
  //         ),
  //       },
  //     ],
  //   };

  const lineOption = {
    color: ["#74b9ff"],
    xAxis: {
      type: "category",
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        // Assuming params[0] is the current data point. This might need adjustment based on your data structure.
        let value = params[0]?.value;
        return `Time(Hours): ${value}`;
      },
    },
    series: [
      {
        type: "bar",
        data: timeLogs?.data?.map((item: { time: number }) =>
          (item?.time / 3600).toFixed(2)
        ),
        large: true,
      },
    ],
  };

  return {
    timeLogLoading,
    timeLogs,
    // STATES
    daily,
    setDaily,
    date,
    setDate,
    tab,
    setTab,
    dateRangeOpen,
    setDateRangeOpen,
    selectedRole,
    setSelectedRole,

    // Select Roles
    uniqueRoles,

    // Chart
    lineOption,
  };
};

export default useTimeLog;
