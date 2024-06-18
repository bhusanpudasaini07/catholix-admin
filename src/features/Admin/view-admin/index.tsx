import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

import { IAdminDetail, IAdminForm } from "@/interface/admin-interface";
import { AdminFormSchema } from "@/schema/auth-schema/admin-schema";
import { getAdminDetail } from "@/services/admin/admin-service";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import AdminFormContent from "../form-content";
import { ILocalGovernment } from "@/interface/common-interface";

interface IProps {
  data: IAdminDetail;
}

const ViewAdminContent = () => {
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
    }
  );

  useEffect(() => {
    if (adminDetail !== undefined) {
      form.reset({
        firstName: adminDetail?.data?.firstName,
        lastName: adminDetail?.data?.lastName,
        email: adminDetail?.data?.email,
        contact: adminDetail?.data?.contact,
        status: adminDetail?.data?.status === "active" ? true : false,
        roleId: adminDetail?.data?.role?.id?.toString(),
        regionId: adminDetail?.data?.regionId?.toString() ?? "",
        stateId: adminDetail?.data?.stateId?.toString(),
      });
      setSelectedLocalGovs(adminDetail?.data?.localGovernments);
    }
  }, [router.query?.id, adminDetail?.data]);

  useEffect(() => {
    if (adminDetail !== undefined) {
      form.setValue("regionId", adminDetail?.data?.regionId?.toString());
      form.setValue("stateId", adminDetail?.data?.stateId?.toString());
      form.setValue("roleId", adminDetail?.data?.role?.id?.toString());
    }
  }, [router.query?.id, adminDetail]);

  return (
    <Form {...form}>
      <form autoComplete="off">
        <AdminFormContent
          form={form}
          loading={false}
          selected={selectedLocalGovs}
          setSelected={setSelectedLocalGovs}
        />
      </form>
    </Form>
  );
};

export default ViewAdminContent;
