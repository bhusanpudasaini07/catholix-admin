import { z } from "zod";

const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .min(1, "Email is required.")
    .max(50, "Email must not exceed 50 characters.")
    .regex(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Invalid email format."
    ),
});

export { ForgotPasswordSchema };
