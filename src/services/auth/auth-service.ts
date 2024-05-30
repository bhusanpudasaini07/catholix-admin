import httpRequest, { axiosInstance } from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import appConfig from "../../../config";
import { getCookie } from "cookies-next";
import {
  IForgotPasswordFormInput,
  ILoginFormInput,
  IResetPasswordFormInput,
} from "@/interface/auth-interface";
import axios from "axios";
const { LOGGED_IN_KEY } = appConfig;

const login = (loginPayload: ILoginFormInput) => {
  return httpRequest("/login", httpMethods.POST, loginPayload, {
    "Content-Type": "application/x-www-form-urlencoded",
  });
  // try {
  //   const response = await axios.post(
  //     "https://rpapi-dev.ekbana.net/api/v1/app/login",
  //     loginPayload,
  //     {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     }
  //   );
  //   return response;
  // } catch (error: any) {
  //   console.log(error);
  //   throw error;
  // }
};

const logout = () => {
  return httpRequest("/logout", httpMethods.POST);
};

const forgotPassword = (forgotPasswordPayload: IForgotPasswordFormInput) => {
  return httpRequest(
    "/forgot-password",
    httpMethods.POST,
    forgotPasswordPayload
  );
};

const resetPassword = (resetPasswordPayload: IResetPasswordFormInput) => {
  return httpRequest("/reset-password", httpMethods.PUT, resetPasswordPayload);
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
  changePassword,
  forgotPassword,
  resetPassword,
  logout,
  getLocalLoggedInState,
};
