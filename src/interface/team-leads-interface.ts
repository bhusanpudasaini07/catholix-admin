export interface ILeadReportSummary {
  data: ILeadDetail[];
}

export interface ILeadDetail {
  id: string;
  username: string;
  fullname: string;
  status: string;
  employee_id: string;
  departments: [
    {
      id: string;
      title: string;
    }
  ];
  summary: {
    total_rp: number;
    total_time: number;
    commercial_rp: number;
    commercial_time: number;
    inhouse_rp: number;
    inhouse_time: number;
    available_rp: number;
    available_time: number;
    all_projects_count: number;
    commercial_projects_count: number;
    inhouse_projects_count: number;
  };
}
export interface IProjectType {
  source: string;
  percentage: number;
  rp: number;
}
export interface IProjectMarket {
  name: string;
  value: number;
  percentage: number;
}

export interface IStaffRPReport {
  data: {
    summary: IStaffRPSummary;
    staff: IRPStaffDetail[];
    projects: IRPProjectDetail[];
  };
}

export interface IStaffRPSummary {
  total_rp: number;
  total_time: number;
  commercial_rp: number;
  commercial_time: number;
  inhouse_rp: number;
  inhouse_time: number;
  available_rp: number;
  available_time: number;
  all_projects_count: number;
  commercial_projects_count: number;
  inhouse_projects_count: number;
}

export interface IRPStaffDetail {
  id: string;
  fullname: string;
  username: string;
  employee_id: string;
  department_id: string;
  department_name: string;
  role_id: string;
  role_name: string;
  used_time: string;
  used_rp: string;
  loss_time: string;
  loss_rp: string;
  available_time: string;
  available_rp: string;
  commercial_time: string;
  commercial_rp: string;
}

export interface IRPProjectDetail {
  id: string;
  title: string;
  code: string;
  risk_status: string;
  source: string;
  market_id: string;
  market: string;
  total_rp: string;
  total_time: string;
}
