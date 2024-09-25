import { z } from "zod";
import { basicFieldsValidation } from "../basic-schema";

const AdminFormSchema = z.object({
  firstName: basicFieldsValidation.firstName,
  lastName: basicFieldsValidation.lastName,
  email: basicFieldsValidation.email,
  contact: z
    .string()
    .regex(/^[\+\-0-9 ]*$/, "Only numbers are allowed.")
    .regex(/^(|.{9,15})$/, "Phone number must be 9-15 digits")
    .optional()
    .nullable(),
  status: z.boolean().default(true),
  roleId: z.string({ required_error: "Role is required." }),
  regionId: z.string({ required_error: "Region is required." }),
  stateId: z.string().optional().nullable(),
  localGovId: z.array(z.string()).optional().nullable(),
});

export { AdminFormSchema };
