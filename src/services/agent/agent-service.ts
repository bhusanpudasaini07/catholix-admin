import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getAgentDetail = (agentId: string) => {
  return httpRequest(`/ssp/agent/${agentId}`, httpMethods.GET);
};

const getAgentChartData = (
  agentId: string,
  startDate: string,
  endDate: string
) => {
  return httpRequest(
    `/ssp/agent/registered-chart/${agentId}`,
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
      },
    }
  );
};

const getAgentDetailTable = (
  agentId: string,
  page: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  searchTerm?: string
) => {
  return httpRequest(`/ssp/agent/registered/${agentId}`, httpMethods.GET, {
    params: {
      page,
      pageSize,
      startDate,
      endDate,
      ...(searchTerm && { searchTerm }),
    },
  });
};

const exportAgentData = (
  agentId: string,
  startDate: string,
  endDate: string,
  searchTerm?: string
) => {
  return httpRequest(
    `/ssp/agent/registered-export/${agentId}`,
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
        ...(searchTerm && { searchTerm }),
      },
    }
  );
};

export {
  getAgentDetail,
  getAgentChartData,
  getAgentDetailTable,
  exportAgentData,
};
