import { z } from "zod";

export const PurchaseOrderSchema = z.object({
  vendor_id: z.string().min(1, {
    message: "Vendor is required.",
  }),
  po_number: z
    .string()
    .min(1, {
      message: "PO number is required.",
    })
    .max(20, {
      message: "PO number must not be longer than 20 characters.",
    }),
  po_amount: z
    .string()
    .min(1, {
      message: "PO amount is required.",
    })
    .max(20, { message: "PO amount must not be longer than 20 characters." })
    .regex(/^[0-9]*\.?[0-9]*$/, "Bill count must contain only numbers."),
  po_received_date: z.date({
    required_error: "PO received date is required.",
  }),
  po_net: z
    .string()
    .max(20, {
      message: "PO net must not be longer than 20 characters",
    })
    .optional()
    .nullable(),
});
