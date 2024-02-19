import LeadReportContent from "@/features/Team/team-leads/lead-report";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const LeadReport = () => {
  return <LeadReportContent />;
};

export default LeadReport;
export const getStaticProps = getI18nProps;

LeadReport.getLayout = (page: any) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
