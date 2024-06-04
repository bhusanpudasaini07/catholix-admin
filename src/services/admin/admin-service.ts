import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
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

export { getAdmins, changeAdminPassword, deleteAdmin };
