import { z } from "zod";

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .max(50, "Email must not exceed 50 characters."),
});

export { ForgotPasswordSchema };
