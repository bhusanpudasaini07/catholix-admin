import { z } from "zod";

export const InvoiceSchema = z.object({
  project_id: z.string({
    required_error: "Please select a project",
  }),
  note: z
    .string()
    .max(1000, {
      message: "Note must not exceed 1000 characters",
    })
    .optional()
    .nullable(),
});
