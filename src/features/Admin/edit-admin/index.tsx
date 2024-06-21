import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

import { IAdminDetail, IAdminForm } from "@/interface/admin-interface";
import { AdminFormSchema } from "@/schema/auth-schema/admin-schema";
import {
  addAdmin,
  editAdmin,
  getAdminDetail,
} from "@/services/admin/admin-service";
import { Form } from "@/shared/components/ui/form";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { zodResolver } from "@hookform/resolvers/zod";

import AdminFormContent from "../form-content";
import { ILocalGovernment } from "@/interface/common-interface";
import { constants } from "@/constants";

interface IProps {
  data: IAdminDetail;
}

const { SOMETHING_WENT_WRONG } = constants.messages;

const EditAdminForm = () => {
  const router = useRouter();
  const form = useForm<IAdminForm>({
    resolver: zodResolver(AdminFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [selectedLocalGovs, setSelectedLocalGovs] = useState<
    { id: number; name: string }[]
  >([]);

  const { data: adminDetail, isLoading: adminDetailLoading } = useQuery<IProps>(
    {
      queryKey: ["adminDetail", router.query?.id],
      queryFn: () => getAdminDetail(router.query?.id as string),
      // onSuccess: (data) => {
      //   setSelectedLocalGovs([]);
      //   form.reset({
      //     firstName: data?.data?.firstName,
      //     lastName: data?.data?.lastName,
      //     email: data?.data?.email,
      //     contact: data?.data?.contact,
      //     status: data?.data?.status === "active" ? true : false,
      //     roleId: data?.data?.role?.id.toString(),
      //   });
      // },
    }
  );

  const editAdminMutation = useMutation({
    mutationFn: (data: IAdminForm) =>
      editAdmin(router.query?.id as string, data),
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Admin edited successfully");
      router.push("/admins");
    },
    onError: (error: any) => {
      if (error) {
        error?.message.map((err: any) => {
          form.setError(err?.name, {
            message: err?.errors[0],
          });
        });
      } else {
        showToast(TOAST_TYPES.error, SOMETHING_WENT_WRONG);
      }
    },
  });

  const onSubmit: SubmitHandler<IAdminForm> = (data) => {
    const { email, ...restPayload } = data;
    const payload: any = {
      ...restPayload,
      status: data.status ? "active" : "inactive",
      roleId: Number(data?.roleId),
      localGovId: data?.localGovId?.map((lg) => Number(lg)),
      regionId: Number(data?.regionId),
      stateId: Number(data?.stateId),
    };
    editAdminMutation.mutate(payload);
  };

  useEffect(() => {
    if (router?.query?.id && adminDetail?.data) {
      form.reset({
        firstName: adminDetail?.data?.firstName,
        lastName: adminDetail?.data?.lastName,
        email: adminDetail?.data?.email,
        contact: adminDetail?.data?.contact,
        status: adminDetail?.data?.status === "active" ? true : false,
        roleId: adminDetail?.data?.role?.id?.toString(),
        regionId: adminDetail?.data?.regionId?.toString(),
        stateId: adminDetail?.data?.stateId?.toString(),
      });
      setSelectedLocalGovs(adminDetail?.data?.localGovernments);
    }
  }, [router?.query?.id, adminDetail]);

  useEffect(() => {
    if (router?.query?.id && adminDetail !== undefined) {
      form.setValue("regionId", adminDetail?.data?.regionId?.toString());
      form.setValue("stateId", adminDetail?.data?.stateId?.toString());
      form.setValue("roleId", adminDetail?.data?.role?.id?.toString());
    }
  }, [router.query?.id, adminDetail]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <AdminFormContent
          form={form}
          loading={editAdminMutation.isLoading}
          selected={selectedLocalGovs}
          setSelected={setSelectedLocalGovs}
        />
      </form>
    </Form>
  );
};

export default EditAdminForm;
