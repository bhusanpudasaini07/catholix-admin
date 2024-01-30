import React from "react";
import { NextPageWithLayout } from "../_app";
import AuthLayout from "@/shared/auth-layout";
import LoginForm from "@/features/Auth/login-form";
import Image from "next/image";
import { loginImg } from "@/shared/lib/image-config";

const Login: NextPageWithLayout = () => {
  return (
    <div className="w-full">
      <LoginForm />
    </div>
  );
};

export default Login;

Login.getLayout = (page) => {
  return <AuthLayout title="Login">{page}</AuthLayout>;
};
