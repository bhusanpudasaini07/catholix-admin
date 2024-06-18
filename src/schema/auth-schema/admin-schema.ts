import { z } from "zod";
import { basicFieldsValidation } from "../basic-schema";

const AdminFormSchema = z.object({
  firstName: basicFieldsValidation?.firstName,
  lastName: basicFieldsValidation?.lastName,
  email: basicFieldsValidation?.email,
  contact: z
    .string({ required_error: "Phone number is required." })
    .min(1, "Phone number is required.")
    .max(15, "Phone number must not exceed 20 numbers.")
    .regex(/^[\+\-0-9 ]*$/, "Only numbers are allowed."),
  status: z.boolean().default(false),
  roleId: z.string({ required_error: "Role is required." }),
  regionId: z.string({ required_error: "Region is required." }),
  stateId: z.string().optional().nullable(),
  localGovId: z.array(z.string()).optional().nullable(),
});

export { AdminFormSchema };
