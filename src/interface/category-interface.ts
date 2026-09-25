import { CategoryFormSchema } from "@/schema/category-schema";
import { z } from "zod";

export interface ICategoryList {
    id: number,
    createdAt: string,
    updatedAt: string,
    categoryName: string
  }

export interface ICategoryPost extends z.infer<typeof CategoryFormSchema> {}

