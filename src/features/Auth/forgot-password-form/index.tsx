import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { IForgotPasswordFormInput } from "@/interface/auth-interface";
import { ForgotPasswordSchema } from "@/schema/auth-schema/forgot-password-schema";
import { forgotPassword } from "@/services/auth/auth-service";
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
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { constants } from "@/constants";
import Link from "next/link";

const { SOMETHING_WENT_WRONG } = constants.messages;

const ForgotPasswordForm = () => {
  const router = useRouter();
  const form = useForm<IForgotPasswordFormInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  //FUNCTIONS
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      form.reset();
      showToast(
        TOAST_TYPES.success,
        "Forgot-password link has been sent to you email"
      );
      router.push("/login");
    },
    onError: (error: any) => {
      if (error) {
        form.setError("email", { message: error?.message });
      } else {
        showToast(TOAST_TYPES.error, SOMETHING_WENT_WRONG);
      }
    },
  });

  const onSubmit: SubmitHandler<IForgotPasswordFormInput> = (data) => {
    const payload = {
      ...data,
    };
    forgotPasswordMutation.mutate(payload);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div>
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

        <Button
          size={"lg"}
          disabled={forgotPasswordMutation.isLoading}
          className="mt-8 w-full"
        >
          {forgotPasswordMutation.isLoading && (
            <ButtonLoader className="mr-3" />
          )}
          Submit
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
            onClick={() => router.push("/login")}
            className="w-full"
            size={"lg"}
          >
            Login
          </Button> */}
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
