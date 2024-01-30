import { z } from "zod";
import { basicFieldsValidation } from "../basic-schema";

const LoginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required.")
    .max(50, "Username must not exceed 50 characters."),
  password: z.string().min(1, {
    message: "Password is required.",
  }), 
});

export { LoginSchema };
