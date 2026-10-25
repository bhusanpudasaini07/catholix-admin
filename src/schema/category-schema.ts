import { z } from "zod";
import { basicFieldsValidation } from "./basic-schema";

const CategoryFormSchema = z.object({
  categoryName: basicFieldsValidation.categoryName,
  categoryDescription: z.string().optional(),
  categoryImage: z.instanceof(File).optional(),
  categoryImagePreview: z.string().optional(),
});

export { CategoryFormSchema };


