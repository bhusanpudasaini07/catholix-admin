import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getOrganizations = () => {
  return httpRequest("/organizations", httpMethods.GET);
};

const updateOrganization = (data: any) => {
  return httpRequest("/organizations", httpMethods.PUT, data, {
    "Content-Type": "multipart/form-data",
  });
};

export { getOrganizations, updateOrganization };
