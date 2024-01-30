import React, { useState } from "react";
import VendorSteps from "./vendor-steps";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { format } from "date-fns";

import { VendorFormSchema } from "@/schema/vendor-schema/vendor-schema";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

import { Form } from "@/shared/components/ui/form";

import VendorBasics from "./forms/vendor-basics";
import VendorAddress from "./forms/vendor-address";
import VendorContacts from "./forms/contacts";
import VendorAdditionalInfo from "./forms/additional-info";

import { IVendorFormInput } from "@/interface/vendor-interface";
import { addVendor } from "@/services/vendor/vendor-service";
import VendorBankingDetails from "./forms/banking-details";

const VendorForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<IVendorFormInput>({
    resolver: zodResolver(VendorFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      bank_details: [
        {
          name: "",
          account_number: "",
          branch: "",
          bank_contact_number: "",
        },
      ],
    },
  });

  //   STATES
  const [currentForm, setCurrentForm] = useState<number>(1);
  const [taxFile, setTaxFile] = useState(null);

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
          <VendorBasics
            form={stepForm}
            goBack={() => goBack()}
            goForward={() => goForward()}
          />
        );
      case 2:
        return (
          <VendorAddress
            form={stepForm}
            goBack={() => goBack()}
            goForward={() => goForward()}
          />
        );
      case 3:
        return (
          <VendorContacts
            form={stepForm}
            goBack={() => goBack()}
            goForward={() => goForward()}
          />
        );
      case 4:
        return (
          <VendorBankingDetails
            form={stepForm}
            goBack={() => goBack()}
            goForward={() => goForward()}
          />
        );
      case 5:
        return (
          <VendorAdditionalInfo
            form={stepForm}
            goBack={() => goBack()}
            goForward={() => goForward()}
            setTaxFile={setTaxFile}
            loading={addVendorMutation?.isLoading}
          />
        );
      default:
        return null;
    }
  };

  /**
   * Vendor Form submission mutation
   */
  const addVendorMutation = useMutation({
    mutationFn: addVendor,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      queryClient.invalidateQueries(["vendorList"]);
      router.push("/vendors");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const onSubmit: SubmitHandler<IVendorFormInput> = (data) => {
    const payload = {
      vendor: JSON.stringify({
        ...data,
        ...(data?.vendor_since && {
          vendor_since: format(data?.vendor_since, "yyyy-MM-dd'T'HH:mm:ss"),
        }),
        ...(data?.join_date && {
          joined_date: format(data?.join_date, "yyyy-MM-dd'T'HH:mm:ss"),
        }),
      }),
      tax_clearance_file: taxFile,
    };
    addVendorMutation.mutate(payload);
  };

  return (
    <>
      <VendorSteps stepCounter={currentForm} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{renderForm(form)}</form>
      </Form>
    </>
  );
};

export default VendorForm;
