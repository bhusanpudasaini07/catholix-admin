import AddProductForm from "@/features/Products/add-products";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";

import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const CreateProduct: NextPageWithLayout = () => {
  return (
    <div className="page">
        <PageHeader
          title="Product"
          subTitle="Add Products"
          back
          backUrl="/products"
        />
         <div className="page-body px-8">
              <AddProductForm />
         </div>

    </div>
  );
};

export default CreateProduct;
export const getStaticProps = getI18nProps;

CreateProduct.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
