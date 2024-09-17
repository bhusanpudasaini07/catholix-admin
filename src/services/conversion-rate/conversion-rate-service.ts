import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getAgentConversionRate = async (
  page: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest("/conversion-rate/agent", httpMethods.GET, {
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

const exportAgentConversionRate = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest("/conversion-rate/agent/export", httpMethods.GET, {
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

// New dealer functions
const getDealerConversionRate = async (
  page: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest("/conversion-rate/dealer", httpMethods.GET, {
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

const exportDealerConversionRate = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest("/conversion-rate/dealer/export", httpMethods.GET, {
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

export {
  getAgentConversionRate,
  exportAgentConversionRate,
  getDealerConversionRate,
  exportDealerConversionRate,
};
