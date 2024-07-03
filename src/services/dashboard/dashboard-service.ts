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

export { getDeviceStats, getDeviceMapData };
