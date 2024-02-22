import TaskTimeSpentContent from "@/features/Projects/task-time-spent";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const TaskTimeSpent: NextPageWithLayout = () => {
  return <TaskTimeSpentContent />;
};

export default TaskTimeSpent;

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

TaskTimeSpent.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
