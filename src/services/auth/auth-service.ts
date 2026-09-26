import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import appConfig from "../../../config";
import { getCookie } from "cookies-next";
import {
  IForgotPasswordFormInput,
  ILoginFormInput,
  IResetPasswordFormInput,
} from "@/interface/auth-interface";
const { LOGGED_IN_KEY } = appConfig;

const login = (loginPayload: ILoginFormInput) => {
  const payload ={
    email: loginPayload.email,
    password: loginPayload.password
  }
  return httpRequest("/auth/login", httpMethods.POST, payload);
};

const logout = () => {
  return httpRequest("/auth/sign-out", httpMethods.POST);
};

const forgotPassword = (forgotPasswordPayload: IForgotPasswordFormInput) => {
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
