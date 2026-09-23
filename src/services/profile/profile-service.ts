import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import { IProfile } from "@/interface/profile-interface";

const getProfile = () => {
  return httpRequest("/users/me", httpMethods.GET);
};

const updateProfile = (data: any) => {
  return httpRequest("/users/me", httpMethods.PUT, data);
};

const updateProfilePicture = (file: any) => {
  return httpRequest("/auth/update-picture", httpMethods.PATCH, file, {
    "Content-Type": "multipart/form-data",
  });
};

export { getProfile, updateProfile, updateProfilePicture };
