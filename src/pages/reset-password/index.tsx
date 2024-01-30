import React from "react";
import { NextPageWithLayout } from "../_app";
import AuthLayout from "@/shared/auth-layout";
import { Lock } from "@/shared/lib/image-config";
import Image from "next/image";
import ResetPasswordForm from "@/features/Auth/reset-password-form";

const ResetPassword: NextPageWithLayout = () => {
  return (
    <>
      <h3 className="text-color text-4xl mb-7 text-center font-bold">
        Reset Password
      </h3>
      <div className="flex flex-col items-center justify-center gap-7 mb-7">
        <Image
          src={Lock}
          alt="Lock Image"
          className="m-auto"
          quality={100}
          width={68}
          height={80}
        />
      </div>

      {/* Reset Password form here */}
      <ResetPasswordForm />
    </>
  );
};

export default ResetPassword;

ResetPassword.getLayout = (page) => {
  return <AuthLayout title="Reset Password">{page}</AuthLayout>;
};
