import { IPagination } from "./pagination-interface";

export interface IProjectProps {
  data: IProjectDetail[];
  pagination: IPagination;
}

export interface IProjectDetail {
  project_id: number;
  project_title: string;
  code: string;
  fiscal_year: string;
  type: string;
  source: string;
  market_title: string;
  market_id: number;
  tech_stack: string;
  risk_status: string;
  status: string;
  closed_by: string | null;
  closed_date: string | null;
  delivered_date: string | null;
  member_count: number;
  client: {
    name: string | null;
    id: string;
  };
  git_urls: string[];
  rp: {
    unapproved_estimation: number;
    approved_estimation: number;
    approved_rp: number;
    unapproved_rp: number;
    sales_rp: number | null;
    used_rp: number | null;
  };
  dates: {
    added_date: string;
    start_date: string;
    deadline: string;
    last_log_date: string | null;
  };
  project_lead: {
    id: string;
    fullname: string;
    username: string;
    in_progress_project_count: number | null;
    in_support_project_count: number | null;
  };
  projectL_lead: {
    username: string;
  };
  offshore_members: (null | {
    id: string;
    fullname: string;
    username: string;
  })[];

  task: {
    open_task_count: string;
    closed_task_count: string;
    all_task_count: string;
    bug_count: string;
  };
  assigned_roles_members: any[];
  member_utilization: any[];
  role_utilization: any[];
}

export interface ProjectData {
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  project_lead: string;
  tech_lead: string;
  source: "client" | "in house";
  client?: string;
  project_type: "monthly" | "fixed support";
  market:
    | "aus"
    | "eu"
    | "japan"
    | "korea"
    | "nepal"
    | "singapore"
    | "uk"
    | "usa";
  git_urls?: string;
  tech_stack?: string;
  resources?: string;
}

// DefaultRpSummary
export interface IRoleWise {
  role_id: string;
  role_name: string;
  time: string;
  rp: string;
}

export interface IStaffWise {
  staff_id: string;
  name: string;
  username: string;
  employee_id: string;
  time: string;
  rp: string;
  role: string;
  role_id: string;
}

export interface IConsumptionData {
  data: {
    rolewise: IRoleWise[];
    staffwise: IStaffWise[];
  };
}

export interface ITimeLogs {
  project_info: IProjectInfo;
  data: ILogEntry[];
  report: IReport;
  pagination: IPagination;
}
export interface IProjectInfo {
  project_id: string;
  project_title: string;
  code: string;
  fiscal_year: string;
  type: string;
  source: string;
  market_title: string | null;
  market_id: string;
  status: string;
  closed_by: string | null;
  closed_date: string | null;
  delivered_date: string | null;
  project_lead: {
    id: string;
    username: string;
    fullname: string;
  };
}

export interface ILogEntry {
  date: string;
  title: string;
  task_url: string;
  repo_url: string;
  time: number;
  rp: number;
  log_by: {
    id: string;
    username: string;
    fullname: string;
    role_id: string;
    role_name: string;
  };
  label: {
    title: string;
    color: string;
  }[];
  author: { id: string; name: string };
}

export interface IReport {
  total_rp: number;
  total_time: number;
}

export interface IProjectRelease {
  date: string;
  title: string;
  url: string;
}

export interface IProjectUserStories {
  bug_count: number;
  estimated_time: number;
  repo_issue_url: string;
  spent_time: number;
  task_count: number;
  title: string;
}

export interface ISalesRP {
  data: ISalesRPDetail[];
}

export interface ISalesRPDetail {
  added_by: string;
  added_on: string;
  remarks: string;
  rp: number;
}
