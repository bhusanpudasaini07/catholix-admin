import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getImeiMisMatchData = async (
  page: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest(
    "/security/imei-mismatch/paginated-list",
    httpMethods.GET,
    {
      params: {
        page,
        pageSize,
        startDate,
        endDate,
        region,
        state,
        lga,
        ...(searchTerm && { searchTerm }),
      },
    }
  );
};

const getImeiMisMatchMapData = async (
  API_BASE_URL: string | undefined,
  regionId: string,
  stateId: string,
  lga: string[],
  southWest: string,
  northEast: string,
  startDate: string,
  endDate: string,
  zoom_level: number
) => {
  const response = await fetch(
    `${API_BASE_URL}/security/imei-mismatch/map-data?startDate=${startDate}&endDate=${endDate}&region=${regionId}&state=${stateId}&lga=${
      lga.length > 0 ? lga.join(",") : "all"
    }&southwest=${southWest}&northeast=${northEast}&zoom_level=${zoom_level}`,
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

const exportImeiMismatchData = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest(`/security/imei-mismatch/export`, httpMethods.GET, {
    params: {
      startDate,
      endDate,
      region,
      state,
      lga,
      ...(searchTerm && { searchTerm }),
    },
  });
};

const getPasswordMisMatchData = async (
  page: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest("/security/password-mismatch", httpMethods.GET, {
    params: {
      page,
      pageSize,
      startDate,
      endDate,
      region,
      state,
      lga,
      ...(searchTerm && { searchTerm }),
    },
  });
};

const getPasswordMisMatchMapData = async (
  API_BASE_URL: string | undefined,
  regionId: string,
  stateId: string,
  lga: string[],
  southWest: string,
  northEast: string,
  startDate: string,
  endDate: string,
  zoom_level: number
) => {
  const response = await fetch(
    `${API_BASE_URL}/security/password-mismatch/map-data?startDate=${startDate}&endDate=${endDate}&region=${regionId}&state=${stateId}&lga=${
      lga.length > 0 ? lga.join(",") : "all"
    }&southwest=${southWest}&northeast=${northEast}&zoom_level=${zoom_level}`,
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

const exportPasswordMismatchData = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest(`/security/password-mismatch/export`, httpMethods.GET, {
    params: {
      startDate,
      endDate,
      region,
      state,
      lga,
      ...(searchTerm && { searchTerm }),
    },
  });
};

const getInactiveDevicesSFData = async (
  page: number,
  pageSize: number,
  date: string,
  searchTerm?: string
) => {
  return httpRequest(
    "/conversion-rate/inactive-device-ga-report",
    httpMethods.GET,
    {
      params: { page, pageSize, date, ...(searchTerm && { searchTerm }) },
    }
  );
};

const getMultipleLocationsData = async (
  page: number,
  pageSize: number,
  date: string,
  searchTerm?: string
) => {
  return httpRequest(
    "/conversion-rate/device-ga-multiple-locationreport",
    httpMethods.GET,
    {
      params: { page, pageSize, date, ...(searchTerm && { searchTerm }) },
    }
  );
};

export {
  getImeiMisMatchData,
  getImeiMisMatchMapData,
  exportImeiMismatchData,
  getPasswordMisMatchData,
  getPasswordMisMatchMapData,
  exportPasswordMismatchData,
  getInactiveDevicesSFData,
  getMultipleLocationsData,
};
