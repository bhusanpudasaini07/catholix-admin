import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { ICategoryPost } from "@/interface/category-interface";
import { CategoryFormSchema } from "@/schema/category-schema";
import { addCategory } from "@/services/category/category-service";
import { Form } from "@/shared/components/ui/form";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { constants } from "@/constants";
import CategoriesFormContent from "../form-content";

const { SOMETHING_WENT_WRONG } = constants.messages;

const AddCategoriesForm = () => {
  const router = useRouter();
  const [selectedLocalGovs, setSelectedLocalGovs] = useState<
    { id: number; name: string }[]
  >([]);

  const form = useForm<ICategoryPost>({
    resolver: zodResolver(CategoryFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      categoryName: "",
    },
  });

  const addAdminMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Category added successfully");
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

  const onSubmit: SubmitHandler<ICategoryPost> = (data) => {
    addAdminMutation.mutate(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <CategoriesFormContent
          form={form}
          loading={addAdminMutation.isLoading}
          selected={selectedLocalGovs}
          setSelected={setSelectedLocalGovs}
          showSkeleton={false}
        />
      </form>
    </Form>
  );
};

export default AddCategoriesForm;
