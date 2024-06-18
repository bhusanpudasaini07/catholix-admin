import { AdminFormSchema } from "@/schema/auth-schema/admin-schema";
import { z } from "zod";

export interface IAdmin {
  data: {
    results: IAdminDetail[];
    currentPage: number;
    next: number;
    pageSize: number;
    previous: number;
    totalItems: number;
  };
}

export interface IAdminDetail {
  avatar: string | null;
  contact: string;
  createdAt: string;
  disabled: boolean;
  email: string;
  firstName: string;
  id: number;
  isTwoFAEnabled: boolean;
  lastName: string;
  role: {
    id: number;
    name: string;
  };
  status: string;
  updatedAt: string;
  regionId: number;
  stateId: number;
  localGovernments: { id: number; name: string }[];
}

export interface IAdminForm extends z.infer<typeof AdminFormSchema> {}
