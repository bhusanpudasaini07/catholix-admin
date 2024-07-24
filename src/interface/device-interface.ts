export interface IDevicesData {
  data: {
    results: IDeviceDetail[];
    totalCount: number;
    totalItems: string;
    totalPages: number;
    currentPage: number;
    next: number;
    pageSize: number;
  };
}

export interface IDeviceDetail {
  model_name: string;
  app_version_name: string;
  os_version: string;
  licence_expires_at: string;
  name: string;
  in_trial: number;
  power_status: number;
  device_status: string;
  battery_status: String;
  battery_charging: number;
  serial_no: string;
  imei_no: string;
  model: string;
  make: string;
  android_id: string;
  udid: string;
  licence_active: number;
  locked: number;
  last_connected_at: string;
  wifi_mac_address: string;
  ip_address: string;
  public_ip: string;
  bluetooth_mac: string;
  rooted: string;
  enrollment_date: string;
  gsuite_account: string;
  build_serial_no: string;
  gsm_serial_no: string;
  iccid_no: string;
  phone_no: string;
  os_type: string;
  unique_id: string;
  custom_properties: string;
  build_version: string;
  imei_no_2: string;
  imsi_no: string;
  imsi_no_2: string;
  iccid_no_2: string;
  phone_no_2: string;
  management_details_enrollment_mode: string;
  management_details_management_agent: string;
  management_details_enrollment_method: string;
  management_details_enrollment_type: string;
  management_details_management_mode: string;
  mac_pin: string;
  screen_locked: number;
  itunes_account_status: string;
  location_lat: number;
  location_lng: number;
  location_address: string;
  location_date_time: string;
  location_created_at: string;
  profile_id: number;
  profile_name: string;
  group_id: number;
  group_name: string;
  group_parent_group_id: number;
  encryption_details: string;
  avbl_wifi_ssids: string;
  storage_info: string;
  signed_in_user: string;
  sign_in_time: string;
  sign_out_time: string;
  marked_as_lost: number;
  firewall_enabled: number;
  firewall_status: string;
  last_update_time: string;
  updateInfo: string;
  location_updated_at: string;
  power_on_time: string;
  power_off_time: string;
  last_seen_on: string;
  connection_state: string;
  connection_status: string;
  region_code: string;
  state_code: string;
  lg_code: string;
}

export interface IInactiveStats {
  data: {
    "2": number;
    "5": number;
    "7": number;
    "10": number;
    "15": number;
    "30": number;
    total: number;
  };
}
