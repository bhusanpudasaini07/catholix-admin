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
  role_group: string;
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
  role_group: string;
}
export interface IRoleGroupWise {
  percentage: number;
  rp: number;
  time: number;
  title: string;
}
export interface IDepartmentGroupWise {
  percentage: number;
  rp: string;
  title: string;
}
export interface IDepartmentWise {
  department_id: string;
  department_name: string;
  rp: string;
  time: string;
}
export interface IConsumptionData {
  data: {
    rolewise: IRoleWise[];
    staffwise: IStaffWise[];
    departmentgroupwise: IDepartmentGroupWise[];
    rolegroupwise: IRoleGroupWise[];
    departmentwise: IDepartmentWise[];
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
  closed_task_count: string;
  open_task_count: string;
  tasks?: [];
  sprint_id: number;
  sprint_name: string;
  task_count_status: {
    title: string;
    value: number;
  }[];
  status: string;
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

export interface IProjectActivities {
  data: {
    project_info: { title: string };
    activities: IActivitiesDetail[];
  };
  pagination: IPagination;
}
export interface IActivitiesDetail {
  issue: {
    title: string;
    url: string;
    author: string;
  };
  by: string;
  change_type: string;
  previous_value: string | null;
  new_value: string | null;
  date: string;
}

export interface IBurndownDetail {
  data: {
    project_id: string;
    project_title: string;
    code: string;
    fiscal_year: string;
    type: string;
    source: string;
    market_title: string;
    market_id: string;
    tech_stack: string;
    risk_status: string;
    status: string;
    closed_by: string | null;
    closed_date: string | null;
    delivered_date: string | null;
    detail: string;
    rp: {
      unapproved_estimation: number;
      approved_estimation: number;
      approved_rp: number;
      unapproved_rp: number;
      sales_rp: number;
      used_rp: number;
    };
    time: {
      used_time: number;
      estimated_time: number;
    };
    dates: {
      added_date: string;
      start_date: string;
      deadline: string;
      last_log_date: string;
    };
    project_lead: {
      id: string;
      username: string;
      fullname: string;
    };
    daily_data: IBurndownDate;
  };
}

export interface IBurndownDate {
  [key: string]: {
    ideal_sales_rp: number;
    real_sales_rp?: number;
  };
}

export interface IProjectEstimation {
  data: {
    project_info: {
      title: string;
      code: string;
      start_date: string;
    };
    estimation: IProjectEstimationDetail[];
  };
}

export interface IProjectEstimationDetail {
  title: string;
  status: string;
  added_on: string;
  total_man_month: number;
  total_rp: number;
  allocated_rp: number;
  members: IMember[];
}

export interface IMember {
  role_id: number;
  role_name: string;
  days: number;
  man_month: number;
  rp: number;
  percentage_allocation: number;
  staff_id: number;
  staff_name: string;
  dates: IMemberDate[];
  sum_rp: number;
}

export interface IMemberDate {
  start_date: string;
  end_date: string;
  utilization: number;
  total_rp: number;
}

// More details status, category, platform table
export interface ITypeCount {
  title: string;
  rp: string;
}

export interface IType {
  type: string;
  count: ITypeCount[];
}

export interface ITypes {
  data: IType[];
}

// Bug task ratio interface
export interface IProjectTaskBugRatios {
  data: IProjectTaskBugRatio[];
}
export interface IProjectTaskBugRatio {
  title: string;
  task_rp: number;
  bug_rp: number;
  ratio: number;
}

// Daily RP interface

export interface IDailyRP {
  name: string;
  time: number;
  rp: number;
  username: string;
  repo_task: IDailyRepoTask[];
}

export interface IDailyRepoTask {
  title: string;
  time: number;
  rp: number;
  task_url: string;
}

export interface IEstimatedActual {
  data: IRoleBudget[];
}
interface IRoleBudget {
  id: number;
  title: string;
  estimated: number;
  actual: number;
  quote: number;
}

export interface IProjectRoleRPSummary {
  data: IProjectIndivRole[];
}

export interface IProjectIndivRole {
  actual: number;
  estimated: number;
  id: number;
  quote: number;
  title: string;
  actual_time: number;
}

export interface ILatestTaskTrend {
  data: {
    tasks: ILatestTaskTrendDetail[];
    project_info: {
      title: string;
      code: string;
    };
  };
}
export interface ILatestTaskTrendDetail {
  bug_count: number;
  closed_task_count: number;
  date: string;
  id: number;
  open_task_count: number;
  total_task_count: number;
  new_task: string;
  progress_percent: string;
  closed_task_new: number;
  open_task_new: number;
  todo_task_count: string | null;
  ready_for_qa_task_count: string | null;
  in_qa_task_count: string | null;
  doing_task_count: string | null;
  done_task_count: string | null;
}

export interface IProjectTimeWithLabel {
  data: {
    time_logs: ILogEntry[];
    bug_logs: ILogEntry[];
    summary: {
      regular_task_rp: number;
      regular_task_time: number;
      bug_task_rp: number;
      bug_task_time: number;
    };
    regular_task_members: IProjectTimeMembers[];
    bug_task_members: IProjectTimeMembers[];
  };
}
export interface IProjectTimeMembers {
  fullname: string;
  rp: number;
  staff_id: string;
  time: string;
  username: string;
}

export interface IProjectSprint {
  data: IProjectSprintDetail[];
}
export interface IProjectSprintDetail {
  closed_task_count: number;
  due_date: string;
  id: string;
  name: string;
  open_task_count: number;
  start_date: string;
  status: string;
  total_task_count: number;

  task_count: {
    value: number;
    title: string;
  }[];
}

export interface IProjectSprintTasks {
  data: {
    project_info: IProjectDetail;
    rerport: {
      total_rp: number;
      total_time: number;
    };
    tasks: IProjectSprintTaskDetails[];
  };
  pagination: IPagination;
}

export interface IProjectSprintTaskDetails {
  assignee: {
    id: string;
    username: string;
    fullname: string;
    role_id: string;
  };
  author: {
    id: string;
    name: string | null;
  };
  deadline: string;
  id: string;
  issue_id: string;
  label: {
    title: string;
    color: string;
  }[];
  repo_url: string | null;
  rp: number;
  sprint_id: string;
  status: string;
  task_url: string;
  time: number;
  title: string;
}

export interface IProjectSprintBurndown {
  data: {
    date: string;
    total_ideal_time: number;
    total_time: string;
  }[];
}
