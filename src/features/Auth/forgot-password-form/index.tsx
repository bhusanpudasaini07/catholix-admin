import Link from "next/link";
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
      // showToast(TOAST_TYPES.success, "Logged in Successfully.");
      // router.push("/");
    },
    onError: (error: any) => {
      // showToast(TOAST_TYPES.error, error[0]?.detail || SOMETHING_WENT_WRONG);
    },
  });

  const onSubmit: SubmitHandler<IForgotPasswordFormInput> = (data) => {
    const payload = {
      ...data,
    };
    // forgotPasswordMutation.mutate(payload);
    router.push("/");
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
          disabled={forgotPasswordMutation.isLoading}
          className="mt-8 w-full"
        >
          {forgotPasswordMutation.isLoading && (
            <ButtonLoader className="mr-3" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
