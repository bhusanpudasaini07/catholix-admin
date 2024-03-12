export interface IDashboardProjectSummary {
  data: {
    client: IProjectTypeDetail;
    in_house: IProjectTypeDetail;
    total_client_projects: number;
    total_inhouse_projects: number;
    total_projects: number;
  };
}

export interface IProjectTypeDetail {
  closed: number;
  delivered: number;
  in_progress: number;
  not_started: number;
  on_hold: number;
  support: number;
}

export interface IDashboardTimelog {
  data: {
    total_staffs: number;
    total_staffs_with_timelog: number;
    total_staffs_without_timelog: number;
  };
}
