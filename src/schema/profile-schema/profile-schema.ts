import * as z from "zod";
import { basicFieldsValidation } from "../basic-schema";

export const ProfileSchema = z.object({
  firstName: basicFieldsValidation?.firstName,
  lastName: basicFieldsValidation?.lastName,
  email: basicFieldsValidation?.email,
  contact: z
    .string()
    .max(20, "Mobile number must not exceed 20 numbers.")
    .regex(/^[\+\-0-9 ]*$/, "Only numbers are allowed.")
    .optional(),
  image: z.string().optional(),
});
