import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getRoles = () => {
  return httpRequest("/roles", httpMethods.GET);
};

export { getRoles };
