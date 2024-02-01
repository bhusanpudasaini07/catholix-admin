import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getProjectList = (page?: number, per_page?: number) => {
  if (page || per_page) {
    return httpRequest(
      `/projects?pg=${page}&dataperpage=${per_page}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(`/projects`, httpMethods.GET);
  }
};

export { getProjectList };
