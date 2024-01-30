import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

import PurchaseFormItems from "../form-items";
import {
  IPurchaseFormInput,
  IPurchaseOrderDetail,
} from "@/interface/purchase-order-interface";
import { PurchaseOrderSchema } from "@/schema/purchase-order-schema/purchase-order-schema";
import { Form } from "@/shared/components/ui/form";
import {
  getPurchaseOrderDetail,
  updatePurchaseOrder,
} from "@/services/purchase-order/purchase-order-service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

interface IProps {
  data: IPurchaseOrderDetail;
}

const PurchaseEditForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router?.query;

  const form = useForm<IPurchaseFormInput>({
    resolver: zodResolver(PurchaseOrderSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // FUNCTIONS
  const { data: purchaseDetail, isLoading } = useQuery<IProps>({
    queryFn: async () => {
      if (id) {
        const response = await getPurchaseOrderDetail(id);
        return response;
      }
    },
  });

  const editPurchaseOrderMutation = useMutation({
    mutationFn: (data) => updatePurchaseOrder(id, data),
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
    const payload: any = {
      ...data,
      ...(data?.po_received_date && {
        po_received_date: format(
          data?.po_received_date,
          "yyyy-MM-dd'T'HH:mm:ss"
        ),
      }),
    };
    editPurchaseOrderMutation.mutate(payload);
  };

  // EFFECTS
  useEffect(() => {
    if (purchaseDetail && id) {
      form.reset({
        ...purchaseDetail?.data,
        po_received_date: new Date(purchaseDetail?.data?.po_received_date),
      });
    }
  }, [purchaseDetail, id]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        encType="multipart/form-data"
      >
        <PurchaseFormItems disabled={false} form={form} />
      </form>
    </Form>
  );
};

export default PurchaseEditForm;
