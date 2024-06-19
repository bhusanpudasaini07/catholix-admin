import * as z from "zod";
import { basicFieldsValidation } from "../basic-schema";

export const ProfileSchema = z.object({
  firstName: basicFieldsValidation?.firstName,
  lastName: basicFieldsValidation?.lastName,
  email: basicFieldsValidation?.email,
  contact: z
    .string()
    .min(9, "Mobile number must be atleast 9 numbers.")
    .max(15, "Mobile number must not exceed 15 numbers.")
    .regex(/^[\+\-0-9 ]*$/, "Only numbers are allowed.")
    .optional(),
  image: z.string().optional(),
});
