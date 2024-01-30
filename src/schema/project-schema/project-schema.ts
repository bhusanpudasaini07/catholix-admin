import * as z from "zod";

export const ProjectSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Project name is required" })
    .max(50, { message: "Project name must not be longer than 50 characters" }),
  code: z
    .string()
    .min(1, {
      message: "Project code is required.",
    })
    .max(50, {
      message: "Project code must not be longer than 50 characters",
    }),
  start_date: z.date().optional().nullable(),
  end_date: z.date().optional().nullable(),
  status: z.string().min(1, {
    message: "Status is required.",
  }),

  bill_count: z
    .string()
    .regex(/^[0-9]+$/, "Bill count must contain only numbers.")
    .max(20, {
      message: "Bill count must not be longer than 20 characters",
    })
    .optional()
    .nullable(),
  bill_amount: z
    .string()
    .regex(/^[0-9]*\.?[0-9]*$/, "Budget estimate must contain only numbers.")
    .max(20, {
      message: "Budget estimate must not be longer than 20 characters",
    })
    .optional()
    .nullable(),

  description: z
    .string()
    .max(1000, {
      message: "Project description must not exceed 1000 characters",
    })
    .optional()
    .nullable(),
  purposes: z.string().optional().nullable(),
  pag: z
    .string()
    .max(50, {
      message: "PAG must not exceed 50 characters",
    })
    .optional()
    .nullable(),
  project_manager: z
    .string()
    .max(50, {
      message: "Project manager must not exceed 50 characters",
    })
    .optional()
    .nullable(),
  project_members: z
    .array(
      z.object({
        email: z.string().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
});
