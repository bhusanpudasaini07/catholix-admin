import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RoleForm from "../role-form";
import { RoleSchema } from "@/schema/auth-schema/role-schema";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { IRoleDetails, IRolesForm } from "@/interface/roles-interface";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addRole,
  editRole,
  getRolesDetail,
} from "@/services/roles/roles-service";
import { useRouter } from "next/router";
import { constants } from "@/constants";

const { SOMETHING_WENT_WRONG } = constants.messages;

const EditRoleContent = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const form = useForm<IRolesForm>({
    resolver: zodResolver(RoleSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { data } = useQuery<IRoleDetails>({
    queryKey: ["roles", id],
    queryFn: () => getRolesDetail(id),
    onSuccess: (data) => {
      form.reset({
        name: data?.data?.name,
        permissions: data?.data?.permission?.map((permission) =>
          permission?.id.toString()
        ),
      });
    },
  });

  //   Edit Mutation
  const editRoleMutation = useMutation({
    mutationFn: (data) => editRole(id, data),
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Role updated successfully");
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
    const payload: any = {
      ...data,
      permissions: data?.permissions?.map((permission) => Number(permission)),
    };
    if (
      payload?.permissions?.length === 0 ||
      payload?.permissions === undefined
    ) {
      showToast(TOAST_TYPES.error, "Select at least one permission");
    } else {
      editRoleMutation.mutate(payload);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <RoleForm form={form} loading={editRoleMutation.isLoading} />
      </form>
    </Form>
  );
};

export default EditRoleContent;
