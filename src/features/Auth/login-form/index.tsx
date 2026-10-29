import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { constants } from "@/constants";

import { LoginSchema } from "@/schema/auth-schema/login-schema";
import { login } from "@/services/auth/auth-service";
import ButtonLoader from "@/shared/components/loader/button-loader";
import PasswordInput from "@/shared/components/password-input";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { setAuthCookies } from "@/shared/utils/cookie-utils";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useLoggedInStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import appConfig from "../../../../config";

// CONSTANTS
const { SOMETHING_WENT_WRONG } = constants.messages;
const { LOGGED_IN_KEY, REMEMBER_ME } = appConfig;

const LoginForm = () => {
  const router = useRouter();
  const { setLoggedInState } = useLoggedInStore();

  const form = useForm<any>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  //FUNCTIONS
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      form.reset();
      setCookie(LOGGED_IN_KEY, true, { maxAge: 60 * 60 * 24 });
      setLoggedInState(true);
      showToast(TOAST_TYPES.success, "Logged in Successfully.");
      router.push("/");
    },
    onError: (error: any) => {
      if (error?.statusCode === 401) {
        form.setError("password", { message: error?.message });
      } else {
        showToast(TOAST_TYPES.error, error?.message || SOMETHING_WENT_WRONG);
      }
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    const payload = {
      ...data,
    };
    loginMutation.mutate(payload);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="mb-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">
                  Email
                  <span className="ml-1 text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-gray-270"
                    placeholder="admin@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">
                  Password
                  <span className="ml-1 text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  {/* <Input
                    className="placeholder:text-gray-270"
                    placeholder="Your Password"
                    type="password"
                    {...field}
                  /> */}
                  <PasswordInput placeholder="Your Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <Button
          size={"lg"}
          disabled={loginMutation.isLoading}
          className="mt-8 w-full"
          loading={loginMutation.isLoading}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
