import { z } from "zod";
import { passwordFieldsValidation } from "../basic-schema";

export const ChangePasswordSchema = z
  .object({
    ...passwordFieldsValidation,
    oldPassword: z
      .string({
        required_error: "Old password is required.",
      })
      .min(1, "Password is required.")
      .min(5, "Password must be atleast of 5 characters")
      .max(50, "Password must not exceed 50 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match.",
    path: ["confirmPassword"],
  });
