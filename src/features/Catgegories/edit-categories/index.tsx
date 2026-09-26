import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { constants } from "@/constants";
import { ICategoryList, ICategoryPost } from "@/interface/category-interface";
import CategoriesFormContent from "../form-content";
import { CategoryFormSchema } from "@/schema/category-schema";
import { useCategory } from "@/hooks/categories/useCategory.hook";



const EditCategoryForm = () => {
  const router = useRouter();
  const {editCategoryMutation, categoryDetail, categoryDetailLoading } = useCategory();

  const form = useForm<ICategoryPost>({
    resolver: zodResolver(CategoryFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [selectedCategory, setSelectedCategory] = useState<any>();


  

  const onSubmit: SubmitHandler<ICategoryPost> = (data) => {
    editCategoryMutation.mutate(data);
  };

  useEffect(() => {
    if (router?.query?.catId) {
      setSelectedCategory(categoryDetail);
      form.reset({
        categoryName: categoryDetail?.data?.categoryName,
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
          showSkeleton={categoryDetailLoading}
        />
      </form>
    </Form>
  );
};

export default EditCategoryForm;
