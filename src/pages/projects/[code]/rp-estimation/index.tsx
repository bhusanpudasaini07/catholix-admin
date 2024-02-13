import RpEstimationContent from "@/features/Projects/rp-estimation";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import React from "react";

const RpEstimation: NextPageWithLayout = () => {
  return <RpEstimationContent />;
};

export default RpEstimation;

RpEstimation.getLayout = (page) => {
  return <MainLayout title="RP Estimation">{page}</MainLayout>;
};
