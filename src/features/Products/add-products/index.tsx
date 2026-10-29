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


  const form = useForm<IProductsPost>({
    resolver: zodResolver(ProductFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      colors: [],
      sizes: [],
    },
  });


  const onSubmit: SubmitHandler<IProductsPost> = (data:any) => {
    const { isFeatured, hasOffer, discountPercentage, hasDiscount, ...rest } = data;
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("productDescription", data.productDescription);
    formData.append("productPrice", data.productPrice.toString());
    formData.append("productImage", data.productImage);
    formData.append("categoryId", data.categoryId);
    formData.append("quantity", data.quantity.toString());
    formData.append("discountPercentage", data.discountPercentage?.toString() || "0");
    formData.append("hasDiscount", discountPercentage ? "true" : "false");
    formData.append("isFeatured", data.isFeatured.toString());
    formData.append("hasOffer", data.hasOffer.toString());
    data && data?.colors.forEach((color:string) => formData.append("colors", color));
    data.sizes.forEach((size:string) => formData.append("sizes", size));
    addProductMutation.mutate(formData as unknown as IProductsPost);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <ProductFormContent
          form={form}
          loading={addProductMutation.isLoading}
          showSkeleton={false}
        />
       
   
      </form>
    </Form>
  );
};

export default AddProductForm;
