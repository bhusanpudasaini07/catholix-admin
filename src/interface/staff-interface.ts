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
