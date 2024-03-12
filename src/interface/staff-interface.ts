import { IPagination } from "./pagination-interface";
import { ILogEntry } from "./project-interface";

export interface IStaff {
  data: IStaffDetails;
}

export interface IStaffDetails {
  id: string;
  employee_id: string;
  mattermost_username: string;
  username: string;
  email: string;
  fullname: string;
  permitted_modules: string;
  special_permission: string;
  system_role: string;
  join_date: string;
  status: string;
  is_project_lead: string;
  is_team_lead: string;
  viber_receiver_id: string;
  profile_image: string;
  phone: string;
  address: string;
  ic_level: string;
  career_date: string;
  department: {
    id: string;
    name: string;
  };
  role: {
    id: string;
    name: string;
  };
  pl_projects: Array<{
    id: string;
    title: string;
    code: string;
    status: string;
    source: string;
  }>;
  tl_projects: Array<{}>;
}

export interface IStaffLogs {
  data: {
    report: {
      available_rp: number;
      available_time: number;
      total_rp: number;
      total_time: number;
      client_rp: number;
      client_time: number;
    };
    time_logs: ILogEntry[];
    staff_info: IStaffDetails;
  };
  pagination: IPagination;
}

export interface IStaffProjectsDetail {
  code: string;
  market_id: string;
  name: string;
  overall_used_rp: number;
  project_lead_id: string;
  project_lead_name: string;
  risk_status: string;
  role_id: string;
  role_name: string;
  rp: number;
  sales_rp: number;
  source: string;
  status: string;
  time: number;
  project_lead_username: string;
}
export interface IStaffProjects {
  data: {
    projects: IStaffProjectsDetail[];
    staff_info: IStaffDetails;
  };
}

interface IStaffUtilizationDetail {
  [key: string]: {
    available_rp: string;
    available_time: string;
    commercial_rp: string;
    commercial_time: string;
    holiday: string;
    on_leave: string;
    rp: string;
    time: string;
  };
}

export interface IStaffUtilizationTable {
  available_rp: string;
  available_time: string;
  commercial_rp: string;
  commercial_time: string;
  holiday: string;
  on_leave: string;
  rp: string;
  time: string;
  date: string;
}

export interface IStaffUtilization {
  data: IStaffUtilizationDetail[];
}
