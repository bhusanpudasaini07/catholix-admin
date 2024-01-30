import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import config from "../../config";
import { httpMethods } from "../enums";
import { logout } from "@/services/auth/auth-service";
import { constants } from "@/constants/index";
import { clearCookie } from "@/shared/utils/utils";

const { SESSION_EXPIRED } = constants.messages;
const { API_BASE_URL, LOGGED_IN_KEY } = config;

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${API_BASE_URL}`,
});

const refreshAuthLogic = (_failedRequest: any) => {
  return axiosInstance
    .get("/refresh-token")
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      clearAllSessionAndLocalStates();
      return Promise.reject(err);
    });
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
  shouldRefresh: (error: any) => {
    let shouldRefresh = false;
    const responseData = error.response?.data?.detail?.error;
    const responseStatus = error.response?.status;
    const errorCode = responseData[0]?.errorCode;
    if (responseStatus === 401 && errorCode === 1006) {
      shouldRefresh = true;
    } else if (responseStatus === 401 && errorCode === 1017) {
      clearAllSessionAndLocalStates();
    }
    return shouldRefresh;
  },
});

const clearAllSessionAndLocalStates = () => {
  logout()
    .then(() => {
      localStorage.setItem(
        "sessionmessage",
        JSON.stringify({
          type: "error",
          message: SESSION_EXPIRED,
        })
      );
      clearCookie(LOGGED_IN_KEY);
      clearCookie("_accessToken");
      clearCookie("_refreshToken");
      clearCookie("isLoggedIn");
      window.location.href = "/login";
    })
    .catch((_err: any) => {
      clearCookie(LOGGED_IN_KEY);
      window.location.href = "/login";
    });
};

const httpRequest = async (
  url: string,
  method: httpMethods,
  data?: Record<string, any>,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  try {
    const response = await axiosInstance[method](`${url}`, data, { headers });
    return {
      ...(response?.data?.meta?.pagination && {
        pagination: response?.data?.meta?.pagination,
      }),
      data: response?.data?.data,
    };
  } catch (error: any) {
    throw error.response?.data?.detail?.error;
  }
};

export default httpRequest;
