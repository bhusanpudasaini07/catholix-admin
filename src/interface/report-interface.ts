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

export interface IGAAndGC {
  ga_count: string;
  gc_count: string;
  conversion_rate: number | null;
  opportunity_lost: number | null;
  ga_change_percent: number;
  gc_change_percent: number;
  conversion_rate_change_percent: number;
  opportunity_lost_change_percent: number;
}

export interface ISummaryDevice {
  type: string;
  current_count: string;
  previous_count: string;
  change_percent: number;
}

export interface IReportData {
  gaAndGc: IGAAndGC;
  devices: ISummaryDevice[];
}

export interface ITopDataDetail {
  category: string;
  change_percent: number;
  current_count: string;
  name: string;
  previous_count: string;
}

export interface ITopData {
  topAgents: ITopDataDetail[];
  topDealers: ITopDataDetail[];
  topRegions: ITopDataDetail[];
  topStates: ITopDataDetail[];
  topLgas: ITopDataDetail[];
}

export interface IActivityLog {
  timestamp: string;
  user_name: string;
  description: string;
  response_code: number;
}

export interface IActivityLogResponse {
  results: IActivityLog[];
  currentPage: number;
  pageSize: number;
  totalItems: string;
  next: number | null;
  previous: number | null;
  totalPages: number;
}

export interface ISummaryReportDetail {
  data: {
    currentPage: number;
    next: number | null;
    pageSize: number;
    previous: number | null;
    results: ISummaryReportDetailResult[];
    totalItems: number;
    totalPages: number;
  };
  headers: ISummaryReportDetailHeader[];
}

export interface ISummaryReportDetailResult {
  action_code_v: string;
  agent_msisdn_v: string;
  device_user_id: string;
  imei1: string;
  simreg_kit_num_v: string;
  status_v: string;
  updated_dt: string;
  vendor_channel: string;
}

export interface ISummaryReportDetailHeader {
  display_name: string;
  access_key: string;
  type: string;
  order: number;
}

export interface IUsageTimeLog {
  user_id: number;
  user_name: string;
  date: string;
  last_activity: string;
  minutes: number;
  seconds: number;
}

export interface IUsageTimeLogResponse {
  results: IUsageTimeLog[];
  currentPage: number;
  pageSize: number;
  totalItems: string;
  next: number | null;
  previous: number | null;
  totalPages: number;
}

export interface IDashboardReportDetailHeader {
  display_name: string;
  access_key: string;
  type: string;
  order: number;
}

export interface IDashboardReportDetailResult {
  [key: string]: string | number; // This allows for dynamic fields
}

export interface IDashboardReportDetail {
  data: {
    currentPage: number;
    next: number | null;
    pageSize: number;
    previous: number | null;
    results: IDashboardReportDetailResult[];
    totalItems: number;
    totalPages: number;
  };
  headers: IDashboardReportDetailHeader[];
}
