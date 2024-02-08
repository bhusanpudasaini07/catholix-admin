import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getDashboardData = (
  start_date?: string | undefined,
  end_date?: string | undefined
) => {
  if (start_date || end_date) {
    return httpRequest(
      `/dashboard/summary?start_date=${start_date}&end_date=${end_date}`,
      httpMethods.GET
    );
  } else {
    return httpRequest("/dashboard/summary", httpMethods.GET);
  }
};

const getProfile = () => {
  return httpRequest("/profile", httpMethods.GET);
};

const getConfig = () => {
  return httpRequest("/filter-configs", httpMethods.GET);
};

export { getDashboardData, getProfile, getConfig };
