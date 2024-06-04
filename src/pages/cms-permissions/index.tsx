import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import PageHeader from "@/shared/components/page-header";
import PermissionsForm from "@/features/CMS-Permission/cms-form";

const CMSPermissions: NextPageWithLayout = () => {
  return (
    <div className="px-8 py-6">
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title="CMS Permissions"
          subTitle="Manage CMS access Permissions: Assign and Customize Access Levels for Individual Users"
          back
          backUrl="/admins"
        />
      </div>

      <PermissionsForm />
    </div>
  );
};

export default CMSPermissions;

export const getStaticProps = getI18nProps;

CMSPermissions.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
