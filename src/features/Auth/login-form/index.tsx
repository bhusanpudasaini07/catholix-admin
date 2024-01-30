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

import { MessageInput, passwordImages } from "@/shared/lib/image-config";
import PasswordInput from "@/shared/components/password-input";

import { ILoginFormInput } from "@/interface/auth-interface";
import { login } from "@/services/auth/auth-service";
import { setCookie } from "cookies-next";

// CONSTANTS
const { SOMETHING_WENT_WRONG } = constants.messages;
const { LOGGED_IN_KEY } = config;

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
      setLoggedInState(true);
      setCookie(LOGGED_IN_KEY, true);
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
      grant_type: "",
      scope: "",
      client_id: "",
      client_secret: "",
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
                <FormLabel className="font-normal">Email</FormLabel>
                <div className="flex items-center border rounded-lg px-4 py-2">
                  <Image
                    alt="passwordLock"
                    src={MessageInput}
                    width={24}
                    height={24}
                    quality={100}
                  />
                  <FormControl>
                    <Input
                      className="placeholder:text-gray-270 text-color border-0 h-auto px-2"
                      placeholder="Your Email"
                      {...field}
                    />
                  </FormControl>
                </div>
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
                <div className="flex items-center border rounded-lg px-4 py-2">
                  <Image
                    alt="passwordLock"
                    src={passwordImages?.passwordLock}
                    width={24}
                    height={24}
                    quality={100}
                  />
                  <PasswordInput placeholder="Your Password" {...field} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-6 text-right">
          <Link
            href={"/forgot-password"}
            className="text-gray-260 text-xs uppercase font-semibold hover:text-primary"
          >
            Forgot Password?
          </Link>
        </div>
        <Button disabled={loginMutation.isLoading} className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
