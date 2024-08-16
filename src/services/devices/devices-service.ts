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
  columns: string,
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
      columns,
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
const exportInactiveDevices = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  timeframe: string,
  columns: string,
  searchTerm?: string
) => {
  return httpRequest("/devices/inactive-devices-export", httpMethods.GET, {
    params: {
      startDate,
      endDate,
      region,
      state,
      lga,
      timeframe,
      columns,
      ...(searchTerm && { searchTerm }),
    },
  });
};

// ________________ NO HEARTBEAT________________

const getNoHeartbeatDevicesStats = async () => {
  return httpRequest("/devices/noheartbeat-devices-days", httpMethods.GET);
};
const fetchNoHeartbeatDevicesMap = async (
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
    `${API_BASE_URL}/devices/noheartbeat-devices-map?startDate=${startDate}&endDate=${endDate}&region=${
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
const getNoHeartbeatDevices = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  timeframe: string,
  page: number,
  pageSize: number,
  columns: string,
  searchTerm?: string
) => {
  return httpRequest(`/devices/noheartbeat-devices`, httpMethods.GET, {
    params: {
      startDate,
      endDate,
      region,
      state,
      lga,
      timeframe,
      page,
      pageSize,
      columns,
      ...(searchTerm && { searchTerm }),
    },
  });
};
const exportNoHeartbeatDevices = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  timeframe: string,
  columns: string,
  searchTerm?: string
) => {
  return httpRequest("/devices/noheartbeat-devices-export", httpMethods.GET, {
    params: {
      startDate,
      endDate,
      region,
      state,
      lga,
      timeframe,
      columns,
      ...(searchTerm && { searchTerm }),
    },
  });
};

// ________________DEVICE DETAIL __________________
const getDeviceDetail = async (deviceId: string) => {
  return httpRequest(`/devices/${deviceId}`, httpMethods.GET);
};
const getDeviceDetailTable = async (
  deviceId: string,
  page: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  searchTerm?: string
) => {
  return httpRequest(`/devices/registered/${deviceId}`, httpMethods.GET, {
    params: {
      page,
      pageSize,
      startDate,
      endDate,
      ...(searchTerm && { searchTerm }),
    },
  });
};
const getDeviceChartData = async (
  deviceId: string,
  startDate: string,
  endDate: string
) => {
  return httpRequest(`/devices/registered-chart/${deviceId}`, httpMethods.GET, {
    params: {
      startDate,
      endDate,
    },
  });
};

// ________________DEVICE PERFORMANCE __________________
const getDevicePerformance = async (
  page: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string
) => {
  return httpRequest(
    `/devices/device-analytics/devices-performance`,
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
        region,
        state,
        lga,
        page,
        pageSize,
      },
    }
  );
};
const getDevicePerformanceChart = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string
) => {
  return httpRequest(
    `/devices/device-analytics/devices-chart`,
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
        region,
        state,
        lga,
      },
    }
  );
};
const getDevicePerformanceGCChart = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string
) => {
  return httpRequest(
    `/devices/device-analytics/devices-gcchart`,
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
        region,
        state,
        lga,
      },
    }
  );
};
const exportDevicePerformance = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string
) => {
  return httpRequest(
    `/devices/device-analytics/devices-performance-export`,
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
        region,
        state,
        lga,
      },
    }
  );
};

// _______________DEVICE COMPARISON ____________________
const getDeviceComparison = async (
  page: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string
) => {
  return httpRequest(
    `/devices/device-analytics/devices-comparison`,
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
        region,
        state,
        lga,
        page,
        pageSize,
      },
    }
  );
};
const getDeviceComparisonChart = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string
) => {
  return httpRequest(
    `/devices/device-analytics/devices-comparision-chart`,
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
        region,
        state,
        lga,
      },
    }
  );
};
const getDeviceComparisonGCChart = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string
) => {
  return httpRequest(
    `/devices/device-analytics/devices-comparision-gcchart`,
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
        region,
        state,
        lga,
      },
    }
  );
};
const exportDevicesComparison = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string
) => {
  return httpRequest(
    `/devices/device-analytics/devices-comparison-export`,
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
        region,
        state,
        lga,
      },
    }
  );
};

// ________________PERFORMANCE BY LGA ____________________
const getPerformanceByLGA = async (
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
    `/devices/device-analytics/devices-performance-lga`,
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
const exportPerformanceByLGA = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest(
    `/devices/device-analytics/devices-performance-lga-export`,
    httpMethods.GET,
    {
      params: {
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
const fetchPerformanceByLGA = async (
  API_BASE_URL: string | undefined,
  regionId: string,
  stateId: string,
  lga: string[],
  southWest: string,
  northEast: string,
  startDate: string,
  endDate: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/devices/device-analytics/devices-performance-lga-map?startDate=${startDate}&endDate=${endDate}&region=${
      regionId || "all"
    }&state=${stateId || "all"}&lga=${
      lga.length > 0 ? lga.join(",") : "all"
    }&southwest=${southWest}&northeast=${northEast}`,
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
export {
  getDevicesData,
  // Inactive
  getInactiveDevices,
  getInactiveDevicesMap,
  fetchInactiveDevicesMap,
  getInactiveDevicesStats,
  exportInactiveDevices,

  // No heartbeat
  getNoHeartbeatDevicesStats,
  fetchNoHeartbeatDevicesMap,
  getNoHeartbeatDevices,
  exportNoHeartbeatDevices,

  // Device Detail
  getDeviceDetail,
  getDeviceDetailTable,
  getDeviceChartData,

  // Device Performance
  getDevicePerformance,
  getDevicePerformanceChart,
  exportDevicePerformance,
  getDevicePerformanceGCChart,

  // Device Comparison
  getDeviceComparison,
  getDeviceComparisonChart,
  exportDevicesComparison,
  getDeviceComparisonGCChart,

  // Performance by LGA
  getPerformanceByLGA,
  exportPerformanceByLGA,
  fetchPerformanceByLGA,
};
