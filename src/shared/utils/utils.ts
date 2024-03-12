import { ClassValue, clsx, type } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { showToast, TOAST_TYPES } from './toast-utils/toast.utils';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Session expired Toast
export const sessionToast = () => {
  const sessionMessage = localStorage.getItem("sessionmessage");
  if (sessionMessage) {
    const sessionMessageObject = JSON.parse(sessionMessage);
    if (sessionMessageObject.type && sessionMessageObject.message) {
      localStorage.removeItem("sessionmessage");
      if (sessionMessageObject.type === "success") {
        showToast(TOAST_TYPES.success, sessionMessageObject.message);
      } else {
        showToast(TOAST_TYPES.error, sessionMessageObject.message);
      }
    }
  }
};

export const clearCookie = (key: string) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Setting new cookie
// export const setCookie = (key: string, val: string, expiration: number) => {
//   const expirationDate = new Date();
//   expirationDate.setTime(expirationDate.getTime() + expiration * 1000);
//   document.cookie = `${key}=${val}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax;`;
// };

// Getting cookie
// export const getCookie = (key: string) => {
//   const cookies = document.cookie.split("; ");
//   for (const cookie of cookies) {
//     const [name, value] = cookie.split("=");
//     if (name === key) {
//       return decodeURIComponent(value);
//     }
//   }
//   return null;
// };
