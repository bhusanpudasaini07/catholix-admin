import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import { IProductsPost } from "@/interface/products-interface";


// /api/products/generate-listing
const generateAiListing = async (data: FormData) => {
  return httpRequest("/products/generate-listing", httpMethods.POST, data, {
    "Content-Type": "multipart/form-data",
  });
};

const getAllProducts = (search: string, page: number, perPage: number) => {
  return httpRequest(`/products?search=${search}&page=${page}&limit=${perPage}`, httpMethods.GET);
};


const deleteProducts = (id: string) => {
  return httpRequest(`/products/${id}`, httpMethods.DELETE);
};

const addProducts = (data: IProductsPost) => {
  return httpRequest("/products", httpMethods.POST, data, {
    "Content-Type": "multipart/form-data",
  });
};

const getProductsDetail = (id: any) => {
  return httpRequest(`/products/${id}`, httpMethods.GET);
};

const editProducts = (id: any, data: IProductsPost) => {
  return httpRequest(`/products/${id}`, httpMethods.PATCH, data);
};

export {
  generateAiListing,
  getAllProducts,
  deleteProducts,
  addProducts,
  getProductsDetail,
  editProducts,
};
