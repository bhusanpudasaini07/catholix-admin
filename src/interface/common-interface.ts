export interface IFilterConfig {
  roles: Array<{
    id: string;
    title: string;
  }>;
  markets: Array<{
    id: string;
    title: string;
  }>;
  fiscal_years: Array<{
    id: string;
    title: string;
    status: string;
  }>;
  project_status: string[];
  project_types: string[];
  project_risks: string[];
  project_sources: string[];
  departments: Array<{
    id: string;
    title: string;
    date_from: string;
    date_to: string;
    status: string;
    remarks: string;
    added_on: string;
    updated_on: string;
    added_by: string;
    updated_by: string;
  }>;
  team_leads: Array<{
    id: string;
    title: string;
    date_from: string;
    date_to: string;
    status: string;
    remarks: string;
    added_on: string;
    updated_on: string;
    added_by: string;
    updated_by: string;
    username: string;
    fullname: string;
    employee_id: string;
    departments: Array<{
      id: string;
      title: {
        id: string;
        title: string;
        date_from: string;
        date_to: string;
        status: string;
        remarks: string;
        added_on: string;
        updated_on: string;
        added_by: string;
        updated_by: string;
      } | null;
      status: string;
    }>;
  }>;
  project_leads: Array<{
    id: string;
    title: string;
    date_from: string;
    date_to: string;
    status: string;
    remarks: string;
    added_on: string;
    updated_on: string;
    added_by: string;
    updated_by: string;
    username: string;
    fullname: string;
    employee_id: string;
    departments: Array<{
      id: string;
      title: {
        id: string;
        title: string;
        date_from: string;
        date_to: string;
        status: string;
        remarks: string;
        added_on: string;
        updated_on: string;
        added_by: string;
        updated_by: string;
      };
      status: string;
    }>;
    role: {
      id: string;
      title: {
        id: string;
        title: string;
      };
    };
  }>;
}
