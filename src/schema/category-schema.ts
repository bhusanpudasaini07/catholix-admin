import { z } from "zod";
import { basicFieldsValidation } from "./basic-schema";

const CategoryFormSchema = z.object({
  categoryName: basicFieldsValidation.categoryName,
  
});

export { CategoryFormSchema };


