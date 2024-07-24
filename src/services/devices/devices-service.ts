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

// inactive table data and map
const getInactiveDevices = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  timeframe: string,
  page: number,
  pageSize: number,
  searchTerm?: string
) => {
  return httpRequest(`/devices/inactive-devices`, httpMethods.GET, {
    params: {
      startDate,
      endDate,
      region,
      state,
      lga,
      timeframe,
      page,
      pageSize,
      ...(searchTerm && { searchTerm }),
    },
  });
};
const fetchInactiveDevicesMap = async (
  API_BASE_URL: string | undefined,
  regionId: string,
  stateId: string,
  lga: string[],
  timeframe: string,
  southWest: string,
  northEast: string,
  startDate: string,
  endDate: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/devices/inactive-devices-map?startDate=${startDate}&endDate=${endDate}&region=${
      regionId || "all"
    }&state=${stateId || "all"}&lga=${
      lga.length > 0 ? lga.join(",") : "all"
    }&southwest=${southWest}&northeast=${northEast}&timeframe=${timeframe}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.body;
};
const getInactiveDevicesMap = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  timeframe: string,
  southwest: string,
  northeast: string
) => {
  return httpRequest("/devices/inactive-devices-map", httpMethods.GET, {
    params: {
      startDate,
      endDate,
      region,
      state,
      lga,
      timeframe,
      southwest,
      northeast,
    },
  });
};
const getInactiveDevicesStats = async () => {
  return httpRequest("/devices/inactive-devices-days", httpMethods.GET);
};

const getNoHeartbeatDevices = async () => {
  return httpRequest("/devices/no-heartbeat-devices", httpMethods.GET);
};

export {
  getDevicesData,
  getInactiveDevices,
  getInactiveDevicesMap,
  fetchInactiveDevicesMap,
  getInactiveDevicesStats,
  getNoHeartbeatDevices,
};
