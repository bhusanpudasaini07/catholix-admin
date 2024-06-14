import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { constants } from "@/constants";
import { IResetPasswordFormInput } from "@/interface/auth-interface";
import { ResetPasswordSchema } from "@/schema/auth-schema/reset-password-schema";
import { resetPassword } from "@/services/auth/auth-service";
import ButtonLoader from "@/shared/components/loader/button-loader";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const { SOMETHING_WENT_WRONG } = constants.messages;

const ResetPasswordForm = () => {
  const router = useRouter();
  const form = useForm<IResetPasswordFormInput>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  //FUNCTIONS
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      form.reset();
      showToast(TOAST_TYPES.success, "Password reset successful");
      router.push("/login");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.message || SOMETHING_WENT_WRONG);
      router.push("/login");
    },
  });

  const onSubmit: SubmitHandler<IResetPasswordFormInput> = (data) => {
    const payload = {
      ...data,
      token: router.query.token,
    };
    resetPasswordMutation.mutate(payload);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="mb-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">
                  New Password
                  <span className="ml-1 text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="placeholder:text-gray-270"
                    placeholder="New Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">
                  Confirm Password
                  <span className="ml-1 text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="placeholder:text-gray-270"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          size={"lg"}
          disabled={resetPasswordMutation.isLoading}
          className="mt-8 w-full"
        >
          {resetPasswordMutation.isLoading && <ButtonLoader className="mr-3" />}
          Reset Password
        </Button>

        <div className="pt-6 mt-6 text-center border-t border-black border-opacity-10">
          <p className="mb-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </p>
          {/* <Button
            type="button"
            variant={"secondary"}
            size={"lg"}
            onClick={() => router.push("/login")}
            className="w-full"
          >
            Login
          </Button> */}
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
