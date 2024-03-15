import StaffsTrendingGraphContent from "@/features/Staff/staffs-body/trending-graph";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const StaffsTrendline = () => {
  return <StaffsTrendingGraphContent />;
};
export default StaffsTrendline;

export const getServerSideProps = async ({ query, locale }: any) => {
  const paths = [
    {
      params: {
        id: query?.username,
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

StaffsTrendline.getLayout = (page: any) => {
  return <MainLayout title="Staff">{page}</MainLayout>;
};
