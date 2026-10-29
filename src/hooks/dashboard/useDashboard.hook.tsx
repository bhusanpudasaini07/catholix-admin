import { getAllDashboard } from "@/services/orders/orders-service";
import { useQuery } from "react-query";

export const useDashboard = () => {
  
  
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryFn: () => getAllDashboard(),
    queryKey: ["dashboard"],
  });





  return {
    dashboardData,
    dashboardLoading,
  };
};
