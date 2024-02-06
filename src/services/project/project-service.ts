import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getProjectList = (
  page?: number,
  per_page?: number,
  keyword?: string,
  status?: string,
  source?: string,
  market?: string,
  type?: string,
  lead?: string,
  date_type?: string,
  date?: string,
  client?: string
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
      `/projects?pg=${page}&dataperpage=${per_page}&keyword=${keyword}&status=${status}&source=${source}&market=${market}&type=${type}&lead=${lead}&date_type=${date_type}&date=${date}&client=${client}`,
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
