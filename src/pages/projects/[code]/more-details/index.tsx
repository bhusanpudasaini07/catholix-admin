import ProjectDetailContent from "@/features/Projects/detail";
import ProjectMoreDetailContent from "@/features/Projects/more-details";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const ProjectMoreDetail: NextPageWithLayout = () => {
  return <ProjectMoreDetailContent />;
};

export default ProjectMoreDetail;

export const getServerSideProps = async ({ query, locale }: any) => {
  const paths = [
    {
      params: {
        id: query?.code,
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

ProjectMoreDetail.getLayout = (page) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
