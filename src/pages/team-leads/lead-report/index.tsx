import React from 'react';

import LeadReportContent from '@/features/Team/team-leads/lead-report';
import MainLayout from '@/shared/main-layout';
import { getI18nProps } from '@/shared/utils/i18n-utils/i18n.util';

const LeadReport = () => {
  return <LeadReportContent />;
};

export default LeadReport;
export const getStaticProps = getI18nProps;

LeadReport.getLayout = (page: any) => {
  return <MainLayout title="Lead Report">{page}</MainLayout>;
};
