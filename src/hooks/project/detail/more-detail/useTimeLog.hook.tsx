import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

import { getTimeLogs } from "@/services/project/project-service";

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
          "log_by,time,date", //fields
          date_from, //date_from,
          date_to, //date_to,
          "ASC"
        );
        return response;
      }
    },
    queryKey: ["timeLogs", code, date_to],
    onSuccess: (data) => {
      const dates = data?.data
        ?.map((log: any) => new Date(log.date))
        .sort((a: any, b: any) => a - b);
      setDate({
        from: dates?.[0],
        to: dates?.[dates.length - 1],
      });
    },
  });

  // For unique roles in select option
  const uniqueRoles = Array.from(
    new Set(
      timeLogs?.data?.map(
        (log: { log_by: { role_name: string } }) => log.log_by.role_name
      )
    )
  );

  const lineOption = {
    color: ["#74b9ff"],
    xAxis: {
      type: "category",
      // Format dates for xAxis data, ensuring it defaults to an empty array if undefined
      data:
        timeLogs?.data
          ?.filter(
            (item: any) =>
              selectedRole === "all" || item.log_by.role_name === selectedRole
          )
          .map((item: any) => moment(item.date).format("ll")) ?? [],

      axisLabel: {
        show: true,
        formatter: (value: string) => value,
      },
      axisTick: {
        show: true,
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
      formatter: (params: any) => {
        const value = params[0]?.value;
        const date = moment(params[0]?.name).format("ll");
        return `Date: ${date}<br/>Time(Hours): ${value}`;
      },
    },
    grid: {
      left: "2%",
      right: "2%",
      bottom: "3%",
      containLabel: true,
    },
    series: [
      {
        type: "bar",
        large: true,
        // Process data once, applying filter only if selectedRole is not 'all'
        data:
          timeLogs?.data
            ?.filter(
              (item: any) =>
                selectedRole === "all" || item.log_by.role_name === selectedRole
            )
            .map((item: any) => ({
              value: (item.time / 3600).toFixed(2),
              name: item.date,
            })) ?? [],
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
