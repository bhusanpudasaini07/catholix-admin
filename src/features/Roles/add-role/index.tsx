import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { constants } from "@/constants";
import { IRolesForm } from "@/interface/roles-interface";
import { RoleSchema } from "@/schema/auth-schema/role-schema";
import { addRole } from "@/services/roles/roles-service";
import { Form } from "@/shared/components/ui/form";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { zodResolver } from "@hookform/resolvers/zod";

import RoleForm from "../role-form";

const { SOMETHING_WENT_WRONG } = constants.messages;

const CreateRoleContent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<IRolesForm>({
    resolver: zodResolver(RoleSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const addRoleMutation = useMutation({
    mutationFn: addRole,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Role created successfully");
      queryClient.invalidateQueries("roles");
      router.push("/roles");
    },
    onError: (error: any) => {
      showToast(
        TOAST_TYPES.error,
        error?.message[0]?.errors[0] || SOMETHING_WENT_WRONG
      );
    },
  });

  const onSubmit: SubmitHandler<IRolesForm> = (data) => {
    const payload = {
      ...data,
      permissions: data?.permissions?.map((permission) => Number(permission)),
    };
    if (
      payload?.permissions?.length === 0 ||
      payload?.permissions === undefined
    ) {
      showToast(TOAST_TYPES.error, "Select at least one permission");
    } else {
      addRoleMutation.mutate(payload);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <RoleForm form={form} loading={addRoleMutation.isLoading} />
      </form>
    </Form>
  );
};

export default CreateRoleContent;
