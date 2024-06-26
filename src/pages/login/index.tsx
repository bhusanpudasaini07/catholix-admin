import React from "react";

import LoginForm from "@/features/Auth/login-form";
import AuthLayout from "@/shared/auth-layout";

import { NextPageWithLayout } from "../_app";

const Login: NextPageWithLayout = () => {
  return (
    <>
      <div className="my-9 w-full">
        <p className="text-2xl font-bold leading-10 text-zinc-800">
          Login to your Account
        </p>
        <p className="text-base text-zinc-500">
          See what is going on with your business
        </p>
      </div>
      <div className="w-full">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;

Login.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
