import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getOverallPerformance = async (
  page: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest("/conversion-rate/agent-performance-by-gc-cr", httpMethods.GET, {
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

const exportOverallPerformance = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest("/conversion-rate/agent-performance-by-gc-cr/export", httpMethods.GET, {
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

export { getOverallPerformance, exportOverallPerformance };