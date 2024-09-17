import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getAgentPerformanceByGC = async (
  page: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest("/conversion-rate/agent-performance-by-gc", httpMethods.GET, {
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

const exportAgentPerformanceByGC = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest("/conversion-rate/agent-performance-by-gc/export", httpMethods.GET, {
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

export { getAgentPerformanceByGC, exportAgentPerformanceByGC };