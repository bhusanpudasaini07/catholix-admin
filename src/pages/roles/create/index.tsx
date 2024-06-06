import React from "react";

import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import CreateRoleContent from "@/features/Roles/add-role";

const CreateRoll: NextPageWithLayout = () => {
  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title="Create Roles"
          subTitle="CMS permissions, and setting their status as active"
          back
          backUrl="/roles"
        />
      </div>

      <CreateRoleContent />
    </div>
  );
};

export default CreateRoll;
export const getStaticProps = getI18nProps;

CreateRoll.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
