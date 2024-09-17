export interface IConversionRateAgent {
  headers: IConversionRateAgentHeader[];
  data: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    pageSize: number;
    next: number;
    results: IConversionRateAgentResponse[];
  };
}
export interface IConversionRateAgentHeader {
  display_name: string;
  access_key: string;
  order: number;
  type: string;
}

export interface IConversionRateAgentResponse {
  agent_msisdn: string;
  agent_name: string;
  conversion_rate: number;
  ga: string;
  gc: string;
  lg_code: string;
  lga: string;
  region: string;
  region_code: string;
  state: string;
  state_code: string;
}

// Dealer

export interface IConversionRateDealerHeader {
  display_name: string;
  access_key: string;
  order: number;
  type: string;
}

export interface IConversionRateDealerResponse {
  dealer_msisdn: string;
  dealer_name: string;
  conversion_rate: number;
}

export interface IConversionRateDealer {
  headers: IConversionRateDealerHeader[];
  data: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    pageSize: number;
    next: number;
    results: IConversionRateDealerResponse[];
  };
}

// Agent Performance

export interface IAgentPerformanceHeader {
  display_name: string;
  access_key: string;
  order: number;
  type: string;
}

export interface IAgentPerformanceResponse {
  agent_msisdn: string;
  agent_name: string;
  ga: number;
  gc: number;
  conversion_rate: number;
  region_code: string | null;
  state_code: string | null;
  lg_code: string | null;
  lga: string | null;
  state: string | null;
  region: string | null;
}

export interface IAgentPerformance {
  headers: IAgentPerformanceHeader[];
  data: {
    high_conversion_agent: IAgentPerformanceResponse[];
    less_conversion_agent: IAgentPerformanceResponse[];
  };
}
