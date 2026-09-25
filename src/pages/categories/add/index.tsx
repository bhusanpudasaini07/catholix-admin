import AddCategoriesForm from "@/features/Catgegories/add-categories";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";

import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const CreateCategory: NextPageWithLayout = () => {
  return (
    <div className="page">
        <PageHeader
          title="Category"
          subTitle="Add Categories"
          back
          backUrl="/categories"
        />
         <div className="page-body px-8">
              <AddCategoriesForm />
         </div>

    </div>
  );
};

export default CreateCategory;
export const getStaticProps = getI18nProps;

CreateCategory.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
