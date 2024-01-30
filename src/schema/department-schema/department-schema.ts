import * as z from "zod";

export const DepartmentSchema = z.object({
  name: z
    .string()
    .min(1, "Department name is required.")
    .max(50, "Department name must not exceed 50 characters."),
  code: z
    .string()
    .min(1, "Department code is required.")
    .max(50, "Department code must not exceed 50 characters."),

  parent_id: z.string().optional().nullable(),
  department_head: z
    .string()
    .max(50, "Department Head must not exceed 50 characters.")
    .optional()
    .nullable(),

  department_members: z
    .array(
      z.object({
        email: z.string().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
});
