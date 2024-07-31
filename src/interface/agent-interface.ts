export interface IAgent {
  simreg_kit_num_v: string;
  action_code_v: string;
  vendor_channel: string;
  device_user_id: string;
  status_v: string;
  updated_dt: string;
  imei1: string;
  agent_msisdn_v: string;
  imei_no: string;
  agent_name_v_from_table: string;
  agent_name_v_from_xml: string;
  agent_transaction: string;
  app_version_name: string;
  id: string;
  in_trial: number;
  last_connected_at: string;
  licence_expires_at: string;
  location_lat: number;
  location_lng: number;
  model: string;
  name: string;
  os_version: string;
  power_status: number;
  status: string;
}

export interface IAgentDetailTable {
  data: {
    results: IAgent[];
    totalItems: string;
    totalPages: number;
    currentPage: number;
    next: number;
    previous: number;
    pageSize: number;
  };
}
