import EditCProductForm from "@/features/Products/edit-products";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const EditProducts: NextPageWithLayout = () => {
  return (
    <div className="page">
      <PageHeader
        title="Products"
        subTitle="Edit Products"
        back
        backUrl="/products"
      />

      <div className="page-body px-8">
        <EditCProductForm />
      </div>
    </div>
  );
};

export default EditProducts;

export const getServerSideProps = async ({ query, locale }: any) => {
  const paths = [
    {
      params: {
        id: query?.id,
      },
      locale,
    },
  ];

  const translations = await serverSideTranslations(locale, ["common"]); // Pass the locale argument to serverSideTranslations

  return {
    props: {
      ...translations,
      paths,
      fallback: false,
    },
  };
};

EditProducts.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
