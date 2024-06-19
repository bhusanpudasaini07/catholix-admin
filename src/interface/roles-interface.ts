import { RoleSchema } from "@/schema/auth-schema/role-schema";
import { z } from "zod";

export interface IRoles {
  data: {
    results: IRoleDetail[];
    currentPage: number;
    next: number;
    pageSize: number;
    previous: number;
    totalItems: number;
  };
}

export interface IRoleDetail {
  createdAt: string;
  description: string;
  id: number;
  name: string;
  updatedAt: string;
  userCount: number;
}

export interface IPermissionDetail {
  createdAt: string;
  description: string;
  id: number;
  isDefault: boolean;
  method: string;
  path: string;
  resource: string;
  updatedAt: string;
}

export interface IPermissions {
  data: {
    currentPage: number;
    next: number;
    pageSize: number;
    previous: number;
    results: IPermissionDetail[];
    totalItems: number;
  };
}

export interface IRolesForm extends z.infer<typeof RoleSchema> {}

export interface IRoleDetails {
  data: {
    createdAt: string;
    description: string | null;
    id: number;
    name: string;
    permission: IPermissionDetail[];
    updatedAt: string;
  };
}
