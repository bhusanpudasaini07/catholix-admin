export interface IPropsTeamDepartmentData {
  id: string;
  title: string;
}

export interface IPropsTeamLeadData {
  id: string;
  username: string;
  fullname: string;
  status: string;
  employee_id: string;
  departments: IPropsTeamDepartmentData[];
}

export interface IPropsTeamLeadList {
  data: IPropsTeamLeadData[];
}

export interface ICountryProjectDetails {
  code: string;
  id: string;
  market: string;
  market_id: string;
  risk_status: string;
  source: string;
  title: string;
  total_rp: string;
  total_time: string;
  percentage: string;
}

export interface IStaff {
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

export interface IProject {
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

export interface ICountryInHouseTotalRP {
  country: string;
  totalRP: number;
  percentage: number;
}

export interface ISummary {
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

export interface IStaffRpSummary {
  summary: ISummary;
  staff: IStaff[];
  projects: IProject[];
}

export interface IRpStaffSummaryProps {
  staffRpSummaryData: any;
  staffDataLoading: boolean;
}
