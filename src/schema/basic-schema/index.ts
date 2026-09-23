import { z } from "zod";
const basicFieldsValidation = {
  categoryName: z
    .string({ required_error: "Firstname is required." })
    .min(1, "First name is required.")
    .max(16, "First name must not exceed 16 characters.")
    .refine((value) => !value.startsWith(" "), {
      message: "First name cannot start with a space",
    }),
  firstName: z
    .string({ required_error: "Firstname is required." })
    .min(1, "First name is required.")
    .max(16, "First name must not exceed 16 characters.")
    .refine((value) => !value.startsWith(" "), {
      message: "First name cannot start with a space",
    }),
  lastName: z
    .string({ required_error: "Lastname is required." })
    .min(1, "Last name is required.")
    .max(16, "Last name must not exceed 16 characters.")
    .refine((value) => !value.startsWith(" "), {
      message: "Last name cannot start with a space",
    }),
  contact: z
    .string({ required_error: "Contact number is required." })
    .min(9, "Mobile number must be atleast 9 numbers.")
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
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters.")
    .max(50, "Password must not exceed 50 characters.")
    .refine(
      (password) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/.test(
          password
        ),
      "Password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
    ),
  confirmPassword: z
    .string({ required_error: "Confirm password is required." })
    .min(1, "Confirm password is required."),
};

export { basicFieldsValidation, passwordFieldsValidation };
