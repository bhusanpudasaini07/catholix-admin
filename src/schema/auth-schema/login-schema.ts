import { z } from "zod";
import { basicFieldsValidation } from "../basic-schema";

const LoginSchema = z.object({
  username: basicFieldsValidation.email,
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export { LoginSchema };
