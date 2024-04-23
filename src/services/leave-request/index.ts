import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getLeaveList = (date?: string) => {
  if (date !== "all") {
    return httpRequest(`/get-staff-leaves?date=${date}`, httpMethods.GET);
  } else {
    return httpRequest("/get-staff-leaves", httpMethods.GET);
  }
};

export { getLeaveList };
