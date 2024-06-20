import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .min(1, "Email is required.")
    .max(50, "Email must not exceed 50 characters.")
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format."),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(1, "Password is required."),
  remember: z.boolean().default(false).optional(),
});

export { LoginSchema };
