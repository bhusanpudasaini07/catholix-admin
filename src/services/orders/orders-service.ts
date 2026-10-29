import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";



const getAllOrders = (search: string, page: number, perPage: number) => {
  return httpRequest(`/orders?search=${search}&page=${page}&limit=${perPage}`, httpMethods.GET);
};


const deleteOrder = (id: string) => {
  return httpRequest(`/orders/${id}`, httpMethods.DELETE);
};



const getOrderDetail = (id: any) => {
  return httpRequest(`/orders/${id}`, httpMethods.GET);
};

const updateOrderStatus = (id: string, status: string) => {
  return httpRequest(`/orders/${id}/status`, httpMethods.PATCH, { status });
};


export {
  getAllOrders,
  deleteOrder,
  getOrderDetail,
  updateOrderStatus,
};
