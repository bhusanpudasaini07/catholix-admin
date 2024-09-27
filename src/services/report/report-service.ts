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
  return httpRequest(
    "/conversion-rate/agent-performance-by-gc",
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

const exportAgentPerformanceByGC = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest(
    "/conversion-rate/agent-performance-by-gc/export",
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

const getDashboardReport = async (startDate: string, endDate: string) => {
  return httpRequest("/conversion-rate/dashboard-report", httpMethods.GET, {
    params: {
      startDate,
      endDate,
    },
  });
};

const exportDashboardReport = async (startDate: string, endDate: string) => {
  return httpRequest(
    "/conversion-rate/dashboard-report/export",
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
      },
    }
  );
};

const getSummaryReport = async (timeframe: string) => {
  return httpRequest("/conversion-rate/summary-report", httpMethods.GET, {
    params: {
      timeframe,
    },
  });
};

const getSummaryTopData = async (timeframe: string) => {
  return httpRequest(
    "/conversion-rate/summary-report-top-data",
    httpMethods.GET,
    {
      params: {
        timeframe,
      },
    }
  );
};

export {
  getAgentPerformanceByGC,
  exportAgentPerformanceByGC,
  getDashboardReport,
  getSummaryReport,
  getSummaryTopData,
  exportDashboardReport,
};
