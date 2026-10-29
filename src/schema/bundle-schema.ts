import { z } from "zod";

const bundleItemSchema = z.object({
  productId: z.coerce
    .number({ invalid_type_error: "Select a product." })
    .int()
    .min(1, "Select a product."),
  quantity: z.coerce
    .number({ invalid_type_error: "Enter a quantity." })
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1."),
});

const BundleFormSchema = z
  .object({
    name: z
      .string({ required_error: "Bundle name is required." })
      .trim()
      .min(1, "Bundle name is required.")
      .max(255, "Bundle name must not exceed 255 characters."),
    description: z.string().optional(),
    fixedPrice: z.coerce
      .number({
        required_error: "Price is required.",
        invalid_type_error: "Enter a valid price.",
      })
      .min(0, "Price cannot be negative."),
    imageUrl: z.string().trim().optional(),
    stockQuantity: z.coerce
      .number({
        required_error: "Stock is required.",
        invalid_type_error: "Enter a valid stock quantity.",
      })
      .int("Stock must be a whole number.")
      .min(0, "Stock cannot be negative."),
    status: z.enum(["draft", "active", "inactive"]).optional(),
    items: z.array(bundleItemSchema).min(1, "Add at least one product."),
  })
  .superRefine((data, ctx) => {
    const productIds = data.items.map((item) => item.productId);
    if (new Set(productIds).size !== productIds.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A product can only be added once.",
        path: ["items"],
      });
    }
  });

type BundleFormValues = z.infer<typeof BundleFormSchema>;

export { BundleFormSchema };
export type { BundleFormValues };
