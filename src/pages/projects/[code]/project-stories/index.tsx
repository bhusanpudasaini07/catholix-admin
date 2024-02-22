import ProjectStoriesContent from "@/features/Projects/project-stories";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const ProjectStories: NextPageWithLayout = () => {
  return <ProjectStoriesContent />;
};

export default ProjectStories;

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

ProjectStories.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
