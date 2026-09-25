import EditCategoryForm from "@/features/Catgegories/edit-categories";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const EditCategories: NextPageWithLayout = () => {
  return (
    <div className="px-8 py-6">
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title="Admin"
          subTitle="Manage data access for admin: Give or revoke admin regional and cms data access permissions."
          back
          backUrl="/admins"
        />
      </div>

      <EditCategoryForm />
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
