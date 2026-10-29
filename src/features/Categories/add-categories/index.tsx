import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ICategoryPost } from "@/interface/category-interface";
import { CategoryFormSchema } from "@/schema/category-schema";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import CategoriesFormContent from "../form-content";
import { useCategory } from "../../../hooks/categories/useCategory.hook";


const AddCategoriesForm = () => {
const {addCategoryMutation } = useCategory();
  const [selectedLocalGovs, setSelectedLocalGovs] = useState<
    { id: number; name: string }[]
  >([]);

  const form = useForm<ICategoryPost>({
    resolver: zodResolver(CategoryFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      categoryName: "",
      categoryDescription: "",
    },
  });


  const onSubmit: SubmitHandler<any> = (data) => {
    const formData = new FormData();
    formData.append("categoryName", data.categoryName);
    formData.append("categoryDescription", data.categoryDescription);
    formData.append("categoryImage", data.categoryImage);
    addCategoryMutation.mutate(formData as any);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <CategoriesFormContent
          form={form}
          loading={addCategoryMutation.isLoading}
          selected={selectedLocalGovs}
          setSelected={setSelectedLocalGovs}
          showSkeleton={false}
        />
      </form>
    </Form>
  );
};

export default AddCategoriesForm;
