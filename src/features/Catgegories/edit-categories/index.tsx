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
  const { id } = router.query;
  const {editCategoryMutation, categoryDetail, categoryDetailLoading } = useCategory();

  const form = useForm<ICategoryPost>({
    resolver: zodResolver(CategoryFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [selectedCategory, setSelectedCategory] = useState<
    { id: number; name: string }[]
  >([]);


  

  const onSubmit: SubmitHandler<ICategoryPost> = (data) => {
    editCategoryMutation.mutate(data);
  };

  // useEffect(() => {
  //   if (router?.query?.id) {
  //     console.log("asdasda", categoryDetail)
  //     // setSelectedCategory(categoryDetail?.data);
  //     // form.reset({
  //     //   categoryName: categoryDetail?.categoryName,
       
  //     // });
  //   }
  // }, [categoryDetail]);

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
