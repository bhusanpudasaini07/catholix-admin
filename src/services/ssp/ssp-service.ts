import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getSSPData = (
  page: number,
  pageSize: number,
  searchTerm?: string,
  columns?: string
) => {
  return httpRequest(`/ssp`, httpMethods.GET, {
    params: {
      page: page,
      pageSize: pageSize,
      ...(searchTerm && { searchTerm: searchTerm }),
      ...(columns && { columns: columns }),
    },
  });
};

export { getSSPData };
