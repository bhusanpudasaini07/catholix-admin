import * as z from "zod";
import { basicFieldsValidation } from "../basic-schema";

export const OrganizationSchema = z.object({
  name: z
    .string()
    .min(1, "Company name is required.")
    .max(50, "Company name must not exceed 50 characters."),

  business_address: z
    .string()
    .max(255, "Address must not exceed 255 characters")
    .optional()
    .nullable(),

  suite: z
    .string()
    .max(50, "Suite must not exceed 50 characters.")
    .optional()
    .nullable(),

  contact: z
    .string()
    .max(20, "Mobile number must not exceed 20 numbers.")
    .regex(/^[\+\-0-9 ]*$/, "Only numbers are allowed.")
    .optional()
    .nullable(),
  first_name: z
    .string()
    .max(50, "Firstname must not exceed 50 characters.")
    .optional()
    .nullable(),
  last_name: z
    .string()
    .max(50, "Lastname must not exceed 50 characters.")
    .optional()
    .nullable(),
  email: basicFieldsValidation.email,

  legal_business_name: z
    .string()
    .max(50, "Legal Business Name must not exceed 50 characters.")
    .optional()
    .nullable(),

  legal_business_address: z
    .string()
    .max(255, "Legal Business Address must not exceed 255 characters")
    .optional()
    .nullable(),

  tax_id_number: z
    .string()
    .max(50, "Tax Id must not exceed 50 characters.")
    .optional()
    .nullable(),
  tax_id_type: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
});
