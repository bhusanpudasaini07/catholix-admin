import { CategoryFormSchema } from "@/schema/category-schema";
import { z } from "zod";

export interface ICategoryList {
    id: string,
    createdAt: string,
    updatedAt: string,
    categoryName: string,
    isActive: boolean
  }

export interface ICategoryPost extends z.infer<typeof CategoryFormSchema> {}



export interface ICategory {
  items: ICategoryList[];
}
