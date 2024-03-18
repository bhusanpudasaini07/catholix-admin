import { IPagination } from "./pagination-interface";

export interface ITeamMemberList {
  data: ITeamMemberDetails[];
  pagination: IPagination;
}
export interface ITeamMemberDetails {
  fullname: string;
  username: string;
  id: string;
  employee_id: string;
  department: {
    id: string;
    name: string;
  };
  role: {
    id: string;
    name: string;
  };
  project_count: number;
  projects: {
    id: string;
    name: string;
    project_lead: string;
    status: string;
    code: string;
  }[];
  available_time: string;
  used_time: string;
  available_rp: string;
  used_rp: string;
  commercial_rp: string;
  daily_time: {
    date: string;
    used_time: string;
    available_time: string;
    commercial_time: string;
  }[];
}
