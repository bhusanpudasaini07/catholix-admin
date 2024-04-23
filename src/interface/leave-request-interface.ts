export interface ILeaveRequest {
  data: ILeaveRequestDetail[];
}

export interface ILeaveRequestDetail {
  name: string;
  username: string;
  role_id: string;
  role: string;
  department_id: string;
  department: string;
  leave: {
    type: string;
    from_date: string;
    to_date: string;
    status: string;
    category: string;
    leave_count: string;
    reason: string;
  };
  projects: Array<{
    id: string;
    title: string;
    code: string;
    status: string;
    project_lead_id: string;
    project_lead: string;
  }>;
}
