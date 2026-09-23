import { CategoryFormSchema } from "@/schema/category-schema";
import { z } from "zod";

export interface ICategoryPost extends z.infer<typeof CategoryFormSchema> {}
