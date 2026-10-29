import EditBannerForm from "@/features/Banner/edit-banner-form";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const DetailsBanner: NextPageWithLayout = () => {
  return (
    <div className="page">
      <PageHeader
        title="Banner"
        subTitle="Edit Banner"
        back
        backUrl="/banner"
      />
      <div className="page-body px-8">
        <EditBannerForm />
      </div>
    </div>
  );
};

export default DetailsBanner;

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

DetailsBanner.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
