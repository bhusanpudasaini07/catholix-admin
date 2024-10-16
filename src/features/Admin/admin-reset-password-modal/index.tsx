import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { IResetPasswordFormInput } from "@/interface/auth-interface";
import { ResetPasswordSchema } from "@/schema/auth-schema/reset-password-schema";
import { changeAdminPassword } from "@/services/admin/admin-service";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shared/components/ui/dialog";
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
import PasswordInput from "@/shared/components/password-input";

interface IProps {
  name: string;
  id: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const AdminResetPasswordModal = ({ name, id, open, setOpen }: IProps) => {
  const form = useForm<IResetPasswordFormInput>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  //FUNCTIONS
  const resetUserPasswordMutation = useMutation({
    mutationFn: (data: IResetPasswordFormInput) =>
      changeAdminPassword(id, data),
    onSuccess: () => {
      form.reset({ password: "", confirmPassword: "" });
      showToast(TOAST_TYPES.success, "Password reset successful");
      setOpen(false);
    },
    onError: (error: any) => {
      console.log(error);
      //   form.setValue("password", "");
      //   form.setValue("confirmPassword", "");
      //   showToast(TOAST_TYPES.error, error?.message || SOMETHING_WENT_WRONG);
    },
  });

  const onSubmit: SubmitHandler<IResetPasswordFormInput> = (data) => {
    const payload: any = {
      ...data,
    };
    resetUserPasswordMutation.mutate(payload);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>Reset Password - {name}</DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">
                        New Password
                      </FormLabel>
                      <FormControl>
                        {/* <Input
                          type="password"
                          className="placeholder:text-gray-270"
                          placeholder="New Password"
                          {...field}
                        /> */}
                        <PasswordInput placeholder="New Password" {...field} />
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
                        {/* <Input
                          type="password"
                          className="placeholder:text-gray-270"
                          placeholder="Confirm Password"
                          {...field}
                        /> */}
                        <PasswordInput
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-2 items-center mt-9">
              <Button
                size={"base"}
                disabled={resetUserPasswordMutation.isLoading}
                loading={resetUserPasswordMutation.isLoading}
              >
                Update
              </Button>

              <Button
                type="button"
                onClick={() => {
                  setOpen(false);
                  form.reset({} as IResetPasswordFormInput);
                }}
                variant={"secondary"}
                size={"base"}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminResetPasswordModal;
