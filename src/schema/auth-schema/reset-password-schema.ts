import { z } from "zod";
import { passwordFieldsValidation } from "../basic-schema";

const ResetPasswordSchema = z
  .object({ ...passwordFieldsValidation })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords doesn't match.",
    path: ["confirm_password"],
  });

export { ResetPasswordSchema };
