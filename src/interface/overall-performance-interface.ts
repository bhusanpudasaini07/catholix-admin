export interface IOverallPerformanceHeader {
  access_key: string;
  display_name: string;
  type: string;
}

export interface IOverallPerformance {
  headers: IOverallPerformanceHeader[];
  data: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    pageSize: number;
    next: number;
    results: IOverallPerformanceResponse[];
  };
}

export interface IOverallPerformanceResponse {
  [key: string]: string | number;
}

export interface IOverallPerformanceProps {
  data: IOverallPerformance;
}
