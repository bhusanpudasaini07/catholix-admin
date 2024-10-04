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

const getActivityLogData = async (
  page: number,
  pageSize: number,
  searchText: string
  // columns: string
) => {
  return httpRequest("/activity_log", httpMethods.GET, {
    params: {
      page,
      pageSize,
      ...(searchText && { searchText }),
      // columns,
    },
  });
};

const getSummaryReportDetail = async (
  page: number,
  pageSize: number,
  timeframe: string,
  type: string
) => {
  return httpRequest("/conversion-rate/report-detail-data", httpMethods.GET, {
    params: {
      page,
      pageSize,
      timeframe,
      type,
    },
  });
};

const getUserUsageTime = async (
  page: number,
  pageSize: number,
  searchTerm: string,
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string
) => {
  return httpRequest("/user-usage-time", httpMethods.GET, {
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
export {
  getAgentPerformanceByGC,
  exportAgentPerformanceByGC,
  getDashboardReport,
  getSummaryReport,
  getSummaryTopData,
  exportDashboardReport,
  getActivityLogData,
  getSummaryReportDetail,
  getUserUsageTime,
};
