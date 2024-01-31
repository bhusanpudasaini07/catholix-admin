import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

import { LoginSchema } from "@/schema/auth-schema/login-schema";
import { useLoggedInStore } from "@/store/auth-store";

import { constants } from "@/constants";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import config from "../../../../config";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

import PasswordInput from "@/shared/components/password-input";

import { ILoginFormInput } from "@/interface/auth-interface";
import { login } from "@/services/auth/auth-service";
import { setAuthCookies } from "@/shared/utils/cookie-utils";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { setCookie } from "cookies-next";
import ButtonLoader from "@/shared/components/loader/button-loader";

// CONSTANTS
const { SOMETHING_WENT_WRONG } = constants.messages;

const LoginForm = () => {
  const router = useRouter();
  const { setLoggedInState } = useLoggedInStore();

  const form = useForm<ILoginFormInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  //FUNCTIONS
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      form.reset();
      setAuthCookies(data?.data);
      setLoggedInState(true);
      showToast(TOAST_TYPES.success, "Logged in Successfully.");
      router.push("/");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail || SOMETHING_WENT_WRONG);
    },
  });

  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">Username</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-gray-270"
                    placeholder="Your Username"
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
                <FormLabel className="font-normal">Password</FormLabel>
                <PasswordInput placeholder="Your Password" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            variant="primary"
            id="terms"
            onCheckedChange={(e) => setCookie("rememberMe", e)}
          />
          <label htmlFor="terms" className="text-zinc-700 text-sm font-medium">
            Remember Me
          </label>
        </div>

        <Button disabled={loginMutation.isLoading} className="w-full mt-8">
          {loginMutation.isLoading && <ButtonLoader className="mr-3" />}
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
