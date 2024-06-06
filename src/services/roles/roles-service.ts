import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getRoles = (page: number, limit: number, keywords?: string) => {
  const queryParams = [];
  if (keywords) queryParams.push(`keywords=${keywords}`);
  const queryString = queryParams.join("&");
  const finalUrl = `/roles?page=${page}&limit=${limit}${
    queryString ? `&${queryString}` : ""
  }`;
  return httpRequest(finalUrl, httpMethods.GET);
};

const getUsersRoles = (id: string) => {
  return httpRequest(`/roles/${id}`, httpMethods.GET);
};

const addRole = (data: any) => {
  return httpRequest("/roles", httpMethods.POST, data);
};

const editRole = (id: string, data: any) => {
  return httpRequest(`/roles/${id}`, httpMethods.PUT, data);
};

const getAssociatedRoleUsers = (id: string) => {
  return httpRequest(`/roles/${id}/users`, httpMethods.GET);
};

const deleteRole = (id: string) => {
  return httpRequest(`/roles/${id}`, httpMethods.DELETE);
};

const getPermissions = () => {
  return httpRequest("/permissions?limit=100", httpMethods.GET);
};

export {
  getRoles,
  deleteRole,
  getUsersRoles,
  editRole,
  getAssociatedRoleUsers,
  addRole,
  getPermissions,
};
