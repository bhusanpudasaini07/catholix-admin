import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Please enter a valid email address." })
    .min(1, "Email is required.")
    .max(50, "Email must not exceed 50 characters."),

  password: z.string({ required_error: "Password is required." }).min(1, {
    message: "Password is required.",
  }),
  remember: z.boolean().default(false).optional(),
});

export { LoginSchema };
