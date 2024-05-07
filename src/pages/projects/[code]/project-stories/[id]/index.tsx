import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import StoryDetailHeader from "@/features/Projects/project-stories/detail/story-detail-header";
import StoryDetailOverviewStatus from "@/features/Projects/project-stories/detail/story-overview-status";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import StoryRoleWiseConsumption from "@/features/Projects/project-stories/detail/role-wise-consumption";
import StoryTaskList from "@/features/Projects/project-stories/detail/story-task-list";

const IndividualProjectStory: NextPageWithLayout = () => {
  return (
    <>
      <StoryDetailHeader />

      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid grid-cols-1 gap-4">
          <StoryDetailOverviewStatus />
          <StoryRoleWiseConsumption />
          <StoryTaskList />
        </div>
      </div>
    </>
  );
};

export default IndividualProjectStory;

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

IndividualProjectStory.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
