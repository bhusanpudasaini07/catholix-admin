export interface ILeadReportSummary {
  data: ILeadDetail[];
}

export interface ILeadDetail {
  id: string;
  username: string;
  fullname: string;
  status: string;
  employee_id: string;
  departments: [
    {
      id: string;
      title: string;
    }
  ];
  summary: {
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
  };
}
