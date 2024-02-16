import ProjectDetailContent from "@/features/Projects/detail";
import ProjectMoreDetailContent from "@/features/Projects/more-details";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const ProjectMoreDetail: NextPageWithLayout = () => {
  return <ProjectMoreDetailContent />;
};

export default ProjectMoreDetail;

// export const getStaticProps = getI18nProps;

ProjectMoreDetail.getLayout = (page) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
