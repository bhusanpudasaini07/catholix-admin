import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import { IAdminForm } from "@/interface/admin-interface";
import { ICategoryPost } from "@/interface/category-interface";

// const getAllCategory = (
//   page: number,
//   limit: number,
//   keywords?: string,
//   roleId?: string
// ) => {
//   const queryParams = [];
//   if (keywords) queryParams.push(`keywords=${keywords}`);
//   if (roleId) queryParams.push(`roleId=${roleId}`);
//   const queryString = queryParams.join("&");
//   const finalUrl = `/categories?page=${page}&limit=${limit}${
//     queryString ? `&${queryString}` : ""
//   }`;
//   return httpRequest(finalUrl, httpMethods.GET);
// };

const getAllCategory = (id: any) => {
  return httpRequest(`/categories`, httpMethods.GET);
};

// const getAllCategory = () =>
  // page: number,
  // limit: number,
  // keywords?: string,
  // roleId?: string
  // {
    // const queryParams = [];
    // if (keywords) queryParams.push(`keywords=${keywords}`);
    // if (roleId) queryParams.push(`roleId=${roleId}`);
    // const queryString = queryParams.join("&");
    // const finalUrl = `/categories`;
    // return httpRequest(finalUrl, httpMethods.GET);
  // };

const deleteCategory = (id: string) => {
  return httpRequest(`/users/${id}`, httpMethods.DELETE);
};

const addCategory = (data: ICategoryPost) => {
  return httpRequest("/categories", httpMethods.POST, data);
};

const getCategoryDetail = (id: any) => {
  return httpRequest(`/categories/${id}`, httpMethods.GET);
};

const editCategory = (id: any, data: ICategoryPost) => {
  return httpRequest(`/categories/${id}`, httpMethods.PATCH, data);
};

export {
  getAllCategory,
  deleteCategory,
  addCategory,
  getCategoryDetail,
  editCategory,
};
