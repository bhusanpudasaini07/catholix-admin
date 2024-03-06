import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getStaffDetails = (username: any) => {
  return httpRequest(`/get-single-staff?staff_id=${username}`, httpMethods.GET);
};

const getStaffTimeLogs = (username: any) => {
  return httpRequest(
    `/get-staff-time-logs?staff_id=${username}`,
    httpMethods.GET
  );
};

export { getStaffDetails, getStaffTimeLogs };
