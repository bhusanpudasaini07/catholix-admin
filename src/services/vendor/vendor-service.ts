import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getVendorList = (name?: string, page?: number, limit?: number) => {
  if (name) {
    return httpRequest(
      `/vendors?name=${name}&page=${page}&limit=${limit}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(`/vendors?page=${page}&limit=${limit}`, httpMethods.GET);
  }
};

//get vendor detail api
const getVendorDetails = (id: any) => {
  return httpRequest(`/vendors/${id}`, httpMethods.GET);
};

// add vendor api request
const addVendor = (data: any) => {
  return httpRequest("/vendors", httpMethods.POST, data, {
    "Content-Type": "multipart/form-data",
  });
};

// edit vendor api request
const updateVendor = (data: any, id: any) => {
  return httpRequest(`/vendors/${id}`, httpMethods.PUT, data, {
    "Content-Type": "multipart/form-data",
  });
};

// delete vendor api request
const deleteVendor = (id: any) => {
  return httpRequest(`/vendors/${id}`, httpMethods.DELETE);
};

// get all vendors
const getAllVendors = (name?: string, id?: string) => {
  if (name) {
    return httpRequest(`/vendor-lists?name=${name}`, httpMethods.GET);
  } else if (id) {
    return httpRequest(`/vendor-lists?vendor_id=${id}`, httpMethods.GET);
  } else {
    return httpRequest("/vendor-lists", httpMethods.GET);
  }
};

//Check if vendor exists
const checkVendor = (email: string) => {
  return httpRequest(`/vendor-exists/${email}`, httpMethods.GET);
};

const syncVendor = () => {
  return httpRequest("/sync_vendor", httpMethods.GET);
};

export {
  getVendorList,
  getAllVendors,
  getVendorDetails,
  addVendor,
  updateVendor,
  deleteVendor,
  checkVendor,
  syncVendor,
};
