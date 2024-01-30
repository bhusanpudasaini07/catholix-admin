import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

import { ChangePasswordSchema } from "@/schema/auth-schema/change-password-schema";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";

import { passwordImages } from "@/shared/lib/image-config";

import PasswordInput from "@/shared/components/password-input";

import { IChangePassFormInput } from "@/interface/auth-interface";
import { changePassword } from "@/services/auth/auth-service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { clearCookie } from "@/shared/utils/utils";

const ChangePasswordForm = () => {
  const router = useRouter();
  const form = useForm<IChangePassFormInput>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      router.push("/profile");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });

  const onSubmit: SubmitHandler<IChangePassFormInput> = (data) => {
    changePasswordMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6">
          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">Old Password</FormLabel>
                <div className="flex items-center border rounded-lg px-4 py-2">
                  <Image
                    alt="passwordLock"
                    src={passwordImages?.passwordLock}
                    width={24}
                    height={24}
                    quality={100}
                  />
                  <PasswordInput placeholder="Your Old Password" {...field} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
                  <PasswordInput placeholder="Your New Password" {...field} />
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
                  <PasswordInput
                    placeholder="Your Confirm Password"
                    {...field}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => router.push("/profile")}
            type="button"
            variant={"secondary"}
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            disabled={changePasswordMutation.isLoading}
          >
            Change Password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
