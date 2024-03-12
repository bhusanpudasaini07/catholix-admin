import { IDashboardTimelog } from "@/interface/dashboard-interface";
import { getDashboardStaffTimelog } from "@/services/dashboard/dashboard-service";
import { Timer, TimerOff, Users2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";

const useDashboardTimeLog = () => {
  const [date, setDate] = useState<Date | undefined>(
    moment().subtract(1, "days").toDate()
  );

  const changeDate = (date: Date) => {
    setDate(date);
  };

  const { data: dashboardTimeLog, isLoading } = useQuery<IDashboardTimelog>({
    queryFn: () => getDashboardStaffTimelog(moment(date).format("YYYY-MM-DD")),
    queryKey: ["dashboardTimeLog", date],
  });

  const timeLogData = [
    {
      id: "added",
      value: dashboardTimeLog?.data?.total_staffs_with_timelog,
      title: "Time-log Added",
      icon: <Timer size={24} stroke={"#71717A"} />,
    },
    {
      id: "missed",
      value: dashboardTimeLog?.data?.total_staffs_without_timelog,
      title: "Missed to add Time-log",
      icon: <TimerOff size={24} stroke={"#71717A"} />,
    },
    {
      id: "staffs",
      value: dashboardTimeLog?.data?.total_staffs,
      title: "Total Staffs",
      icon: <Users2 size={24} stroke={"#71717A"} />,
    },
  ];
  return { date, changeDate, timeLogData, isLoading };
};

export default useDashboardTimeLog;
