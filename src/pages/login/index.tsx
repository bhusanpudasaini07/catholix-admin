import React from "react";
import { NextPageWithLayout } from "../_app";
import AuthLayout from "@/shared/auth-layout";
import LoginForm from "@/features/Auth/login-form";
import { title } from "process";

const Login: NextPageWithLayout = () => {
  return (
    <>
      <h3 className="text-color text-4xl mb-12 text-center font-bold">Login</h3>
      <LoginForm />
    </>
  );
};

export default Login;

Login.getLayout = (page) => {
  return <AuthLayout title="Login">{page}</AuthLayout>;
};
