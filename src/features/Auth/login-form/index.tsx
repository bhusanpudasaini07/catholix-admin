import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { constants } from "@/constants";
import { ILoginFormInput } from "@/interface/auth-interface";
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

import config from "../../../../config";

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
    // loginMutation.mutate(payload);
    router.push("/");
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

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              variant="primary"
              id="terms"
              onCheckedChange={(e) => setCookie("rememberMe", e)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium cursor-pointer text-zinc-700"
            >
              Remember Me
            </label>
          </div>

          <Link
            href={"/login"}
            className="text-sm font-semibold text-gray-600 hover:text-primary"
          >
            Forgot Password?
          </Link>
        </div>

        <Button disabled={loginMutation.isLoading} className="mt-8 w-full">
          {loginMutation.isLoading && <ButtonLoader className="mr-3" />}
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
