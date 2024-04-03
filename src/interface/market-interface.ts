export interface IMarketSummary {
  data: {
    projects: IMarketProject[];
    market_summary: IMarkets[];
  };
}

export interface IMarkets {
  id: number;
  title: string;
  rp: number;
  client_rp: number;
  inhouse_rp: number;
  project_count: number;
  rpPercentage: number | string;
  color: string;
  flag: string;
}

export interface IMarketProjectInfo {
  id: string;
  title: string;
  code: string;
  source: string;
  market: string;
  sales_rp: null | number;
  total_rp: number;
}

export interface IMarketProjectRole {
  id: number;
  title: string;
  rp: number;
}

export interface IMarketProject {
  info: IMarketProjectInfo;
  roles: IMarketProjectRole[];
}

export interface IMarketProjects {
  title: string;
  code: string;
  total_rp: number;
  source: string;
  rp_consumed: string | number;
}
