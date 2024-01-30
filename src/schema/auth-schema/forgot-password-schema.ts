import * as z from "zod";
import { basicFieldsValidation } from "../basic-schema";

export const ForgotPasswordSchema = z.object({
  email: basicFieldsValidation.email,
});
