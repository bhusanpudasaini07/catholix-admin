import * as z from "zod";
import { basicFieldsValidation } from "../basic-schema";

export const ProfileSchema = z.object({
  first_name: basicFieldsValidation?.first_name,
  last_name: basicFieldsValidation?.last_name,
  email: basicFieldsValidation?.email,
  mobile_number: z
    .string()
    .max(20, "Mobile number must not exceed 20 numbers.")
    .regex(/^[\+\-0-9 ]*$/, "Only numbers are allowed.")
    .optional(),
  image: z.string().optional(),
  address: z.string().optional(),
});
