import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import { ICategoryPost } from "@/interface/category-interface";


const getAllCategory = async (search: string, page: number, perPage: number) => {
  const response = await httpRequest(`/categories?search=${search}&page=${page}&limit=${perPage}`, httpMethods.GET);
  return response.data;
};


const deleteCategory = (id: string) => {
  return httpRequest(`/categories/${id}`, httpMethods.DELETE);
};

const addCategory = (data: ICategoryPost) => {
  return httpRequest("/categories", httpMethods.POST, data, {
    "Content-Type": "multipart/form-data",
  });
};

const getCategoryDetail = (id: any) => {
  return httpRequest(`/categories/${id}`, httpMethods.GET);
};

const editCategory = (id: any, data: ICategoryPost) => {
  return httpRequest(`/categories/${id}`, httpMethods.PATCH, data, {
    "Content-Type": "multipart/form-data",
  });
};

export {
  getAllCategory,
  deleteCategory,
  addCategory,
  getCategoryDetail,
  editCategory,
};
