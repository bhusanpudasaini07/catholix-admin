import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getDeviceStats = () => {
  return httpRequest("/dashboard/device-stats", httpMethods.GET);
};

const getDeviceMapData = (region: string, state: string, lga: string) => {
  return httpRequest("/dashboard/device-map-data", httpMethods.GET, {
    params: {
      region,
      state,
      lga,
    },
  });
};

const getDealerMapData = (
  region: string,
  state: string,
  lga: string,
  southwest: string,
  northeast: string
) => {
  return httpRequest("/dashboard/dealer-map-data", httpMethods.GET, {
    params: {
      region,
      state,
      lga,
      southwest,
      northeast,
    },
  });
};

const getAgentMapData = (
  region: string,
  state: string,
  lga: string,
  southwest: string,
  northeast: string,
  zoom_level: number
) => {
  return httpRequest("/dashboard/agent-map-data", httpMethods.GET, {
    params: {
      region,
      state,
      lga,
      southwest,
      northeast,
      zoom_level,
    },
  });
};

const getHeartbeat = () => {
  return httpRequest("/heartbeat", httpMethods.GET);
};

export {
  getDeviceStats,
  getDeviceMapData,
  getDealerMapData,
  getAgentMapData,
  getHeartbeat,
};
