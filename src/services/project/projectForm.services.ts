import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import { ProjectData } from "@/interface/project.interface";

export const createNewProject = (payload: ProjectData) => {
  return httpRequest(`/project/create/`, httpMethods.POST, payload);
};
