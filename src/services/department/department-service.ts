import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getDepartmentList = (name?: string, page?: number, limit?: number) => {
  if (name) {
    return httpRequest(
      `/departments?name=${name}&page=${page}&limit=${limit}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/departments?page=${page}&limit=${limit}`,
      httpMethods.GET
    );
  }
};

const getParentDepartment = (id?: any) => {
  if (id) {
    return httpRequest(
      `/parent-departments?department_id=${id}`,
      httpMethods.GET
    );
  } else {
    return httpRequest("/parent-departments", httpMethods.GET);
  }
};

const getSubDepartmentList = (id: any) => {
  return httpRequest(`/departments/${id}/sub`, httpMethods.GET);
};

//add department api request
const addDepartment = (payload: any) => {
  return httpRequest("/departments", httpMethods.POST, payload);
};

// get departmentDetail api request
const getDepartmentDetail = (id: any) => {
  return httpRequest(`/departments/${id}`, httpMethods.GET);
};

// update department api request
const updateDepartment = (data: any, id: any) => {
  return httpRequest(`/departments/${id}`, httpMethods.PUT, data);
};

// delete department api request
const deleteDepartment = (id: any) => {
  return httpRequest(`/departments/${id}`, httpMethods.DELETE);
};
export {
  getDepartmentList,
  getParentDepartment,
  getSubDepartmentList,
  getDepartmentDetail,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
