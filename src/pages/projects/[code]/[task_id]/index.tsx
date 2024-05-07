import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import TaskIndividualConsumption from "@/features/Projects/task/individual-consumption";
import TaskActivities from "@/features/Projects/task/task-activities";
import TaskHeader from "@/features/Projects/task/task-header";
import TaskOverview from "@/features/Projects/task/task-overview";
import TimeLogs from "@/features/Projects/task/time-logs";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";

const ProjectTaskDetail: NextPageWithLayout = () => {
  return (
    <>
      <TaskHeader />

      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid grid-cols-1 gap-4">
          <TaskOverview />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <TaskActivities />
            <div>
              <TaskIndividualConsumption />
              <TimeLogs />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectTaskDetail;
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

ProjectTaskDetail.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
