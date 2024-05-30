import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { IResetPasswordFormInput } from "@/interface/auth-interface";
import { ResetPasswordSchema } from "@/schema/auth-schema/reset-password-schema";
import { forgotPassword, resetPassword } from "@/services/auth/auth-service";
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
import { zodResolver } from "@hookform/resolvers/zod";

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
      // showToast(TOAST_TYPES.success, "Logged in Successfully.");
      // router.push("/");
    },
    onError: (error: any) => {
      // showToast(TOAST_TYPES.error, error[0]?.detail || SOMETHING_WENT_WRONG);
    },
  });

  const onSubmit: SubmitHandler<IResetPasswordFormInput> = (data) => {
    const payload = {
      ...data,
    };
    // resetPasswordMutation.mutate(payload);
    router.push("/");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="mb-6">
          <FormField
            control={form.control}
            name="new_password"
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
        <div className="mb-6">
          <FormField
            control={form.control}
            name="confirm_password"
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

        <div className="flex justify-between items-center">
          {/* <div className="flex items-center space-x-2">
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
            </div> */}

          <Link
            href={"/login"}
            className="text-sm font-semibold text-gray-600 hover:text-primary"
          >
            Back
          </Link>
        </div>

        <Button
          size={"lg"}
          disabled={resetPasswordMutation.isLoading}
          className="mt-8 w-full"
        >
          {resetPasswordMutation.isLoading && <ButtonLoader className="mr-3" />}
          Reset Password
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
