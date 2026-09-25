import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";


import { Form } from "@/shared/components/ui/form";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { constants } from "@/constants";
import { ICategoryList, ICategoryPost } from "@/interface/category-interface";
import CategoriesFormContent from "../form-content";
import { CategoryFormSchema } from "@/schema/category-schema";
import { editCategory, getCategoryDetail } from "@/services/category/category-service";

interface IProps {
  data: ICategoryList;
}

const { SOMETHING_WENT_WRONG } = constants.messages;

const EditCategoryForm = () => {
  const router = useRouter();
  const form = useForm<ICategoryPost>({
    resolver: zodResolver(CategoryFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [selectedCategory, setSelectedCategory] = useState<
    { id: number; name: string }[]
  >([]);

  const { data: categoryDetail, isLoading: categoryDetailLoading } = useQuery<IProps>(
    {
      queryKey: ["categoryDetail", router.query?.id],
      queryFn: async () => {
        if (router?.query?.id) {
          const response = await getCategoryDetail(router.query?.id);
          return response;
        }
      },
      // onSuccess: (data) => {
      //   if (data?.data) {
      //     setSelectedCategory(data?.data?.localGovernments);
      //     form.reset({
      //       firstName: data?.data?.firstName,
      //       lastName: data?.data?.lastName,
      //       email: data?.data?.email,
      //       contact: data?.data?.contact,
      //       status: data?.data?.status === "active" ? true : false,
      //       roleId: data?.data?.role?.id.toString(),
      //       regionId: data?.data?.regionId?.toString(),
      //       stateId: data?.data?.stateId?.toString(),
      //     });
      //   }
      // },
    }
  );

  const editCategoryMutation = useMutation({
    mutationFn: (data: ICategoryPost) =>
      editCategory(router.query?.id as string, data),
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Category edited successfully");
      router.push("/category");
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
    editCategoryMutation.mutate(data);
  };

  useEffect(() => {
    if (router?.query?.id && categoryDetail) {
      setSelectedCategory(categoryDetail?.data);
      form.reset({
        categoryName: categoryDetail?.categoryName,
       
      });
    }
  }, [categoryDetail]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <CategoriesFormContent
          form={form}
          loading={editCategoryMutation.isLoading}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          showSkeleton={adminDetailLoading}
        />
      </form>
    </Form>
  );
};

export default EditCategoryForm;
