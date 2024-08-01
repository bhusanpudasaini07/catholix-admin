export interface IDealerDetails {
  dealer_code_v: string;
  dealer_name: string;
  dealer_transaction: string;
  total_agents: string;
  total_devices: string;
}

// export interface IDealerChart {
//   data: {
//     [key: string]: {
//       date: string;
//       count: string;
//     }[];
//   }[];
// }

export interface IDealerTable {
  data: {
    results: IDealerTableDetail[];
    totalCount: number;
    totalItems: string;
    totalPages: number;
    currentPage: number;
    next: number;
    pageSize: number;
  };
}
export interface IDealerTableDetail {
  action_code_v: string;
  agent_msisdn_v: string;
  device_user_id: string;
  imei1: string;
  imei_no: string;
  simreg_kit_num_v: string;
  status_v: string;
  updated_dt: string;
  vendor_channel: string;
}
