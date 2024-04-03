import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getProjectSummary = (date_from: string, date_to: string) => {
  return httpRequest(
    `/project-summary?date_from=${date_from}&date_to=${date_to}`,
    httpMethods.GET
  );
};

export { getProjectSummary };
