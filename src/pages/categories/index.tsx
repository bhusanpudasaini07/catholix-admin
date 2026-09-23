import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import PageHeader from "@/shared/components/page-header";
import AddCategoriesForm from "@/features/Catgegories/add-categories";

const CMSPermissions: NextPageWithLayout = () => {
  return (
    <div className="px-8 py-6">
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title="Categories"
          subTitle="Manage Categories"
          back
          backUrl="/"
        />
      </div>
      <AddCategoriesForm />

    </div>
  );
};

export default CMSPermissions;

export const getStaticProps = getI18nProps;

CMSPermissions.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
