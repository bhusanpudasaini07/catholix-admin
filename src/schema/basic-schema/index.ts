import { z } from "zod";
const basicFieldsValidation = {
  firstName: z
    .string({ required_error: "Firstname is required." })
    .min(1, "Firstname is required.")
    .max(15, "Firstname must not exceed 50 characters."),
  lastName: z
    .string({ required_error: "Lastname is required." })
    .min(1, "Lastname is required.")
    .max(15, "Lastname must not exceed 50 characters."),
  contact: z
    .string({ required_error: "Contact number is required." })
    .min(1, "Contact number is required.")
    .max(15, "Contact number must not exceed 20 numbers.")
    .regex(/^[\+\-0-9 ]*$/, "Only numbers are allowed."),

  // .regex(/^[0-9]+$/, "Phone number must contain only numbers."),

  // address: z
  //   .string()
  //   .min(1, "Adress is required.")
  //   .max(100, "Address must not exceed 100 characters"),
  email: z
    .string({ required_error: "Email is required." })
    .email("Please enter a valid email address.")
    .min(1, "Email is required.")
    .max(50, "Email must not exceed 50 characters."),
};

const passwordFieldsValidation = {
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(50, "Password must not exceed 50 characters.")
    .refine(
      (password) => /[a-z]/.test(password),
      "Password must contain at least one lowercase character."
    )
    .refine(
      (password) => /[A-Z]/.test(password),
      "Password must contain at least one uppercase character."
    )
    .refine(
      (password) => /[0-9]/.test(password),
      "Password must contain at least one number."
    )
    .refine(
      (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
      "Password must contain at least one special character."
    ),
  confirmPassword: z.string().min(1, "Confirm password is required."),
};

export { basicFieldsValidation, passwordFieldsValidation };
