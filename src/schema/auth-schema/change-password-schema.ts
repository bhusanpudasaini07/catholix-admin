import * as z from "zod";
import { passwordFieldsValidation } from "../basic-schema";

export const ChangePasswordSchema = z
  .object({
    ...passwordFieldsValidation,
    current_password: z
      .string()
      .min(1, "Password is required.")
      .min(5, "Password must be atleast of 5 characters")
      .max(50, "Password must not exceed 50 characters."),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords doesn't match.",
    path: ["confirm_password"],
  });
