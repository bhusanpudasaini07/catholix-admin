import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getDashboardProjectSummary = (date_from: string, date_to: string) => {
  return httpRequest(
    `/dashboard-project-summary?date_from=${date_from}&date_to=${date_to}`,
    httpMethods.GET
  );
};

const getDashboardStaffTimelog = (date: string) => {
  return httpRequest(
    `/dashboard-staff-timelog-summary?date=${date}`,
    httpMethods.GET
  );
};

const getProfile = () => {
  return httpRequest("/profile", httpMethods.GET);
};

const getConfig = () => {
  return httpRequest("/filter-configs", httpMethods.GET);
};

export {
  getDashboardProjectSummary,
  getDashboardStaffTimelog,
  getProfile,
  getConfig,
};
