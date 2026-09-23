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
      queryFn: async () => {
        if (router?.query?.id) {
          const response = await getAdminDetail(router.query?.id);
          return response;
        }
      },
    }
  );
  // onSuccess: (data) => {
  //   if (data?.data) {
  //     form.reset({
  //       firstName: data?.data?.firstName,
  //       lastName: data?.data?.lastName,
  //       email: data?.data?.email,
  //       contact: data?.data?.contact,
  //       status: data?.data?.status === "active" ? true : false,
  //       roleId: data?.data?.role?.id?.toString(),
  //       regionId: data?.data?.regionId?.toString() ?? "",
  //       stateId: data?.data?.stateId?.toString(),
  //     });
  //     setSelectedLocalGovs(data?.data?.localGovernments);
  //   }
  // },

  useEffect(() => {
    if (router?.query?.id && adminDetail) {
      setSelectedLocalGovs(adminDetail?.data?.localGovernments);
      form.reset({
        firstName: adminDetail?.data?.firstName,
        lastName: adminDetail?.data?.lastName,
        email: adminDetail?.data?.email,
        contact: adminDetail?.data?.contact,
        status: adminDetail?.data?.status === "active" ? true : false,
        roleId: adminDetail?.data?.role?.id.toString(),
        regionId: adminDetail?.data?.regionId?.toString() || "0",
        stateId: adminDetail?.data?.stateId?.toString() || "0",
      });
    }
  }, [adminDetail]);

  return (
    <Form {...form}>
      <form autoComplete="off">
        <AdminFormContent
          form={form}
          loading={false}
          selected={selectedLocalGovs}
          setSelected={setSelectedLocalGovs}
          showSkeleton={adminDetailLoading}
        />
      </form>
    </Form>
  );
};

export default ViewAdminContent;
