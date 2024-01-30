import * as z from "zod";
import { passwordFieldsValidation } from "../basic-schema";

export const ResetPasswordSchema = z
  .object({ ...passwordFieldsValidation })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords doesn't match.",
    path: ["confirm_password"],
  });
