import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import appConfig from "../../../config";
import {getCookie } from "cookies-next";
import {
  IForgotPassFormInput,
  ILoginFormInput,
  IResetPassFormInput,
} from "@/interface/auth-interface";
const { LOGGED_IN_KEY } = appConfig;

const login = (loginPayload: ILoginFormInput) => {
  return httpRequest("/login", httpMethods.POST, loginPayload, {
    "Content-Type": "application/x-www-form-urlencoded",
  });
};

const forgotPassword = (forgotPassPayload: IForgotPassFormInput) => {
  return httpRequest(
    `/forgot-password?email=${forgotPassPayload.email}`,
    httpMethods.POST
  );
};

const resetPassword = (resetPasswordPayload: IResetPassFormInput | any) => {
  return httpRequest(
    `/reset-password?token=${resetPasswordPayload?.token}&code=${resetPasswordPayload?.code}&new_password=${resetPasswordPayload?.new_password}`,
    httpMethods.POST
  );
};

const logout = () => {
  return httpRequest("/logout", httpMethods.POST);
};

const changePassword = (data: any) => {
  return httpRequest(
    `/change-password?current_password=${data?.current_password}&new_password=${data?.new_password}`,
    httpMethods.PUT
  );
};

const getLocalLoggedInState = () => {
  return getCookie(LOGGED_IN_KEY);
};

export {
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  logout,
  getLocalLoggedInState,
};
