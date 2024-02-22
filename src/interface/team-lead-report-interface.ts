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
