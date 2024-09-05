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

export interface PasswordMismatch {
  data: {
    results: PasswordMismatchDetails[];
    totalCount: number;
    totalItems: string;
    totalPages: number;
    currentPage: number;
    next: number;
    pageSize: number;
  };
}

export interface PasswordMismatchDetails {
  latitude: number;
  longitude: number;
  imei_no: string;
  agent_name: string;
  dealer_name: string;
  last_connected_at: string;
  wrong_attempt_at: string;
  device_id: string;
  name: string;
  total_count: string;
}
