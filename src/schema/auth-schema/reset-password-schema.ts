import { z } from "zod";
import { passwordFieldsValidation } from "../basic-schema";

const ResetPasswordSchema = z
  .object({ ...passwordFieldsValidation })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match.",
    path: ["confirmPassword"],
  });

export { ResetPasswordSchema };
