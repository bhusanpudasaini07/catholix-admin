import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { IChangePasswordFormInput } from "@/interface/auth-interface";
import { ChangePasswordSchema } from "@/schema/auth-schema/change-password-schema";
import { changePassword } from "@/services/auth/auth-service";
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

const { SOMETHING_WENT_WRONG } = constants.messages;

const ChangePasswordContent = () => {
  const form = useForm<IChangePasswordFormInput>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  //FUNCTIONS
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      form.reset({ oldPassword: "", confirmPassword: "", password: "" });
      showToast(TOAST_TYPES.success, "Password updated Successfully");
    },
    onError: (error: any) => {
      form.reset({ oldPassword: "", confirmPassword: "", password: "" });
      form.setError("oldPassword", { message: error.message });
      // showToast(TOAST_TYPES.error, error.message || SOMETHING_WENT_WRONG);
    },
  });

  const onSubmit: SubmitHandler<IChangePasswordFormInput> = (data) => {
    const payload = {
      ...data,
    };
    changePasswordMutation.mutate(payload);
  };

  const cancelHandler = () => {
    form.reset({
      oldPassword: "",
      confirmPassword: "",
      password: "",
    });
  };
  return (
    <div className="flex p-6 w-[360px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          className="w-full"
        >
          <div className="mb-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Old Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="placeholder:text-gray-270"
                      placeholder="Old Password"
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
                  <FormLabel className="font-normal">New Password</FormLabel>
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
          <div className="flex gap-2 items-center mt-9">
            <Button size={"md"} disabled={changePasswordMutation.isLoading}>
              {changePasswordMutation.isLoading && (
                <ButtonLoader className="mr-3" />
              )}
              Update
            </Button>
            <Button
              onClick={cancelHandler}
              type="button"
              size={"md"}
              variant={"secondary"}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordContent;
