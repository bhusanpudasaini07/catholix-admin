import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";
import appConfig from "../../../config";
import { getCookie } from "cookies-next";
import { ILoginFormInput } from "@/interface/auth-interface";
const { LOGGED_IN_KEY } = appConfig;

const login = (loginPayload: ILoginFormInput) => {
  return httpRequest("/login", httpMethods.POST, loginPayload, {
    "Content-Type": "application/x-www-form-urlencoded",
  });
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

export { login, changePassword, logout, getLocalLoggedInState };
