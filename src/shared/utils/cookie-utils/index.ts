import { cookieKeys } from "@/enums";
import { getCookie, setCookie } from "cookies-next";
import config from "../../../../config";

const { LOGGED_IN_KEY } = config;

export const getAccessToken = () => {
  const token: any = getCookie(cookieKeys.ACCESS_TOKEN);
  return token;
};

export const setAuthCookies = (data: any) => {
  setCookie(cookieKeys.ACCESS_TOKEN, data?.access_token, {
    maxAge: data?.expires_in,
  });
  setCookie(cookieKeys.REFRESH_TOKEN, data?.refresh_token);
  setCookie(LOGGED_IN_KEY, true);
};
