import TrendingGraphContent from "@/features/Team/team-leads/lead-report/trending-graph";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const TrendingGraph = () => {
  return <TrendingGraphContent />;
};

export default TrendingGraph;

export const getStaticProps = getI18nProps;

TrendingGraph.getLayout = (page: any) => {
  return <MainLayout title="Trending Graph">{page}</MainLayout>;
};
