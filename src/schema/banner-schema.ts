import { z } from "zod";

const BannerFormSchema = z.object({
  title: z
    .string({ required_error: "Banner title is required." })
    .trim()
    .min(1, "Banner title is required.")
    .max(100, "Banner title must not exceed 100 characters."),
  description: z.string().optional(),
  isPublished: z.boolean().default(false),
  banner: z.custom<File>(
    (value) => typeof File !== "undefined" && value instanceof File,
    { message: "Please upload a banner image." }
  ),
});

export { BannerFormSchema };
