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
