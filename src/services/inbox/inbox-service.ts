import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getInboxList = (name?: string, page?: number, limit?: number) => {
  if (name) {
    return httpRequest(
      `/user-invoices?name=${name}&page=${page}&limit=${limit}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/user-invoices?page=${page}&limit=${limit}`,
      httpMethods.GET
    );
  }
};

/**
 * Update invoice status api request
 */
const updateInvoiceStatus = (id: string, payload: any) => {
  return httpRequest(`/user-invoices/${id}`, httpMethods.POST, payload);
};

export { getInboxList, updateInvoiceStatus };
