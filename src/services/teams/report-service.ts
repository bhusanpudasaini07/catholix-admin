import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getTeamLeadRPSummary = (date_from: any, date_to: any) => {
  return httpRequest(
    `/get-team-lead-rp-summary?&date_from=${date_from}&date_to=${date_to}`,
    httpMethods.GET
  );
};

export { getTeamLeadRPSummary };
