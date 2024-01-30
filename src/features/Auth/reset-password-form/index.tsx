import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetPasswordSchema } from "@/schema/auth-schema/reset-password-schema";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import { passwordImages } from "@/shared/lib/image-config";
import PasswordInput from "@/shared/components/password-input";
import { IResetPassFormInput } from "@/interface/auth-interface";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { resetPassword } from "@/services/auth/auth-service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

const ResetPasswordForm = () => {
  const router = useRouter();

  const form = useForm<IResetPassFormInput>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Functions
  const resetPassMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      form.reset();
      showToast(TOAST_TYPES.success, data?.data?.message);
      router.push("/login");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
      router?.push("/login");
    },
  });

  const onSubmit: SubmitHandler<IResetPassFormInput> = (data) => {
    const payload = {
      token: router?.query.access_token,
      code: router?.query.otp,
      ...data,
    };
    resetPassMutation.mutate(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6">
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">New Password</FormLabel>
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
        <div className="mb-6">
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">Confirm Password</FormLabel>
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
        <Button disabled={resetPassMutation.isLoading} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
