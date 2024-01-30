import { z } from "zod";
import { basicFieldsValidation } from "../basic-schema";

export const VendorFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Vendor name is required" })
    .max(50, { message: "Vendor name must not be longer than 50 characters" }),
  vendor_id: z
    .string()
    .min(1, { message: "Vendor Id is required" })
    .max(50, { message: "Vendor Id must not be longer than 50 characters" }),

  primary_email: basicFieldsValidation.email,

  account_number: z
    .string()
    .max(20, "Account number must not exceed 20 characters")
    .optional()
    .nullable(),

  country: z
    .string()
    .max(50, { message: "Country must not exceeed 50 characters" })
    .optional()
    .nullable(),

  city: z
    .string()
    .max(50, { message: "City must not exceeed 50 characters" })
    .optional()
    .nullable(),

  address_line_1: z
    .string()
    .max(255, { message: "Address 1 must not exceeed 255 characters" })
    .optional()
    .nullable(),

  address_line_2: z
    .string()
    .max(255, { message: "Address 2 must not exceeed 255 characters" })
    .optional()
    .nullable(),

  state: z
    .string()
    .max(50, { message: "State must not exceeed 50 characters" })
    .optional()
    .nullable(),

  zip_code: z
    .string()
    .max(50, { message: "Zip code must not exceeed 50 characters" })
    .optional()
    .nullable(),

  contact_person_first_name: z
    .string()
    .max(50, "Firstname must not exceed 50 characters.")
    .optional()
    .nullable(),

  contact_person_last_name: z
    .string()
    .max(50, "Lastname must not exceed 50 characters.")
    .optional()
    .nullable(),

  contact_person_email: z
    .string()
    .max(50, "Email must not exceed 50 characters.")
    .regex(
      /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com))?$/,
      "Please enter a valid email address."
    )
    .optional()
    .nullable(),

  contact_person_phone_number: z
    .string()
    .max(20, "Contact number must not exceed 20 numbers.")
    .regex(/^[\+\-0-9 ]*$/, "Only numbers are allowed.")
    .optional()
    .nullable(),

  description: z
    .string()
    .max(1000, { message: "Description must not exceeed 1000 characters" })
    .optional()
    .nullable(),

  tax_id: z
    .string()
    .max(50, {
      message: "Tax id must not exceeed 50 characters",
    })
    .optional()
    .nullable(),

  company_name: z
    .string()
    .max(50, {
      message: "Company name must not exceeed 50 characters",
    })
    .optional()
    .nullable(),

  vendor_since: z.date().optional().nullable(),

  join_date: z.date().optional().nullable(),

  bank_details: z.array(
    z.object({
      name: z
        .string()
        .max(50, "Bank name must not exceed 50 characters")
        .optional()
        .nullable(),
      account_number: z
        .string()
        .max(20, "Account number must not exceed 20 characters")
        .optional()
        .nullable(),
      branch: z
        .string()
        .max(50, "Branch name must not exceed 50 characters")
        .optional()
        .nullable(),
      bank_contact_number: z
        .string()
        .max(20, "Contact number must not exceed 20 characters")
        .regex(/^[\+\-0-9 ]*$/, "Only numbers are allowed.")
        .optional()
        .nullable(),
    })
  ),
});
