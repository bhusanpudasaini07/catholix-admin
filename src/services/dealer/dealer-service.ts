import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getDealerDetail = (dealerCode: string) => {
  return httpRequest(`/ssp/dealer/${dealerCode}`, httpMethods.GET);
};

const getDealerChartData = (
  dealerCode: string,
  startDate: string,
  endDate: string,
  type: string
) => {
  return httpRequest(
    `/ssp/dealer/registered-chart/${dealerCode}`,
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
        type,
      },
    }
  );
};

const getDealerTableData = (
  dealerCode: string,
  page: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  type: string,
  searchTerm?: string
) => {
  return httpRequest(`/ssp/dealer/registered/${dealerCode}`, httpMethods.GET, {
    params: {
      page,
      pageSize,
      startDate,
      endDate,
      type,
      ...(searchTerm && { searchTerm }),
    },
  });
};

const exportDealerData = (
  dealerCode: string,
  startDate: string,
  endDate: string,
  type: string
) => {
  return httpRequest(
    `/ssp/dealer/registered-export/${dealerCode}`,
    httpMethods.GET,
    {
      params: {
        startDate,
        endDate,
        type,
      },
    }
  );
};

export {
  getDealerDetail,
  getDealerChartData,
  getDealerTableData,
  exportDealerData,
};
