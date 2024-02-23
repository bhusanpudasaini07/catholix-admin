import BurndownContent from "@/features/Projects/burndown-chart";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const ProjectBurndownChart: NextPageWithLayout = () => {
  return <BurndownContent />;
};

export default ProjectBurndownChart;

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

ProjectBurndownChart.getLayout = (page) => {
  return <MainLayout title="Burndown Chart">{page}</MainLayout>;
};
