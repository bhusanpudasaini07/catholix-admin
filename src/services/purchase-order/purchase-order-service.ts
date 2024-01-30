import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getPurchaseOrderList = (
  name?: string,
  page?: number,
  limit?: number,
  start_date?: string,
  end_date?: string
) => {
  if (name || start_date || end_date) {
    return httpRequest(
      `/purchase-orders?vendor_name=${name}&start_date=${start_date}&end_date=${end_date}&page=${page}&limit=${limit}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/purchase-orders?page=${page}&limit=${limit}`,
      httpMethods.GET
    );
  }
};

// purchase detail api request
const getPurchaseOrderDetail = (id: any) => {
  return httpRequest(`/purchase-orders/${id}`, httpMethods.GET);
};

// add purchase api request
const addPurchaseOrder = (data: any) => {
  return httpRequest("/purchase-orders", httpMethods.POST, data);
};

// update purchase api request
const updatePurchaseOrder = (id: any, data: any) => {
  return httpRequest(`/purchase-orders/${id}`, httpMethods.PUT, data);
};

// purchase delete api request
const deletePurchaseOrder = (id: string) => {
  return httpRequest(`/purchase-orders/${id}`, httpMethods.DELETE);
};

const syncPurchaseOrder = () => {
  return httpRequest("/sync_purchase_order", httpMethods.GET);
};

export {
  getPurchaseOrderList,
  getPurchaseOrderDetail,
  addPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  syncPurchaseOrder,
};
