import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getProjectList = (name?: string, page?: number, limit?: number) => {
  if (name) {
    return httpRequest(
      `/projects?name=${name}&page=${page}&limit=${limit}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/projects?page=${page}&limit=${limit}`,
      httpMethods.GET
    );
  }
};

// get all project api request
const getAllProject = (
  name?: string,
  project_id?: string,
  vendor_id?: string
) => {
  if (name || project_id || vendor_id) {
    return httpRequest(
      `/project-lists?name=${name}&project_id=${project_id}&vendor_id=${vendor_id}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(`/project-lists`, httpMethods.GET);
  }
};

// get projectDetails api request
const getProjectDetail = (id: any) => {
  return httpRequest(`/projects/${id}`, httpMethods.GET);
};

// add projects api request
const addProject = (data: any) => {
  return httpRequest("/projects", httpMethods.POST, data);
};

// update projects api request
const updateProject = (data: any, id: any) => {
  return httpRequest(`/projects/${id}`, httpMethods.PUT, data);
};

// delete project api request
const deleteProject = (id: any) => {
  return httpRequest(`/projects/${id}`, httpMethods.DELETE);
};

const syncProject = () => {
  return httpRequest("/sync_project", httpMethods.GET);
};

export {
  getAllProject,
  getProjectList,
  getProjectDetail,
  addProject,
  updateProject,
  deleteProject,
  syncProject,
};
