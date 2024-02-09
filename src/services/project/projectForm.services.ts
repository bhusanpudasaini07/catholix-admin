import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

export const createNewProject = (payload: any) => {
  return httpRequest(`/project/create/`, httpMethods.POST, payload);
};
