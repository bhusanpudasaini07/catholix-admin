import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getImeiMisMatchData = async (
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
    "/security/imei-mismatch/paginated-list",
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

const getImeiMisMatchMapData = async (
  API_BASE_URL: string | undefined,
  regionId: string,
  stateId: string,
  lga: string[],
  southWest: string,
  northEast: string,
  startDate: string,
  endDate: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/security/imei-mismatch/map-data?startDate=${startDate}&endDate=${endDate}&region=${
      regionId || "all"
    }&state=${stateId || "all"}&lga=${
      lga.length > 0 ? lga.join(",") : "all"
    }&southwest=${southWest}&northeast=${northEast}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.body;
};

export { getImeiMisMatchData, getImeiMisMatchMapData };
