import ProjectDashboardView from "@/features/Dashboard/project-lead-view";
import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

const PlDashboard: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex justify-between items-end px-8 py-6 border-b bg-light-white border-b-slate-100">
        <div>
          <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
            Project Lead Dashboard
          </h1>
          <p className="text-base text-zinc-500">
            Welcome back, get insights and overview of all the activities.
          </p>
        </div>
      </div>
      <ProjectDashboardView />
    </>
  );
};

export default PlDashboard;
export const getStaticProps = getI18nProps;

PlDashboard.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
