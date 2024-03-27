import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import EstimatedActualContent from "@/features/Projects/estimated-actual";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";

const EstimatedActual: NextPageWithLayout = () => {
  return <EstimatedActualContent />;
};

export default EstimatedActual;

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

EstimatedActual.getLayout = (page) => {
  return <MainLayout title="Latest Activities">{page}</MainLayout>;
};
