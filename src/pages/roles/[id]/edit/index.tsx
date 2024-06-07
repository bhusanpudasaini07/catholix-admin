import EditRoleContent from "@/features/Roles/edit-role";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const EditRole: NextPageWithLayout = () => {
  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title="Edit Role"
          subTitle="CMS permissions, and setting their status as active"
          back
          backUrl="/roles"
        />
      </div>
      <EditRoleContent />
    </div>
  );
};

export default EditRole;

export const getServerSideProps = async ({ query, locale }: any) => {
  const paths = [
    {
      params: {
        id: query?.id,
      },
      locale,
    },
  ];

  const translations = await serverSideTranslations(locale, ["common"]); // Pass the locale argument to serverSideTranslations

  return {
    props: {
      ...translations,
      paths,
      fallback: false,
    },
  };
};

EditRole.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
