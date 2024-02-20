import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

export const getTeamLeadIds = (id: string) => {
  return httpRequest(`/all-team-leads?id=${id}&status=active`, httpMethods.GET);
};

export const getTeamLeadReport = (id: string) => {
  return httpRequest(
    `/get-single-staff?staff_id=${id}&status=active`,
    httpMethods.GET
  );
};

export const getTeamLeadStaff = (id: string) => {
  return httpRequest(`/all-team-leads?id=${id}&status=active`, httpMethods.GET);
};

export const getStaffRpSummary = (
  start_date: string,
  end_date: string,
  id: any
) => {
  console.log("id", id);
  return httpRequest(
    `/get-staff-rp-summary?date_from=${start_date}&date_to=${end_date}`,
    httpMethods.GET,
    id
  );
};

export const getLeadsList = () => {
  return httpRequest(`/all-team-leads?status=active`, httpMethods.GET);
};
