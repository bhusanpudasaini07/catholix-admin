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

const getSummaryReport = async (startDate: string, endDate: string) => {
  return httpRequest("/conversion-rate/summary-report", httpMethods.GET, {
    params: {
      startDate,
      endDate,
    },
  });
};

const getSummaryTopData = async (startDate: string, endDate: string) => {
  return httpRequest(
    "/conversion-rate/summary-report-top-data",
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
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
  startDate: string,
  endDate: string,
  type: string
) => {
  return httpRequest("/conversion-rate/report-detail-data", httpMethods.GET, {
    params: {
      page,
      pageSize,
      startDate,
      endDate,
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

const getCorporateEBReport = async (startDate: string, endDate: string) => {
  return httpRequest("/conversion-rate/carporate-eb-report", httpMethods.GET, {
    params: {
      startDate,
      endDate,
    },
  });
};

const exportCorporateEBReport = async (startDate: string, endDate: string) => {
  return httpRequest(
    "/conversion-rate/carporate-eb-report/export",
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
      },
    }
  );
};

// Add this new function to the existing file

const getDashboardReportDetail = async (
  page: number,
  pageSize: number,
  date: string,
  type: string
) => {
  return httpRequest(
    "/conversion-rate/dashboard-report-detail-data",
    httpMethods.GET,
    {
      params: {
        page,
        pageSize,
        date,
        type,
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
  getActivityLogData,
  getSummaryReportDetail,
  getUserUsageTime,
  getCorporateEBReport,
  exportCorporateEBReport,
  getDashboardReportDetail,
};
