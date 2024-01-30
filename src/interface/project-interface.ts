import { ProjectSchema } from "@/schema/project-schema/project-schema";
import { z } from "zod";
import { IPagination } from "./pagination-interface";

export interface IProject {
  data: {
    total_projects: number;
    pending_projects: number;
    complete_projects: number;
    in_progress_projects: number;
    projects: IProjectDetails[];
  };
  pagination: IPagination;
}

export interface IAllProject {
  data: [
    {
      name: string;
      id: string;
      code: string;
    }
  ];
}

export interface IProjectDetails {
  id: string;
  org_id_id: string;
  name: string;
  code: string;
  start_date: string;
  end_date: string;
  status: string;
  bill_count: number;
  bill_amount: number;
  description: string;
  pag: string;
  project_manager: string;
  is_synced: boolean;
  sync_date: string;
  created_at: string;
  updated_at: string;
  project_members: IProjectMembers[];
}
interface IProjectMembers {
  first_name: string;
  last_name: string;
  email: string;
  image: string;
}

export interface ITeamMembers {
  data: [
    {
      email: string;
      first_name: string;
      id: string;
      image: string;
      last_name: string;
    }
  ];
}

export interface IProjectFormInput extends z.infer<typeof ProjectSchema> {}
