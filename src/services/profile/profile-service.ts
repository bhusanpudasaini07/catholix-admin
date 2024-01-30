import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getProfile = () => {
  return httpRequest("/profile", httpMethods.GET);
};

const updateProfile = (profilePayload: any) => {
  return httpRequest("/profile", httpMethods.PUT, profilePayload, {
    "Content-Type": "multipart/form-data",
  });
};

const getTeamMembers = (id?: string, type?: string) => {
  if (id) {
    return httpRequest(`/team-members?${type}=${id}`, httpMethods.GET);
  } else {
    return httpRequest("/team-members", httpMethods.GET);
  }
};

export { getProfile, updateProfile, getTeamMembers };
