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
