import RpEstimationContent from "@/features/Projects/rp-estimation";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const RpEstimation: NextPageWithLayout = () => {
  return <RpEstimationContent />;
};

export default RpEstimation;

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

RpEstimation.getLayout = (page) => {
  return <MainLayout title="RP Estimation">{page}</MainLayout>;
};
