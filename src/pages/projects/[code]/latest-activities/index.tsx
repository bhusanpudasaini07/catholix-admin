import LatestActivitiesContent from "@/features/Projects/latest-activities";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import React from "react";

const LatestActivities: NextPageWithLayout = () => {
  return <LatestActivitiesContent />;
};

export default LatestActivities;

LatestActivities.getLayout = (page) => {
  return <MainLayout title="Latest Activities">{page}</MainLayout>;
};
