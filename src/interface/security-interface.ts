export interface ImeiMismatch {
  data: {
    results: ImeiMismatchDetails[];
    totalCount: number;
    totalItems: string;
    totalPages: number;
    currentPage: number;
    next: number;
    pageSize: number;
  };
}

export interface ImeiMismatchDetails {
  agent_name: string;
  dealer_name: string;
  imei1: string;
  latitude: string | null;
  lg_code: string | null;
  longitude: string | null;
  region_code: string | null;
  sim_reg_device_id: string;
  state_code: string | null;
  updated_dt: string;
}
