import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getProjectList = (
  page?: number,
  per_page?: number,
  keyword?: string,
  risk_status?: string,
  source?: string,
  market?: string,
  type?: string,
  lead?: string,
  date_type?: string,
  date?: string,
  client?: string,
  status?: string
) => {
  if (
    keyword !== "" ||
    status ||
    source ||
    market ||
    type ||
    lead ||
    date_type ||
    date ||
    client
  ) {
    return httpRequest(
      `/projects?pg=${page}&dataperpage=${per_page}&keyword=${keyword}&risk_status=${risk_status}&source=${source}&market=${market}&type=${type}&lead=${lead}&date_type=${date_type}&date=${date}&client=${client}&status=${status}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/projects?pg=${page}&dataperpage=${per_page}`,
      httpMethods.GET
    );
  }
};

export { getProjectList };
