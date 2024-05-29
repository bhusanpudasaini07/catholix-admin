import { Timer, TimerOff, Users2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

const useDashboardTimeLog = () => {
  const [date, setDate] = useState<Date | undefined>(
    moment().subtract(1, "days").toDate()
  );
  const [isLoading, setIsLoading] = useState(true);

  const changeDate = (date: Date) => {
    setDate(date);
  };

  const timeLogData = [
    {
      id: "added",
      value: 70,
      title: "Time-log Added",
      icon: <Timer size={40} stroke={"#71717A"} strokeWidth={1} />,
    },
    {
      id: "missed",
      value: 50,
      title: "Missed to add Time-log",
      icon: <TimerOff size={40} stroke={"#71717A"} strokeWidth={1} />,
    },
    {
      id: "staffs",
      value: 120,
      title: "Total Members",
      icon: <Users2 size={40} stroke={"#71717A"} strokeWidth={1} />,
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return { date, changeDate, timeLogData, isLoading };
};

export default useDashboardTimeLog;
