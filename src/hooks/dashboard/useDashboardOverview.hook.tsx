import { IDashboardProjectSummary } from "@/interface/dashboard-interface";
import { getDashboardProjectSummary } from "@/services/dashboard/dashboard-service";
import { FolderOpen, UserCircle2, Warehouse } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

const useDashboardOverview = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: moment().subtract(1, "months").toDate(),
    to: new Date(),
  });
  const [dateRangeOpen, setDateRangeOpen] = useState<boolean>(false);
  const changeDateRange = (date: DateRange) => {
    setDateRange(date);
  };

  const { data: dashboardProject, isLoading } =
    useQuery<IDashboardProjectSummary>({
      queryFn: () =>
        getDashboardProjectSummary(
          moment(dateRange?.from).format("YYYY-MM-DD"),
          moment(dateRange?.to).format("YYYY-MM-DD")
        ),
      queryKey: ["dashboardProject", dateRange?.to],
    });

  const projectOverviewData = [
    {
      id: "total",
      title: "Total Projects",
      icon: <FolderOpen size={40} stroke={"#3F3F46"} strokeWidth={1} />,
      value: dashboardProject?.data?.total_projects,
      backgroundColor: "bg-zinc-100",
      valueColor: "text-zinc-700",
      titleColor: "text-zinc-900 ",
    },
    {
      id: "client ",
      title: "Client Projects",
      icon: <UserCircle2 size={40} stroke={"#075BB2"} strokeWidth={1} />,
      value: dashboardProject?.data?.total_client_projects,
      backgroundColor: "bg-blue-50",
      valueColor: "text-blue-500",
      titleColor: "text-blue-700 ",
    },
    {
      id: "inHouse",
      title: "In-House Projects",
      icon: <Warehouse size={40} stroke={"#15803D"} strokeWidth={1} />,
      value: dashboardProject?.data?.total_inhouse_projects,
      backgroundColor: "bg-green-50",
      valueColor: "text-green-700",
      titleColor: "text-green-700 ",
    },
  ];

  const clientProjectData = [
    // Not Started
    {
      id: "not-started",
      value: dashboardProject?.data?.client?.not_started,
      title: "Not Started",
      valueColor: "text-zinc-500",
      titleColor: "text-zinc-700",
      backgroundColor: "bg-zinc-100",
    },
    // In progress
    {
      id: "in-progress",
      value: dashboardProject?.data?.client?.in_progress,
      title: "In Progress",
      valueColor: "text-blue-500",
      titleColor: "text-blue-700",
      backgroundColor: "bg-blue-50",
    },
    // Closed
    {
      id: "closed",
      value: dashboardProject?.data?.client?.closed,
      title: "Closed",
      valueColor: "text-green-500",
      titleColor: "text-green-700",
      backgroundColor: "bg-green-50",
    },
    // On Hold
    {
      id: "on-hold",
      value: dashboardProject?.data?.client?.on_hold,
      title: "On Hold",
      valueColor: "text-red-500",
      titleColor: "text-red-700",
      backgroundColor: "bg-red-50",
    },
    // Client Support
    {
      id: "client-support",
      value: dashboardProject?.data?.client?.support,
      title: "Client Support",
      valueColor: "text-orange-500",
      titleColor: "text-orange-700",
      backgroundColor: "bg-orange-50",
    },
    // Delivered
    {
      id: "delivered",
      value: dashboardProject?.data?.client?.delivered,
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
      value: dashboardProject?.data?.in_house?.not_started,
      title: "Not Started",
      valueColor: "text-zinc-500",
      titleColor: "text-zinc-700",
      backgroundColor: "bg-zinc-100",
    },
    // In progress
    {
      id: "in-progress",
      value: dashboardProject?.data?.in_house?.in_progress,
      title: "In Progress",
      valueColor: "text-blue-500",
      titleColor: "text-blue-700",
      backgroundColor: "bg-blue-50",
    },
    // Closed
    {
      id: "closed",
      value: dashboardProject?.data?.in_house?.closed,
      title: "Closed",
      valueColor: "text-green-500",
      titleColor: "text-green-700",
      backgroundColor: "bg-green-50",
    },
    // On Hold
    {
      id: "on-hold",
      value: dashboardProject?.data?.in_house?.on_hold,
      title: "On Hold",
      valueColor: "text-red-500",
      titleColor: "text-red-700",
      backgroundColor: "bg-red-50",
    },
    // Client Support
    {
      id: "client-support",
      value: dashboardProject?.data?.in_house?.support,
      title: "Client Support",
      valueColor: "text-orange-500",
      titleColor: "text-orange-700",
      backgroundColor: "bg-orange-50",
    },
    // Delivered
    {
      id: "delivered",
      value: dashboardProject?.data?.in_house?.delivered,
      title: "Delivered",
      valueColor: "text-green-500",
      titleColor: "text-green-700",
      backgroundColor: "bg-green-50",
    },
  ];

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
