import Image from 'next/image';
import React from 'react';

import LoginForm from '@/features/Auth/login-form';
import AuthLayout from '@/shared/auth-layout';
import { loginImg } from '@/shared/lib/image-config';

import { NextPageWithLayout } from '../_app';

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
