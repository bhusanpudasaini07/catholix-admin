import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import { IBundlePayload } from "@/interface/bundle-interface";


const getAllBundles = async () => {
  const response = await httpRequest("/bundles", httpMethods.GET);
  return response?.data;
};

const addBundle = (data: IBundlePayload) => {
  return httpRequest("/bundles", httpMethods.POST, data);
};

const getBundleDetail = (id: string) => {
  return httpRequest(`/bundles/${id}`, httpMethods.GET);
};

const editBundle = (id: string, data: IBundlePayload) => {
  return httpRequest(`/bundles/${id}`, httpMethods.PATCH, data);
};

const uploadImage = async (data: FormData) => {
  const response = await httpRequest("/upload", httpMethods.POST, data);
  return response?.data;
};

export { getAllBundles, addBundle, getBundleDetail, editBundle, uploadImage };
