import EditBundleForm from "@/features/Bundles/edit-bundle";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const EditBundle: NextPageWithLayout = () => {
  return (
    <div className="page">
      <PageHeader
        title="Bundle"
        subTitle="Edit Bundle"
        back
        backUrl="/bundles"
      />
      <div className="page-body px-8">
        <EditBundleForm />
      </div>
    </div>
  );
};

export default EditBundle;

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

EditBundle.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
