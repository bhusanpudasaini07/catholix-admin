import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

export const getStaffRpSummary = (
  start_date: string,
  end_date: string,
  id: any
) => {
  return httpRequest(
    `/get-staff-rp-summary?date_from=${start_date}&date_to=${end_date}&staffs=${id}`,
    httpMethods.GET
  );
};

export const getStaffDailyTimelog = (
  start_date: string,
  end_date: string,
  id: any
) => {
  return httpRequest(
    `/staff-daily-time-logs?staff_id=${id}&start_date=${start_date}&end_date=${end_date}`,
    httpMethods.GET
  );
};

export const getLeadsList = (id?: any) => {
  if (id) {
    return httpRequest(
      `/all-team-leads?id=${id}&status=active`,
      httpMethods.GET
    );
  } else {
    return httpRequest(`/all-team-leads?status=active`, httpMethods.GET);
  }
};

export const getAllStaffId = () => {
  return httpRequest(`/all-staffs?status=active`, httpMethods.GET);
};
