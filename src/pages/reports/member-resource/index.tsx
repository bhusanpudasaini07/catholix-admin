import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import MemberResourceContent from "@/features/reports/member-resource";

const MemberResource: NextPageWithLayout = () => {
  return <MemberResourceContent />;
};

export default MemberResource;
export const getStaticProps = getI18nProps;
MemberResource.getLayout = (page: any) => {
  return <MainLayout title="report">{page}</MainLayout>;
};
