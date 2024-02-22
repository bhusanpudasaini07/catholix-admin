import React from "react";
import MainLayout from "@/shared/main-layout";
import ProjectRPConsumptionContent from "@/features/Team/team-leads/lead-report/project-rp-consumption";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

const ProjectRPConsumption = () => {
  return <ProjectRPConsumptionContent />;
};

export default ProjectRPConsumption;
export const getStaticProps = getI18nProps;

ProjectRPConsumption.getLayout = (page: any) => {
  return <MainLayout title="Project Consumption">{page}</MainLayout>;
};
