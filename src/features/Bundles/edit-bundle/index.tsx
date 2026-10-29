import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";

import BundleFormContent, {
  toBundlePayload,
} from "@/features/Bundles/form-content";
import { useBundles } from "@/hooks/bundles/useBundle.hook";
import { BundleStatus } from "@/interface/bundle-interface";
import { BundleFormSchema, BundleFormValues } from "@/schema/bundle-schema";
import { getBundleDetail } from "@/services/bundles/bundle-service";
import { Form } from "@/shared/components/ui/form";

const getBundleRecord = (response: any) => {
  const body = response?.data;
  if (body?.data && typeof body.data === "object" && !Array.isArray(body.data)) {
    return body.data;
  }
  return body;
};

const EditBundleForm = () => {
  const router = useRouter();
  const bundleId = Array.isArray(router.query.bundleId)
    ? router.query.bundleId[0]
    : router.query.bundleId;
  const { editBundleMutation } = useBundles();
  const { data: bundleDetail, isLoading: bundleDetailLoading } = useQuery({
    queryKey: ["bundleById", bundleId],
    queryFn: () => getBundleDetail(bundleId as string),
    enabled: !!bundleId,
  });

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

  const bundle = getBundleRecord(bundleDetail);

  useEffect(() => {
    if (!bundle?.id && !bundle?.name) return;
    const status = ["draft", "active", "inactive"].includes(bundle.status)
      ? (bundle.status as BundleStatus)
      : "draft";

    form.reset({
      name: bundle.name || "",
      description: bundle.description ?? "",
      fixedPrice: Number(bundle.fixedPrice ?? 0),
      imageUrl: bundle.imageUrl ?? "",
      stockQuantity: Number(bundle.stockQuantity ?? 0),
      status,
      items: Array.isArray(bundle.items)
        ? bundle.items.map((item: any) => ({
            productId: Number(item.productId ?? item.product?.id),
            quantity: Number(item.quantity ?? 1),
          }))
        : [],
    });
  }, [bundleDetail, form]);

  const onSubmit: SubmitHandler<BundleFormValues> = (data) => {
    editBundleMutation.mutate(toBundlePayload(data));
  };

  return (
    <Form {...form}>
      <BundleFormContent
        form={form}
        loading={editBundleMutation.isLoading}
        showSkeleton={bundleDetailLoading}
        submitLabel="Update bundle"
        onSubmit={form.handleSubmit(onSubmit)}
      />
    </Form>
  );
};

export default EditBundleForm;
