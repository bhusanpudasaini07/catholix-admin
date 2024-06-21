import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import { IAdminForm } from "@/interface/admin-interface";
import { IResetPasswordFormInput } from "@/interface/auth-interface";

const getAdmins = (
  page: number,
  limit: number,
  keywords?: string,
  roleId?: string
) => {
  const queryParams = [];
  if (keywords) queryParams.push(`keywords=${keywords}`);
  if (roleId) queryParams.push(`roleId=${roleId}`);
  const queryString = queryParams.join("&");
  const finalUrl = `/users?page=${page}&limit=${limit}${
    queryString ? `&${queryString}` : ""
  }`;
  return httpRequest(finalUrl, httpMethods.GET);
};

const changeAdminPassword = (id: string, payload: IResetPasswordFormInput) => {
  return httpRequest(`/users/reset-password/${id}`, httpMethods.PUT, payload);
};

const deleteAdmin = (id: string) => {
  return httpRequest(`/users/${id}`, httpMethods.DELETE);
};

const addAdmin = (data: IAdminForm) => {
  return httpRequest("/users", httpMethods.POST, data);
};

const getAdminDetail = (id: any) => {
  return httpRequest(`/users/${id}`, httpMethods.GET);
};

const editAdmin = (id: any, data: IAdminForm) => {
  return httpRequest(`/users/${id}`, httpMethods.PUT, data);
};

const getRegions = () => {
  return httpRequest("/region-with-states-local-government", httpMethods.GET);
};

export {
  getAdmins,
  changeAdminPassword,
  deleteAdmin,
  addAdmin,
  getAdminDetail,
  editAdmin,

  // Region, state , LGA
  getRegions,
};
