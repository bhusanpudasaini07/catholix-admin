import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import config from "../../config";
import { httpMethods } from "../enums";
import { logout } from "@/services/auth/auth-service";
import { constants } from "@/constants/index";
import { clearCookie } from "@/shared/utils/utils";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import { useCommonStore } from "@/store/common-store";

const { SESSION_EXPIRED } = constants.messages;
const { API_BASE_URL, LOGGED_IN_KEY, REMEMBER_ME } = config;

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${API_BASE_URL}`,
});

const refreshAuthLogic = (_failedRequest: any) => {
  return axiosInstance
    .post("/refresh")
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
    const responseData = error.response?.data;
    const responseStatus = error.response?.status;
    const errorCode = responseData?.code;
    const rememberMe = getCookie(REMEMBER_ME);
    if (responseStatus === 403 && errorCode === 1006 && rememberMe) {
      shouldRefresh = true;
    } else if (responseStatus === 401 && errorCode === 1005) {
      clearAllSessionAndLocalStates();
    }
    return shouldRefresh;
  },
});

const clearAllSessionAndLocalStates = () => {
  logout()
    .then(() => {
      toast.error(SESSION_EXPIRED, {
        id: "session",
      });
      clearCookie(LOGGED_IN_KEY);
      clearCookie(REMEMBER_ME);

      window.location.href = "/login";
    })
    .catch((_err: any) => {
      toast.error(SESSION_EXPIRED, {
        id: "session",
      });
      clearCookie(LOGGED_IN_KEY);
      clearCookie(REMEMBER_ME);
      window.location.href = "/login";
    });
};

// Function to set the Authorization header dynamically
// const setAuthorizationHeader = () => {
//   const token = getAccessToken();
//   if (token) {
//     axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete axiosInstance.defaults.headers.common["Authorization"];
//   }
// };

const httpRequest = async (
  url: string,
  method: httpMethods,
  data?: Record<string, any>,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  // setAuthorizationHeader();
  try {
    const response = await axiosInstance[method](`${url}`, data, { headers });
    return {
      ...(response?.data?.pagination && {
        pagination: response?.data?.pagination,
      }),
      data: response?.data,
    };
  } catch (error: any) {
    error?.response?.status === 404
      ? (window.location.href = "/not-found")
      : error?.response?.status === 403 && error?.response?.data?.code === 1010
      ? (window.location.href = "/forbidden")
      : null;
    throw error.response?.data;
  }
};

export default httpRequest;
