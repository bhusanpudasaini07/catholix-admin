import ReportSummaryContent from "@/features/Team/team-leads/report";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const LeadReportSummary = () => {
  return <ReportSummaryContent />;
};

export default LeadReportSummary;
export const getStaticProps = getI18nProps;

LeadReportSummary.getLayout = (page: any) => {
  return <MainLayout title="Report">{page}</MainLayout>;
};
