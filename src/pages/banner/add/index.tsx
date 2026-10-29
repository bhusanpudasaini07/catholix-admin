import AddBannerForm from "@/features/Banner/add-banner-form";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";

import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const CreateBanner: NextPageWithLayout = () => {
  return (
    <div className="page">
        <PageHeader
          title="Banner"
          subTitle="Add Banner"
          back
          backUrl="/banner"
        />
         <div className="page-body px-8">
              <AddBannerForm />
         </div>

    </div>
  );
};

export default CreateBanner;
export const getStaticProps = getI18nProps;

CreateBanner.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
