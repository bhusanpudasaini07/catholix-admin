import { z } from "zod";
import { IPagination } from "./pagination-interface";
import { DepartmentSchema } from "@/schema/department-schema/department-schema";

export interface IDepartment {
  data: {
    total_departments: number;
    total_sub_departments: number;
    departments_members: number;
    departments: IDepartmentDetail[];
  };
  pagination: IPagination;
}

export interface IDepartmentDetail {
  description: string | null;
  code: string;
  start_date: string | null;
  created_at: string;
  updated_at: string;
  parent_id: string;
  name: string;
  id: string;
  organization_id: string;
  department_head: string;
  is_default: boolean;
  sub_departments_count: number;
  sub_department_names: string[];
  department_members: IDepartmentMember[];
}
interface IDepartmentMember {
  first_name: string;
  last_name: string;
  email: string;
  image: string;
}

export interface ISubDepartment {
  data: ISubDepartmentDetail[];
}
interface ISubDepartmentDetail {
  id: string;
  code: string;
  department_head: string;
  name: string;
  parent_id: string;
  team_members: IDepartmentMember[];
}

export interface IDepartmentFormInput
  extends z.infer<typeof DepartmentSchema> {}
