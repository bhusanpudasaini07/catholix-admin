import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getStaffDetails = (username: string) => {
  return httpRequest(`/get-single-staff?staff_id=${username}`, httpMethods.GET);
};

export { getStaffDetails };
