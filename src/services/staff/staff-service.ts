import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getStaffDetails = (username: any) => {
  return httpRequest(`/get-single-staff?staff_id=${username}`, httpMethods.GET);
};

const getStaffTimeLogs = (username: any, date_from?: any, date_to?: any) => {
  if (date_to) {
    return httpRequest(
      `/get-staff-time-logs?staff_id=${username}&date_from=${date_from}&date_to=${date_to}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/get-staff-time-logs?staff_id=${username}`,
      httpMethods.GET
    );
  }
};

const getStaffProjects = (
  username: any,
  date_from?: any,
  date_to?: any,
  keyword?: string,
  status?: string
) => {
  if (keyword || status) {
    return httpRequest(
      `/get-staff-projects?staff_id=${username}&date_from=${date_from}&date_to=${date_to}&keyword=${keyword}&status=${status}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/get-staff-projects?staff_id=${username}&date_from=${date_from}&date_to=${date_to}`,
      httpMethods.GET
    );
  }
};

export { getStaffDetails, getStaffTimeLogs, getStaffProjects };
