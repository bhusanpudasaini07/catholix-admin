import { CategoryFormSchema } from "@/schema/category-schema";
import { z } from "zod";

export interface ICategoryList {
    id: any,
    createdAt: string,
    updatedAt: string,
    categoryName: string
  }

export interface ICategoryPost extends z.infer<typeof CategoryFormSchema> {}



export interface ICategory {
  data: ICategoryList[];
}
