import StaffContent from "@/features/Staff/profile/staff-content";
import StaffHeader from "@/features/Staff/profile/staff-header";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const StaffProfile: NextPageWithLayout = () => {
  return (
    <>
      <StaffHeader />
      <div className="p-6 max-h-[calc(100vh-170px)] overflow-auto">
        <StaffContent />
      </div>
    </>
  );
};

export default StaffProfile;

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

StaffProfile.getLayout = (page) => {
  return <MainLayout title="Staff">{page}</MainLayout>;
};
