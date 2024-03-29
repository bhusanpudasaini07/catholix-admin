import React from "react";

import IndividualMarketCard from "@/features/Market/individual-market-card";
import MarketHeader from "@/features/Market/market-header";
import MarketOverallStats from "@/features/Market/market-overall-stats";
import useMarket from "@/hooks/market/useMarket.hook";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";

const Market: NextPageWithLayout = () => {
  const {
    tabItem,
    setTabItem,
    marketsPieChartOption,
    marketBarChartOption,
    pieChartRef,
    marketColumn,
    individualMarketBarOption,
    individualSankeyOption,
  } = useMarket();
  return (
    <>
      <MarketHeader />

      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid grid-cols-1 gap-4">
          <MarketOverallStats
            pieChartRef={pieChartRef}
            marketBarChartOption={marketBarChartOption}
            marketsPieChartOption={marketsPieChartOption}
          />
          <IndividualMarketCard
            individualMarketBarOption={individualMarketBarOption}
            individualSankeyOption={individualSankeyOption}
            tabItem={tabItem}
            setTabItem={setTabItem}
            marketColumn={marketColumn}
          />
        </div>
      </div>
    </>
  );
};

export default Market;

export const getStaticProps = getI18nProps;

Market.getLayout = (page) => {
  return <MainLayout title="Market">{page}</MainLayout>;
};
