import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import { IProfile } from "@/interface/profile-interface";

const getProfile = () => {
  return httpRequest("/auth/profile", httpMethods.GET);
};

const updateProfile = (data: any) => {
  return httpRequest("/auth/profile", httpMethods.PUT, data);
};

const updateProfilePicture = (file: any) => {
  return httpRequest("/auth/update-picture", httpMethods.PATCH, file, {
    "Content-Type": "multipart/form-data",
  });
};

export { getProfile, updateProfile, updateProfilePicture };
