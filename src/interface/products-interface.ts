import { ProductFormSchema } from "@/schema/product-schema";
import { z } from "zod";
import {  ICategoryList } from "./category-interface";


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
    productImageUrl?: string,
    category: ICategoryList,
    categoryId: any,
 }

export interface IProductsPost extends z.infer<typeof ProductFormSchema> {}


