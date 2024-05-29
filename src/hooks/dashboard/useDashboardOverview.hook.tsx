import { FolderOpen, UserCircle2, Warehouse } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const useDashboardOverview = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: moment().subtract(1, "months").toDate(),
    to: new Date(),
  });
  const [dateRangeOpen, setDateRangeOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const changeDateRange = (date: DateRange) => {
    setDateRange(date);
  };

  const projectOverviewData = [
    {
      id: "total",
      title: "Total Projects",
      icon: <FolderOpen size={40} stroke={"#3F3F46"} strokeWidth={1} />,
      value: 50,
      backgroundColor: "bg-zinc-100",
      valueColor: "text-zinc-700",
      titleColor: "text-zinc-900 ",
    },
    {
      id: "client ",
      title: "Client Projects",
      icon: <UserCircle2 size={40} stroke={"#075BB2"} strokeWidth={1} />,
      value: 40,
      backgroundColor: "bg-blue-50",
      valueColor: "text-blue-500",
      titleColor: "text-blue-700 ",
    },
    {
      id: "inHouse",
      title: "In-House Projects",
      icon: <Warehouse size={40} stroke={"#15803D"} strokeWidth={1} />,
      value: 10,
      backgroundColor: "bg-green-50",
      valueColor: "text-green-700",
      titleColor: "text-green-700 ",
    },
  ];

  const clientProjectData = [
    // Not Started
    {
      id: "not-started",
      value: 0,
      title: "Not Started",
      valueColor: "text-zinc-500",
      titleColor: "text-zinc-700",
      backgroundColor: "bg-zinc-100",
    },
    // In progress
    {
      id: "in-progress",
      value: 41,
      title: "In Progress",
      valueColor: "text-blue-500",
      titleColor: "text-blue-700",
      backgroundColor: "bg-blue-50",
    },
    // Closed
    {
      id: "closed",
      value: 5,
      title: "Closed",
      valueColor: "text-green-500",
      titleColor: "text-green-700",
      backgroundColor: "bg-green-50",
    },
    // On Hold
    {
      id: "on-hold",
      value: 0,
      title: "On Hold",
      valueColor: "text-red-500",
      titleColor: "text-red-700",
      backgroundColor: "bg-red-50",
    },
    // Client Support
    {
      id: "client-support",
      value: 4,
      title: "Client Support",
      valueColor: "text-orange-500",
      titleColor: "text-orange-700",
      backgroundColor: "bg-orange-50",
    },
    // Delivered
    {
      id: "delivered",
      value: 0,
      title: "Delivered",
      valueColor: "text-green-500",
      titleColor: "text-green-700",
      backgroundColor: "bg-green-50",
    },
  ];

  const inhouseProjectData = [
    // Not Started
    {
      id: "not-started",
      value: 0,
      title: "Not Started",
      valueColor: "text-zinc-500",
      titleColor: "text-zinc-700",
      backgroundColor: "bg-zinc-100",
    },
    // In progress
    {
      id: "in-progress",
      value: 5,
      title: "In Progress",
      valueColor: "text-blue-500",
      titleColor: "text-blue-700",
      backgroundColor: "bg-blue-50",
    },
    // Closed
    {
      id: "closed",
      value: 1,
      title: "Closed",
      valueColor: "text-green-500",
      titleColor: "text-green-700",
      backgroundColor: "bg-green-50",
    },
    // On Hold
    {
      id: "on-hold",
      value: 1,
      title: "On Hold",
      valueColor: "text-red-500",
      titleColor: "text-red-700",
      backgroundColor: "bg-red-50",
    },
    // Client Support
    {
      id: "client-support",
      value: 1,
      title: "Client Support",
      valueColor: "text-orange-500",
      titleColor: "text-orange-700",
      backgroundColor: "bg-orange-50",
    },
    // Delivered
    {
      id: "delivered",
      value: 1,
      title: "Delivered",
      valueColor: "text-green-500",
      titleColor: "text-green-700",
      backgroundColor: "bg-green-50",
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
  return {
    // States
    dateRange,
    setDateRange,
    dateRangeOpen,
    setDateRangeOpen,
    // Arrays
    projectOverviewData,
    clientProjectData,
    inhouseProjectData,

    // FUNCTIONS
    changeDateRange,
    isLoading,
  };
};

export default useDashboardOverview;
