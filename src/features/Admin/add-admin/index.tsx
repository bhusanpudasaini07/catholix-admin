import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Form } from "@/shared/components/ui/form";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";

import AdminFormContent from "../form-content";

const AddAdminForm = () => {
  const form = useForm({
    // resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-xl font-bold text-zinc-900">Admins/Add Admin</h5>
          <div className="flex items-center px-4 py-2 space-x-2 rounded-lg bg-secondary">
            <Label htmlFor="user_status">User Status</Label>
            <Switch id="user_status" />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <AdminFormContent form={form} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddAdminForm;
