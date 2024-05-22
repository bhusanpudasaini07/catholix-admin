import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getTeamMembersList = (
  perPage: number,
  pageNum: number,
  keyword?: string,
  date_from?: string,
  date_to?: string,
  department_id?: string,
  staffs_id?: string
) => {
  // Initialize an empty array to store query parameters
  const queryParams = [];

  // Check each argument and add it to the queryParams array if it's truthy
  if (keyword) queryParams.push(`keyword=${keyword}`);
  if (date_from) queryParams.push(`date_from=${date_from}`);
  if (date_to) queryParams.push(`date_to=${date_to}`);
  if (department_id) queryParams.push(`department_id=${department_id}`);
  if (staffs_id) queryParams.push(`staff_ids=${staffs_id}`);

  // Construct the final query string by joining the queryParams array with '&'
  const queryString = queryParams.join("&");

  // Construct the final URL by appending the query string to the base endpoint
  const finalUrl = `/all-staffs-project-usage-report?per_page=${perPage}&pageNum=${pageNum}${
    queryString ? `&${queryString}` : ""
  }`;
  return httpRequest(finalUrl, httpMethods.GET);
};

export { getTeamMembersList };
