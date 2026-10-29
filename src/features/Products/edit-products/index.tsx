import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProducts } from "@/hooks/products/useProduct.hook";
import { IProductsPost } from "@/interface/products-interface";
import { ProductFormSchema } from "@/schema/product-schema";
import ProductFormContent from "../form-content";



const EditCProductForm = () => {
  const router = useRouter();
  const {editProductMutation, productDetail, productDetailLoading } = useProducts();

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
    const values = {
      ...data,
      discountPercentage: data.hasOffer ? data.discountPercentage : 0,
      hasDiscount: data.hasOffer ? true : false,
      categoryId: data.categoryId.toString(),
      productPrice: data.productPrice.toString(),
    };
    editProductMutation.mutate(values);
  };



  useEffect(() => {
    if (router.query.productId) {
      form.reset({
        productName: productDetail?.data?.productName,
        productDescription: productDetail?.data?.productDescription,
        productPrice: productDetail?.data?.productPrice,
        categoryId: productDetail?.data?.categoryId.toString(),
        quantity: productDetail?.data?.quantity || 0,
        hasDiscount: productDetail?.data?.hasDiscount,
        isFeatured: productDetail?.data?.isFeatured,
        hasOffer: productDetail?.data?.hasOffer,
        discountPercentage: productDetail?.data?.hasOffer ? productDetail?.data?.discountPercentage : undefined,
        productImageUrl: productDetail?.data?.productImageUrl,
        productImage: productDetail?.data?.productImageUrl,
        colors: Array.isArray(productDetail?.data?.colors)
          ? productDetail.data.colors
          : [],
        sizes: Array.isArray(productDetail?.data?.sizes)
          ? productDetail.data.sizes
          : [],
      });
    }
  }, [productDetail]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <ProductFormContent
          form={form}
          loading={editProductMutation.isLoading}
          showSkeleton={productDetailLoading}
        />
      </form>
    </Form>
  );
};

export default EditCProductForm;
