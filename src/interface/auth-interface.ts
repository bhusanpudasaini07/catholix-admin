import { LoginSchema } from "@/schema/auth-schema/login-schema";
import { z } from "zod";

// Login Interface
export interface ILoginFormInput extends z.infer<typeof LoginSchema> {}
