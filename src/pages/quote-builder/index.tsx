import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";
import { NextPageWithLayout } from "../_app";
import UnitCalculatorHeader from "@/features/Unit-Calculator/unit-calc-header";
import QuoteGeneration from "@/features/Unit-Calculator/quote-generation";

const UnitCalculator: NextPageWithLayout = () => {
  return (
    <>
      <UnitCalculatorHeader />
      <div className="p-6 max-h-[calc(100vh-115px)]">
        <QuoteGeneration />
      </div>
    </>
  );
};

export default UnitCalculator;
export const getStaticProps = getI18nProps;

UnitCalculator.getLayout = (page) => {
  return <MainLayout title="Leave Requests">{page}</MainLayout>;
};
