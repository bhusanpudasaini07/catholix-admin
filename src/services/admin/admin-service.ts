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

const getAdminDetail = (id: string) => {
  return httpRequest(`/users/${id}`, httpMethods.GET);
};

const editAdmin = (id: string, data: IAdminForm) => {
  return httpRequest(`/users/${id}`, httpMethods.PUT, data);
};

export {
  getAdmins,
  changeAdminPassword,
  deleteAdmin,
  addAdmin,
  getAdminDetail,
  editAdmin,
};
