import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import { IProductsPost } from "@/interface/products-interface";


const getAllProducts = () => {
  return httpRequest(`/products`, httpMethods.GET);
};


const deleteProducts = (id: string) => {
  return httpRequest(`/products/${id}`, httpMethods.DELETE);
};

const addProducts = (data: IProductsPost) => {
  return httpRequest("/products", httpMethods.POST, data);
};

const getProductsDetail = (id: any) => {
  return httpRequest(`/products/${id}`, httpMethods.GET);
};

const editProducts = (id: any, data: IProductsPost) => {
  return httpRequest(`/products/${id}`, httpMethods.PATCH, data);
};

export {
  getAllProducts,
  deleteProducts,
  addProducts,
  getProductsDetail,
  editProducts,
};
