import PageHeader from "@/shared/components/page-header";
import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import RegionalForm from "@/features/Regional-Permission/regional-form";

const RegionalPermissions: NextPageWithLayout = () => {
  return (
    <div className="px-8 py-6">
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title="Regional Permissions"
          subTitle="Manage Regional Permissions: Select Country, State, and Local Government to Assign Specific Access Rights"
          back
          backUrl="/admins"
        />
      </div>
      <RegionalForm />

      {/* <PermissionsForm /> */}
    </div>
  );
};

export default RegionalPermissions;

export const getStaticProps = getI18nProps;

RegionalPermissions.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
