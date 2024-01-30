import React from "react";
import { Form } from "@/shared/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

import PurchaseFormItems from "../form-items";
import { PurchaseOrderSchema } from "@/schema/purchase-order-schema/purchase-order-schema";
import { IPurchaseFormInput } from "@/interface/purchase-order-interface";
import { addPurchaseOrder } from "@/services/purchase-order/purchase-order-service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

const PurchaseOrderForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  // FUNCTIONS
  const form = useForm<IPurchaseFormInput>({
    resolver: zodResolver(PurchaseOrderSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const addPurchaseOrderMutation = useMutation({
    mutationFn: addPurchaseOrder,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      queryClient.invalidateQueries(["purchaseList"]);
      router.push("/purchase-orders");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const onSubmit: SubmitHandler<IPurchaseFormInput> = (data) => {
    const payload = {
      ...data,
      ...(data?.po_received_date && {
        po_received_date: format(
          data?.po_received_date,
          "yyyy-MM-dd'T'HH:mm:ss"
        ),
      }),
    };
    addPurchaseOrderMutation.mutate(payload);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        encType="multipart/form-data"
      >
        <PurchaseFormItems
          disabled={addPurchaseOrderMutation?.isLoading}
          form={form}
        />
      </form>
    </Form>
  );
};

export default PurchaseOrderForm;
