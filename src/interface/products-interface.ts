import { CategoryFormSchema } from "@/schema/category-schema";
import { ProductFormSchema } from "@/schema/product-schema";
import { z } from "zod";


export interface IProductsList {
  data: IProducts[];
}
export interface IProducts {
    id: number,
    createdAt: string,
    updatedAt: string,
    productName: string,
    productDescription: string,
    productPrice: number,
    productImage: string,
    categoryId: any,
 }

export interface IProductsPost extends z.infer<typeof ProductFormSchema> {}


