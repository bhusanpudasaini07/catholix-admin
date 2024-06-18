import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { IAdminForm } from "@/interface/admin-interface";
import { AdminFormSchema } from "@/schema/auth-schema/admin-schema";
import { addAdmin } from "@/services/admin/admin-service";
import { Form } from "@/shared/components/ui/form";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { zodResolver } from "@hookform/resolvers/zod";

import AdminFormContent from "../form-content";
import { ILocalGovernment } from "@/interface/common-interface";

const AddAdminForm = () => {
  const router = useRouter();
  const [selectedLocalGovs, setSelectedLocalGovs] = useState<
    ILocalGovernment[]
  >([]);

  const form = useForm<IAdminForm>({
    resolver: zodResolver(AdminFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const addAdminMutation = useMutation({
    mutationFn: addAdmin,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Admin added successfully");
      router.push("/admins");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.message[0]?.errors[0]);
    },
  });

  const onSubmit: SubmitHandler<IAdminForm> = (data) => {
    const payload: any = {
      ...data,
      status: data.status ? "active" : "inactive",
      roleId: Number(data?.roleId),
      localGovId: data?.localGovId?.map((lg) => Number(lg)),
      regionId: Number(data?.regionId),
      stateId: Number(data?.stateId),
    };
    addAdminMutation.mutate(payload);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <AdminFormContent
          form={form}
          loading={addAdminMutation.isLoading}
          selected={selectedLocalGovs}
          setSelected={setSelectedLocalGovs}
        />
      </form>
    </Form>
  );
};

export default AddAdminForm;
