import { z } from "zod";
import { basicFieldsValidation } from "./basic-schema";

const ProductFormSchema = z.object({
  productName: z
    .string({ required_error: "Product name is required." })
    .min(1, "Product name is required.")
    .max(100, "Product name must not exceed 100 characters."),
  productDescription: z
    .string({ required_error: "Product description is required." })
    .trim()
    .min(1, "Product description is required."),
  productPrice: z.coerce
    .number({ required_error: "Enter a valid price." })
    .positive("Price must be greater than zero."),
  categoryId: z
    .string({ required_error: "Please select a category." })
    .trim()
    .min(1, "Please select a category."),
  productImage: z.custom<File>(
    (value) => typeof File !== "undefined" && value instanceof File,
    { message: "Please upload a product image." }
  ),
});

export { ProductFormSchema };
