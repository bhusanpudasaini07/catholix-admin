import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getAllUsers = async () => {
  const response = await httpRequest("/users", httpMethods.GET);
  return response?.data;
};

export { getAllUsers };
