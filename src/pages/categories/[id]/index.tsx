import EditCategoryForm from "@/features/Catgegories/edit-categories";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const EditCategories: NextPageWithLayout = () => {
  return (
    <div className="page">
      <PageHeader
        title="Categories"
        subTitle="Edit Categories"
        back
        backUrl="/categories"
      />

      <div className="page-body px-8">
        <EditCategoryForm />
      </div>
    </div>
  );
};

export default EditCategories;

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

EditCategories.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
