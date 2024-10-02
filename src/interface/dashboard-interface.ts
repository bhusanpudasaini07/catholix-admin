export interface IDeviceStats {
  data: {
    active_device_count: number;
    active_users: number;
    heartbeat_device_count: number;
    inactive_device_count: number;
    noheartbeat_device_count: number;
    total_device_count: number;
    registered_device_ga_count: number;
    connected_device_gc_count: number;
    connected_gc_count: number;
    total_live_device_count: number;
    offline_users: number;
    registered_ga_count: number;
  };
}

export interface IDeviceMap {
  data: IDeviceGroup;
}

export interface IDeviceGroup {
  active_device: IDashboardDeviceDetail[];
  inactive_device: IDashboardDeviceDetail[];
  noheartbeat_device: IDashboardDeviceDetail[];
  heartbeat_device: IDashboardDeviceDetail[];
}

export interface IDashboardDeviceDetail {
  latitude: number;
  longitude: number;
  android_id: string;
  app_version_name: string;
  avbl_wifi_ssids: string;
  battery_charging: number;
  battery_status: number;
  bluetooth_mac: string;
  build_serial_no: string;
  build_version: string;
  connection_state: string;
  connection_status: string;
  custom_properties: string;
  device_status: string;
  encryption_details: string;
  enrollment_date: string;
  firewall_enabled: number;
  firewall_status: string;
  group_id: any;
  group_name: any;
  group_parent_group_id: any;
  gsm_serial_no: string;
  gsuite_account: string;
  iccid_no: string;
  iccid_no_2: string;
  id: string;
  imei_no: string;
  imei_no_2: string;
  imsi_no: string;
  imsi_no_2: string;
  in_trial: number;
  ip_address: string;
  itunes_account_status: string;
  last_connected_at: string;
  last_seen_on: string;
  last_update_time: any;
  licence_active: number;
  licence_expires_at: string;
  location_address: string;
  location_created_at: string;
  location_date_time: string;
  location_lat: number;
  location_lng: number;
  location_updated_at: string;
  locked: number;
  mac_pin: any;
  make: string;
  management_details_enrollment_method: string;
  management_details_enrollment_mode: string;
  management_details_enrollment_type: string;
  management_details_management_agent: string;
  management_details_management_mode: string;
  marked_as_lost: any;
  model: string;
  model_name: string;
  name: string;
  os_type: string;
  os_version: string;
  phone_no: string;
  phone_no_2: string;
  power_off_time: any;
  power_on_time: any;
  power_status: number;
  profile_id: string;
  profile_name: string;
  public_ip: string;
  rooted: string;
  screen_locked: number;
  serial_no: string;
  sign_in_time: string;
  sign_out_time: string;
  signed_in_user: string;
  status: string;
  storage_info: string;
  udid: any;
  unique_id: string;
  updateInfo: string;
  wifi_mac_address: string;
}

export interface IDealerMap {
  data: IDealerDetail[];
}

export interface IDealerDetail {
  dealer_address: string;
  dealer_code: string;
  dealer_code_v: string;
  dealer_division: string;
  dealer_name: string;
  dealer_type: string;
  latitude: string;
  longitude: string;
  dealer_contact: string;
  total_agents: string;
}

export interface IAgentMap {
  data: IAgentDetail[];
}

export interface IAgentDetail {
  address1: string;
  address2: string;
  address3: string;
  agent_msisdn: string;
  alter_mobile_num: string;
  code: string;
  latitude: string;
  longitude: string;
  name: string;
  total_agents: number;
  avg_latitude: number;
  avg_longitude: number;
}
