import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getTeamMembersList = (
  perPage: number,
  pageNum: number,
  keyword?: string,
  date_from?: string,
  date_to?: string
) => {
  if (keyword || date_to) {
    return httpRequest(
      `/all-staffs-project-usage-report?dataperpage=${perPage}&pg=${pageNum}&keyword=${keyword}&date_from=${date_from}&date_to=${date_to}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/all-staffs-project-usage-report?dataperpage=${perPage}&pg=${pageNum}`,
      httpMethods.GET
    );
  }
};

export { getTeamMembersList };
