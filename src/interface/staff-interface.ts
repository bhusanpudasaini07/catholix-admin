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
    };
    time_logs: ILogEntry[];
    staff_info: IStaffDetails;
  };
  pagination: IPagination;
}
