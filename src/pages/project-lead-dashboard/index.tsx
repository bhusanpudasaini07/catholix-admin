import ProjectDashboardView from "@/features/Dashboard/project-lead-view";
import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

const PlDashboard: NextPageWithLayout = () => {
  return (
    <>
      
      <ProjectDashboardView />
    </>
  );
};

export default PlDashboard;
export const getStaticProps = getI18nProps;

PlDashboard.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
