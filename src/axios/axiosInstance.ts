import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import config from "../../config";
import { httpMethods } from "../enums";
import { logout } from "@/services/auth/auth-service";
import { constants } from "@/constants/index";
import { clearCookie } from "@/shared/utils/utils";
import { getAccessToken } from "@/shared/utils/cookie-utils";

const { SESSION_EXPIRED } = constants.messages;
const { API_BASE_URL, LOGGED_IN_KEY } = config;

export const axiosInstance = axios.create({
  // withCredentials: true,
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
    const responseData = error.response?.data?.errors;
    const responseStatus = error.response?.status;
    const errorCode = responseData[0]?.code;
    // if (responseStatus === 401 && errorCode === 1006) {
    //   shouldRefresh = true;
    // } else
    // if (responseStatus === 401 && errorCode === 1017) {
    if (responseStatus === 401 && errorCode === 1017) {
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
      clearCookie("access_token");
      clearCookie("refresh_token");
      clearCookie("isLoggedIn");
      window.location.href = "/login";
    })
    .catch((_err: any) => {
      clearCookie(LOGGED_IN_KEY);
      window.location.href = "/login";
    });
};

// Function to set the Authorization header dynamically
const setAuthorizationHeader = () => {
  const token = getAccessToken();
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const httpRequest = async (
  url: string,
  method: httpMethods,
  data?: Record<string, any>,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  setAuthorizationHeader();
  try {
    const response = await axiosInstance[method](`${url}`, data, { headers });
    return {
      ...(response?.data?.pagination && {
        pagination: response?.data?.pagination,
      }),
      data: response?.data?.data,
    };
  } catch (error: any) {
    error?.response?.status === 404
      ? (window.location.href = "/not-found")
      : error?.response?.status === 403
      ? (window.location.href = "/forbidden")
      : null;
    throw error?.response?.data?.errors;
  }
};

export default httpRequest;
