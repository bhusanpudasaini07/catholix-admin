import * as z from "zod";
import { basicFieldsValidation } from "../basic-schema";

export const ProfileSchema = z.object({
  firstName: basicFieldsValidation?.firstName,
  lastName: basicFieldsValidation?.lastName,
  email: basicFieldsValidation?.email,
  contact: z
    .string()
    .regex(/^[\+\-0-9 ]*$/, "Only numbers are allowed.")
    .regex(/^(|.{9,15})$/, "Phone number must be 9-15 digits")
    .optional()
    .nullable(),
  image: z.string().optional(),
});
