export interface IPropsTeamDepartmentData {
  id: string;
  title: string;
}

export interface IPropsTeamLeadData {
  id: string;
  username: string;
  fullname: string;
  status: string;
  employee_id: string;
  departments: IPropsTeamDepartmentData[];
}

export interface IPropsTeamLeadList {
  data: IPropsTeamLeadData[];
}

export interface ICountryProjectDetails {
  code: string;
  id: string;
  market: string;
  market_id: string;
  risk_status: string;
  source: string;
  title: string;
  total_rp: string;
  total_time: string;
  percentage: string;
}
