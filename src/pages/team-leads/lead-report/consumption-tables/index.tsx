import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const ConsumptionTable = () => {
  return <div>ConsumptionTable</div>;
};

export default ConsumptionTable;
export const getStaticProps = getI18nProps;

ConsumptionTable.getLayout = (page: any) => {
  return <MainLayout title="Consumption Table">{page}</MainLayout>;
};
