export interface IPerformanceReportHeader {
  display_name: string;
  access_key: string;
  type: string;
  order: number;
}

export interface IPerformanceReportResult {
  agent_msisdn: string;
  agent_name: string;
  dealer_name: string;
  ga: string;
  gc: string;
  conversion_rate: number;
  region_code: string;
  state_code: string;
  lg_code: string;
  lga: string;
  state: string;
  region: string;
}

export interface IPerformanceReportData {
  results: IPerformanceReportResult[];
  currentPage: number;
  pageSize: number;
  totalItems: string;
  next: number | null;
  previous: number | null;
  totalPages: number;
}

export interface IPerformanceReport {
  headers: IPerformanceReportHeader[];
  data: IPerformanceReportData;
}

export interface IReportItem {
  count: number;
  date: string;
}

export interface IDashboardReport {
  activeDevices: IReportItem[];
  gaCount: IReportItem[];
  gcCount: IReportItem[];
  gcDeviceCount: IReportItem[];
  heartbeatDevice: IReportItem[];
  inactiveDevice: IReportItem[];
  noHeartbeatDevice: IReportItem[];
  totalDevice: IReportItem[];
}
