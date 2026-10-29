import AddBundleForm from "@/features/Bundles/add-bundle";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const CreateBundle: NextPageWithLayout = () => {
  return (
    <div className="page">
      <PageHeader
        title="Bundle"
        subTitle="Add Bundle"
        back
        backUrl="/bundles"
      />
      <div className="page-body px-8">
        <AddBundleForm />
      </div>
    </div>
  );
};

export default CreateBundle;

export const getStaticProps = getI18nProps;

CreateBundle.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
