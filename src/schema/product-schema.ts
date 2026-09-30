import { z } from "zod";
import { basicFieldsValidation } from "./basic-schema";

const ProductFormSchema = z.object({
  productImageUrl: z.string().optional(),
  productName: z
    .string({ required_error: "Product name is required." })
    .min(1, "Product name is required.")
    .max(100, "Product name must not exceed 100 characters."),
  productDescription: z
    .string({ required_error: "Product description is required." })
    .trim()
    .min(1, "Product description is required."),
  quantity: z.coerce.number({ required_error: "Enter a valid quantity." }).positive("Quantity must be greater than zero."),
  productPrice: z.coerce
    .number({ required_error: "Enter a valid price." })
    .positive("Price must be greater than zero."),
  discountPercentage: z
    .union([
      z.coerce.number().positive("Discount percentage must be greater than zero."),
      z.undefined(),
      z.null(),
    ])
    .optional(),
  categoryId: z
    .string({ required_error: "Please select a category." })
    .trim()
    .min(1, "Please select a category."),
  productImage: z.custom<File>(
    (value) => typeof File !== "undefined" && value instanceof File,
    { message: "Please upload a product image." }
  ),
  hasDiscount: z.boolean({ required_error: "Please select a discount status." }).default(false),
  isFeatured: z.boolean({ required_error: "Please select a feature status." }).default(false),
  isOffer: z.boolean({ required_error: "Please select a offer status." }).default(false),
}); 

export { ProductFormSchema };
