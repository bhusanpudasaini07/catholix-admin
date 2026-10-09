import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import appConfig from "../../../config";
import { getCookie } from "cookies-next";

const { LOGGED_IN_KEY } = appConfig;

const login = async (loginPayload: any) => {
  const payload ={
    email: loginPayload.email,
    password: loginPayload.password
  }
  const data = await httpRequest("/auth/login", httpMethods.POST, payload)
  if(data.data.role === "Admin"){
    return data
  }
  else{
    throw new Error("You are not allowed to login with this credentials");
  }
 
};

const logout = () => {
  return httpRequest("/auth/sign-out", httpMethods.POST);
};

const forgotPassword = (forgotPasswordPayload: any) => {
  return httpRequest(
    "/auth/forgot-password",
    httpMethods.PUT,
    forgotPasswordPayload
  );
};

const resetPassword = (resetPasswordPayload: any) => {
  return httpRequest(
    "/auth/reset-password",
    httpMethods.PUT,
    resetPasswordPayload
  );
};

const changePassword = (payload: any) => {
  return httpRequest(`/auth/change-password`, httpMethods.PUT, payload);
};

const getLocalLoggedInState = () => {
  return getCookie(LOGGED_IN_KEY);
};

export {
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  logout,
  getLocalLoggedInState,
};
