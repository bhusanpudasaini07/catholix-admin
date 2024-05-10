export interface IProjectRequiredRoles {
  data: IProjectRequiredRoleDetail[];
}

export interface IProjectRequiredRoleDetail {
  project_id: number;
  project_title: string;
  code: string;
  fiscal_year: string;
  type: string;
  detail?: string;
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
    rp_utilization_percentage: number | null;
    used_rp: number | null;
  };
  dates: {
    added_date: string;
    start_date: string;
    deadline: string;
    last_log_date: string | null;
    time_completion_percentage: number;
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
    bug_ratio_percentage: string;
  };
  time: {
    used_time: string;
    estimated_time: string;
  };
  assigned_roles_members: any[];
  member_utilization: any[];
  role_utilization: any[];

  health: {
    task_completion_percentage: number;
    rp_completion_percentage: number;
    time_completion_percentage: number;
    overall_completion_percentage: number;
    grade: string;
  };
  required_roles: { id: string; name: string }[];
}
