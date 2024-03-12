import React from 'react';

import ReportSummaryContent from '@/features/Team/team-leads/report';
import MainLayout from '@/shared/main-layout';
import { getI18nProps } from '@/shared/utils/i18n-utils/i18n.util';

const LeadReportSummary = () => {
  return <ReportSummaryContent />;
};

export default LeadReportSummary;
export const getStaticProps = getI18nProps;

LeadReportSummary.getLayout = (page: any) => {
  return <MainLayout title="Report">{page}</MainLayout>;
};
