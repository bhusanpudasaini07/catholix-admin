import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getProjectList = (page?: number, per_page?: number, keyword?: string) => {
  if (keyword !== "") {
    return httpRequest(
      `/projects?pg=${page}&dataperpage=${per_page}&keyword=${keyword}`,
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
