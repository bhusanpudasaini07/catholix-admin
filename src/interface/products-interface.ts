import { CategoryFormSchema } from "@/schema/category-schema";
import { ProductFormSchema } from "@/schema/product-schema";
import { z } from "zod";


export interface IProductsList {
  data: IProducts[];
}
export interface IProducts {
    id: any,
    createdAt: string,
    updatedAt: string,
    productName: string
  }

export interface IProductsPost extends z.infer<typeof ProductFormSchema> {}


