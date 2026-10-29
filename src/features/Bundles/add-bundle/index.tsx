import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import BundleFormContent, {
  toBundlePayload,
} from "@/features/Bundles/form-content";
import { useBundles } from "@/hooks/bundles/useBundle.hook";
import { BundleFormSchema, BundleFormValues } from "@/schema/bundle-schema";
import { Form } from "@/shared/components/ui/form";

const AddBundleForm = () => {
  const { addBundleMutation } = useBundles();
  const form = useForm<BundleFormValues>({
    resolver: zodResolver(BundleFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      fixedPrice: 0,
      imageUrl: "",
      stockQuantity: 0,
      status: "draft",
      items: [],
    },
  });

  const onSubmit: SubmitHandler<BundleFormValues> = (data) => {
    addBundleMutation.mutate(toBundlePayload(data));
  };

  return (
    <Form {...form}>
      <BundleFormContent
        form={form}
        loading={addBundleMutation.isLoading}
        submitLabel="Add bundle"
        onSubmit={form.handleSubmit(onSubmit)}
      />
    </Form>
  );
};

export default AddBundleForm;
