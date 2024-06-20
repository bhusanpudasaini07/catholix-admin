import { z } from "zod";

const RoleSchema = z.object({
  name: z
    .string({ required_error: "Role Name is required" })
    .min(1, "Role Name is required")
    .max(32, "Role Name must be less than 32 characters"),
  // description: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

export { RoleSchema };
