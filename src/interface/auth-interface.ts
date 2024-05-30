import { ForgotPasswordSchema } from "@/schema/auth-schema/forgot-password-schema";
import { LoginSchema } from "@/schema/auth-schema/login-schema";
import { ResetPasswordSchema } from "@/schema/auth-schema/reset-password-schema";
import { z } from "zod";

// Login Interface
export interface ILoginFormInput extends z.infer<typeof LoginSchema> {}
export interface IForgotPasswordFormInput
  extends z.infer<typeof ForgotPasswordSchema> {}
export interface IResetPasswordFormInput
  extends z.infer<typeof ResetPasswordSchema> {}
