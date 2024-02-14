import ProjectStoriesContent from "@/features/Projects/project-stories";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import React from "react";

const ProjectStories: NextPageWithLayout = () => {
  return <ProjectStoriesContent />;
};

export default ProjectStories;

ProjectStories.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
