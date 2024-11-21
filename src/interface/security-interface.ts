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

export interface InactiveDevicesSf {
  data: {
    results: InactiveDevicesSfDetails[];
    totalCount: number;
    totalItems: string;
    totalPages: number;
    currentPage: number;
    next: number;
    pageSize: number;
  };
}

export interface InactiveDevicesSfDetails {
  id: number;
  name: string;
  model: string;
  app_version_name: string;
  os_version: string;
  licence_expires_at: string;
  in_trial: number;
  power_status: number;
  status: string;
  last_connected_at: string;
  location_lat: number;
  location_lng: number;
  imei_no: string;
}

export interface IMultipleLocation {
  data: {
    results: IMultipleLocationDetails[];
    totalCount: number;
    totalItems: string;
    totalPages: number;
    currentPage: number;
    next: number;
    pageSize: number;
  };
}
export interface IMultipleLocationDetails {
  id: number;
  name: string;
  model: string;
  app_version_name: string;
  os_version: string;
  licence_expires_at: string;
  in_trial: number;
  power_status: number;
  status: string;
  last_connected_at: string;
  location_lat: number;
  location_lng: number;
  imei_no: string;
  combined_locations: {
    lga: string;
    state: string;
    region: string;
  }[];
}
