import ProjectDetailContent from "@/features/Projects/detail";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const ProjectDetail = () => {
  return <ProjectDetailContent />;
};

export default ProjectDetail;
// export const getStaticProps = getI18nProps;

ProjectDetail.getLayout = (page: any) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
