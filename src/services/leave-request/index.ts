import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getLeaveList = (date?: string, status?: String) => {
  if (date !== "all" || status) {
    return httpRequest(
      `/get-staff-leaves?date=${date !== "all" ? date : ""}&status=${status}`,
      httpMethods.GET
    );
  } else {
    return httpRequest("/get-staff-leaves", httpMethods.GET);
  }
};

export { getLeaveList };
