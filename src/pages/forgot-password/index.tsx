import React from "react";
import { NextPageWithLayout } from "../_app";
import Image from "next/image";

import AuthLayout from "@/shared/auth-layout";
import ForgotPasswordForm from "@/features/Auth/forgot-password-form";
import { Lock } from "@/shared/lib/image-config";
import Link from "next/link";

const ForgotPassword: NextPageWithLayout = () => {
  return (
    <>
      <h3 className="text-color text-4xl mb-7 text-center font-bold">
        Forgot Password?
      </h3>
      <div className="flex flex-col items-center justify-center gap-7 mb-7">
        <Image
          src={Lock}
          alt="Lock Image"
          className="m-auto"
          quality={100}
          width={100}
          height={120}
        />
        <p className="font-semibold text-color max-w-[250px] text-center">
          We&#39;ll Send You an Email to Reset Your Password
        </p>
      </div>

      {/* Forgot password form here */}
      <ForgotPasswordForm />

      <div className="text-center mt-7">
        <Link
          href={"/login"}
          className="text-xs uppercase font-semibold text-primary hover:text-gray-270"
        >
          Back To Login
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;

ForgotPassword.getLayout = (page) => {
  return <AuthLayout title="Forgot Password">{page}</AuthLayout>;
};
