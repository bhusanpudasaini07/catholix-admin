import ProjectDetailContent from "@/features/Projects/detail";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const ProjectDetail: NextPageWithLayout = () => {
  return <ProjectDetailContent />;
};

export default ProjectDetail;
// export const getStaticProps = getI18nProps;

ProjectDetail.getLayout = (page) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};

// export const getStaticPaths = async ({ locales }: any) => {
//   const paths = locales.map((locale: any) => ({
//     params: {
//       id: 1, // Static id value
//     },
//     locale,
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };
