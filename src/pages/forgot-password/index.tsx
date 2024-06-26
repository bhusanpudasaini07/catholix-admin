import React from "react";

import ForgotPasswordForm from "@/features/Auth/forgot-password-form";
import AuthLayout from "@/shared/auth-layout";

import { NextPageWithLayout } from "../_app";

const ForgotPassword: NextPageWithLayout = () => {
  return (
    <>
      <div className="my-9 w-full">
        <p className="text-2xl font-bold leading-10 text-zinc-800">
          Reset your Password
        </p>
        <p className="text-base text-zinc-500">
          Get your instruction on your email
        </p>
      </div>

      <div className="w-full">
        <ForgotPasswordForm />
      </div>
    </>
  );
};

export default ForgotPassword;

ForgotPassword.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
