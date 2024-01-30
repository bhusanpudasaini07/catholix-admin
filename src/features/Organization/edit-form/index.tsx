import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/shared/components/ui/form";
import OrganizationSteps from "./organization-steps";
import LegalInformation from "./form/legal-information";
import CompanyLogo from "./form/company-logo";
import CompanyInfo from "./form/company-info";
import { IOrganizationForm } from "@/interface/organization-interface";
import { useOrgStore } from "@/store/organization-store";
import { useMutation, useQueryClient } from "react-query";
import { updateOrganization } from "@/services/organization/organization-service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useRouter } from "next/router";
import { OrganizationSchema } from "@/schema/organization-schema/organization-schema";
import { constants } from "@/constants";

const OrganizationEditForm = () => {
  const { SOMETHING_WENT_WRONG } = constants.messages;
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<IOrganizationForm>({
    resolver: zodResolver(OrganizationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { orgData } = useOrgStore();
  //   STATES
  const [currentForm, setCurrentForm] = useState<number>(1);
  const [file, setFile] = useState(null);

  //   FUNCTIONS
  /**
   * In order to go back to the previous step/form
   */
  const goBack = () => {
    setCurrentForm(currentForm - 1);
  };
  /**
   * In order to go forward to the next step/form
   */
  const goForward = () => {
    setCurrentForm(currentForm + 1);
  };

  const renderForm = (stepForm: any) => {
    switch (currentForm) {
      case 1:
        return (
          <CompanyInfo
            form={stepForm}
            goBack={() => goBack()}
            goForward={() => goForward()}
          />
        );
      case 2:
        return (
          <LegalInformation
            form={stepForm}
            goBack={() => goBack()}
            goForward={() => goForward()}
          />
        );
      case 3:
        return (
          <CompanyLogo
            form={stepForm}
            goBack={() => goBack()}
            file={file}
            setFile={setFile}
            loading={organizationMutation?.isLoading}
          />
        );
      default:
        return null;
    }
  };

  const organizationMutation = useMutation({
    mutationFn: updateOrganization,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      queryClient.invalidateQueries(["organization"]);
      router.push("/organization");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail || SOMETHING_WENT_WRONG);
    },
  });

  const onSubmit: SubmitHandler<IOrganizationForm> = (data) => {
    const { logo, first_name, last_name, ...restData } = data;
    const payload = {
      organization_data: JSON.stringify({
        ...restData,
        contact_person_name: `${first_name} ${last_name}`,
      }),
      logo: file,
    };
    organizationMutation.mutate(payload);
  };

  // Effects
  useEffect(() => {
    form.reset({
      ...orgData,
      first_name: orgData?.contact_person_name.split(" ")[0],
      last_name: orgData?.contact_person_name.split(" ")[1],
    });
  }, [orgData]);
  return (
    <>
      <OrganizationSteps stepCounter={currentForm} />
      <Form {...form}>
        <form
          encType="multipart/form-data"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {renderForm(form)}
        </form>
      </Form>
    </>
  );
};

export default OrganizationEditForm;
