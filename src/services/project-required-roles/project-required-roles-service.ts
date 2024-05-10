import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getRequiredRoles = (keyword?: string) => {
  // Initialize an empty array to store query parameters
  const queryParams = [];

  // Check each argument and add it to the queryParams array if it's truthy
  if (keyword) queryParams.push(`keyword=${keyword}`);

  // Construct the final query string by joining the queryParams array with '&'
  const queryString = queryParams.join("&");

  // Construct the final URL by appending the query string to the base endpoint
  const finalUrl = `/unassigned-role-projects${
    queryString ? `?${queryString}` : ""
  }`;
  return httpRequest(finalUrl, httpMethods.GET);
};

export { getRequiredRoles };
