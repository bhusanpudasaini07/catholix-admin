import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";

import VendorSteps from "../vendor-form/vendor-steps";
import { Form } from "@/shared/components/ui/form";

import {
  getVendorDetails,
  updateVendor,
} from "@/services/vendor/vendor-service";

import { IVendorFormInput } from "@/interface/vendor-interface";
import { VendorFormSchema } from "@/schema/vendor-schema/vendor-schema";

import VendorBasics from "../vendor-form/forms/vendor-basics";
import VendorAddress from "../vendor-form/forms/vendor-address";
import VendorContacts from "../vendor-form/forms/contacts";
import VendorAdditionalInfo from "../vendor-form/forms/additional-info";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import VendorBankingDetails from "../vendor-form/forms/banking-details";

const VendorEditForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  //   STATES
  const [currentForm, setCurrentForm] = useState<number>(1);
  const [taxFile, setTaxFile] = useState(null);

  const { data: vendorDetail, isLoading } = useQuery({
    queryKey: ["vendorDetail", router?.query?.id],
    queryFn: async () => {
      if (router?.query?.id) {
        const response = await getVendorDetails(router?.query?.id);
        return response;
      }
    },
  });
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
            loading={updateVendorMutation?.isLoading}
          />
        );
      default:
        return null;
    }
  };

  /**
   * Vendor Form submission mutation
   */
  const updateVendorMutation = useMutation({
    mutationFn: (data) => updateVendor(data, router.query.id),
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
    const payload: any = {
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
    updateVendorMutation.mutate(payload);
  };

  const form = useForm<IVendorFormInput>({
    resolver: zodResolver(VendorFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ...vendorDetail?.data,
      ...(vendorDetail?.data?.bank_details
        ? {
            bank_details: [
              {
                ...vendorDetail?.data?.bank_details,
              },
            ],
          }
        : {
            bank_details: [
              {
                name: "",
                account_number: "",
                branch: "",
                bank_contact_number: "",
              },
            ],
          }),
    },
  });

  // EFFECTS
  useEffect(() => {
    if (vendorDetail) {
      /**
       * Setting default datas coming from api into form
       */
      form.reset({
        ...vendorDetail?.data,
        vendor_since:
          vendorDetail?.data?.vendor_since &&
          new Date(vendorDetail?.data?.vendor_since),
        join_date:
          vendorDetail?.data?.join_date &&
          new Date(vendorDetail?.data?.join_date),
        ...(vendorDetail?.data?.bank_details &&
        vendorDetail?.data?.bank_details?.length > 0
          ? {
              bank_details: [...vendorDetail?.data?.bank_details],
            }
          : {
              bank_details: [
                {
                  name: "",
                  account_number: "",
                  branch: "",
                  bank_contact_number: "",
                },
              ],
            }),
      });
      // setTaxFile(vendorDetail?.data?.tax_clearance_file);
    }
  }, [vendorDetail]);

  return (
    <>
      <VendorSteps stepCounter={currentForm} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{renderForm(form)}</form>
      </Form>
    </>
  );
};

export default VendorEditForm;
