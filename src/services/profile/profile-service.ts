import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import { IProfile } from "@/interface/profile-interface";

const getProfile = () => {
  return httpRequest("/auth/profile", httpMethods.GET);
};

const updateProfile = (data: any) => {
  return httpRequest("/auth/profile", httpMethods.PUT, data);
};

export { getProfile, updateProfile };
