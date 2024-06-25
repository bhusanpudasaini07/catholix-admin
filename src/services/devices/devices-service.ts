import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getDevicesData = async (
  page: number,
  pageSize: number,
  searchTerm?: string,
  columns?: string
) => {
  const queryParams = [];

  if (searchTerm) queryParams.push(`searchTerm=${searchTerm}`);
  if (columns) queryParams.push(`columns=${columns}`);

  const queryString = queryParams.join("&");

  const finalUrl = `/devices?page=${page}&pageSize=${pageSize}${
    queryString ? `&${queryString}` : ""
  }`;

  return httpRequest(finalUrl, httpMethods.GET);
};

export { getDevicesData };
