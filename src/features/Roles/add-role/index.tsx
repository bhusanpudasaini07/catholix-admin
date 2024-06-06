import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RoleForm from "../role-form";

const CreateRoleContent = () => {
  const form = useForm({
    // resolver: zodResolver(''),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <RoleForm form={form} />
      </form>
    </Form>
  );
};

export default CreateRoleContent;
