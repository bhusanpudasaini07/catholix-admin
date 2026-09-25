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
  });

  const [selectedProduct, setSelectedCProduct] = useState<any>();


  

  const onSubmit: SubmitHandler<IProductsPost> = (data) => {
    editProductMutation.mutate(data);
  };

  useEffect(() => {
    if (router?.query?.id) {
      setSelectedCProduct(productDetail);
      form.reset({
        productName: productDetail?.data?.productName,
      });
    }
  }, [productDetail]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <ProductFormContent
          form={form}
          loading={editProductMutation.isLoading}
          selected={selectedProduct}
          setSelected={setSelectedCProduct}
          showSkeleton={productDetailLoading}
        />
      </form>
    </Form>
  );
};

export default EditCProductForm;
