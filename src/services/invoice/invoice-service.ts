import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import axios from "axios";

const getInvoiceList = (
  name?: string,
  page?: number,
  limit?: number,
  vendor_id?: string,
  project_id?: string,
  status?: string,
  start_date?: string,
  end_date?: string,
  payment_status?: string
) => {
  if (
    name ||
    vendor_id ||
    project_id ||
    status ||
    start_date ||
    end_date ||
    payment_status
  ) {
    return httpRequest(
      `/invoices?name=${name}&page=${page}&limit=${limit}&vendor_id=${vendor_id}&project_id=${project_id}&status=${status}&start_date=${start_date}&end_date=${end_date}&payment_status=${payment_status}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/invoices?page=${page}&limit=${limit}`,
      httpMethods.GET
    );
  }
};

//get invoice detail api request
const getInvoiceDetail = (id: any) => {
  return httpRequest(`/invoices/${id}`, httpMethods.GET);
};

// delete invoice api request
const deleteInvoice = (id: string) => {
  return httpRequest(`/invoices/${id}`, httpMethods?.DELETE);
};

//extract invoice api request
const extractInvoice = async (image: any) => {
  const extractUrl = process.env.NEXT_PUBLIC_EXTRACTION_API_URL;
  const extractVersion = process.env.NEXT_PUBLIC_EXTRACTION_VERSION;
  try {
    const response = await axios.post(
      `${extractUrl}/${extractVersion}/process_pdf/?model=gpt`,
      image,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  } catch (err) {
    throw err;
  }
};

// Add invoice api request
const addInvoice = (invoiceData: any) => {
  return httpRequest("/invoices", httpMethods.POST, invoiceData, {
    "Content-Type": "multipart/form-data",
  });
};

// Update invoice api request
const updateInvoice = (id: any, payload: any) => {
  return httpRequest(`/invoices/${id}`, httpMethods.PUT, payload, {
    "Content-Type": "application/x-www-form-urlencoded",
  });
};

// Send invoice approval api request
const sendApproval = (id: any) => {
  return httpRequest(`/invoices/${id}/approvals`, httpMethods.POST);
};

// Update Payment status api request
const updatePaymentStatus = (data: any) => {
  return httpRequest(
    "/invoices/update-payment-status",
    httpMethods?.POST,
    data
  );
};

export {
  getInvoiceList,
  getInvoiceDetail,
  deleteInvoice,
  extractInvoice,
  addInvoice,
  updateInvoice,
  sendApproval,
  updatePaymentStatus,
};
