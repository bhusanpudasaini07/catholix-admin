import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import ProductFormContent from "../form-content";
import { useProducts } from "@/hooks/products/useProduct.hook";
import { IProductsPost } from "@/interface/products-interface";
import { ProductFormSchema } from "@/schema/product-schema";


const AddProductForm = () => {
const {addProductMutation } = useProducts();
  const [selectedLocalGovs, setSelectedLocalGovs] = useState<
    { id: number; name: string }[]
  >([]);

  const form = useForm<IProductsPost>({
    resolver: zodResolver(ProductFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });


  const onSubmit: SubmitHandler<IProductsPost> = (data) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("productDescription", data.productDescription);
    formData.append("productPrice", data.productPrice.toString());
    formData.append("productImage", data.productImage);
    formData.append("categoryId", data.categoryId);
    addProductMutation.mutate(formData as unknown as IProductsPost);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <ProductFormContent
          form={form}
          loading={addProductMutation.isLoading}
          selected={selectedLocalGovs}
          setSelected={setSelectedLocalGovs}
          showSkeleton={false}
        />
       
   
      </form>
    </Form>
  );
};

export default AddProductForm;
