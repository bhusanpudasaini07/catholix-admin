import AddAdminForm from "@/features/Admin/add-admin";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";

import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const CreateAdmin: NextPageWithLayout = () => {
  return (
    <div className="px-8 py-6">
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title="Admins"
          subTitle="Manage data access for admin: Give or revoke admin regional and cms data access permissions."
          back
          backUrl="/admins"
        />
      </div>

      <AddAdminForm />
    </div>
  );
};

export default CreateAdmin;
export const getStaticProps = getI18nProps;

CreateAdmin.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
