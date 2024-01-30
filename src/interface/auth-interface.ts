import { ChangePasswordSchema } from "@/schema/auth-schema/change-password-schema";
import { ForgotPasswordSchema } from "@/schema/auth-schema/forgot-password-schema";
import { LoginSchema } from "@/schema/auth-schema/login-schema";
import { ResetPasswordSchema } from "@/schema/auth-schema/reset-password-schema";
import { z } from "zod";

// Login Interface
export interface ILoginFormInput extends z.infer<typeof LoginSchema> {}

// Forgot Password interface
export interface IForgotPassFormInput
  extends z.infer<typeof ForgotPasswordSchema> {}

//   Reset Password Interface

export interface IResetPassFormInput
  extends z.infer<typeof ResetPasswordSchema> {}

export interface IChangePassFormInput
  extends z.infer<typeof ChangePasswordSchema> {}
