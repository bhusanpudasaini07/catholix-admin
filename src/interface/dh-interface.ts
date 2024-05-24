export interface ITeamLead {
  data: ITeamLeadDetail[];
}

export interface ITeamLeadDetail {
  departments: { id: string; title: string }[];
  employee_id: string;
  fullname: string;
  id: string;
  status: string;
  username: string;
  staffs: {
    employee_id: string;
    fullname: string;
    id: string;
    role_id: string;
    role_name: string;
    status: string;
    username: string;
  }[];
}

interface IStaffRpSummaryData {
  projects: {
    code: string;
    id: string;
    market: string;
    market_id: string;
    risk_status: string;
    source: string;
    status: string;
    title: string;
    total_rp: string;
    total_time: string;
  }[];

  staff: {
    available_rp: string;
    available_time: string;
    commercial_rp: string;
    commercial_time: string;
    department_id: string;
    department_name: string;
    employee_id: string;
    fullname: string;
    id: string;
    loss_rp: string;
    loss_time: string;
    role_id: string;
    role_name: string;
    used_rp: string;
    used_time: string;
    username: string;
  };
  summary: {
    all_projects_count: number;
    available_rp: number;
    available_time: number;
    commercial_projects_count: number;
    commercial_rp: number;
    commercial_time: number;
    inhouse_projects_count: number;
    inhouse_rp: number;
    inhouse_time: number;
    total_rp: number;
    total_time: number;
    utilization_range: IUtilizationRange;
  };
}

export interface IStaffRpSummary {
  data: IStaffRpSummaryData;
}
export interface IUtilizationRange {
  "20_to_40": number;
  "40_to_80": number;
  greater_than_80: number;
  less_than_20: number;
}
