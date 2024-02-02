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
  client: {
    name: string | null;
    id: number;
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
    in_progress_project_count: number | null;
    in_support_project_count: number | null;
  };
  projectL_lead: {
    username: string;
  };
  offshore_members: [
    {
      id: string;
      fullname: string;
      username: string;
    }
  ];

  task: {
    open_task_count: string;
    closed_task_count: string;
    all_task_count: string;
  };
}
