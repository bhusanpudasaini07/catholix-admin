import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Image from "next/image";
import { useMutation } from "react-query";

import { ForgotPasswordSchema } from "@/schema/auth-schema/forgot-password-schema";

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

import { MessageInput } from "@/shared/lib/image-config";

import { IForgotPassFormInput } from "@/interface/auth-interface";
import { forgotPassword } from "@/services/auth/auth-service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const form = useForm<IForgotPassFormInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Functions
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data: any) => {
      form.reset();
      showToast(TOAST_TYPES.success, data?.data?.message);
      router.push(`/email-sent?email=${data?.data?.email}`);
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });

  const onSubmit: SubmitHandler<IForgotPassFormInput> = (data) => {
    forgotPasswordMutation.mutate(data);
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
        <Button disabled={forgotPasswordMutation.isLoading} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
