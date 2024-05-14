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
    setSourceOption,
    sourceOption,
    marketsPieChartOption,
    marketBarChartOption,
    pieChartRef,
    marketColumn,
    allMarketBarOption,
    allSankeyOption,
    marketLoading,
    marketOverallData,
    dateRangeOpen,
    setDateRangeOpen,
    changeDate,
    date,
    allMarketProjects,
    getProjectsByMarket,
    getIndividualSankeyOption,
    getIndividualMarketBarOption,
    statusOption,
    setStatusOption,
    setDate,
  } = useMarket();
  return (
    <>
      <MarketHeader
        dateRangeOpen={dateRangeOpen}
        setDateRangeOpen={setDateRangeOpen}
        changeDate={changeDate}
        setDate={setDate}
        date={date}
        sourceOption={sourceOption}
        setSourceOption={setSourceOption}
        statusOption={statusOption}
        setStatusOption={setStatusOption}
      />

      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto scroll-smooth">
        <div className="grid grid-cols-1 gap-4">
          <MarketOverallStats
            pieChartRef={pieChartRef}
            marketBarChartOption={marketBarChartOption}
            marketsPieChartOption={marketsPieChartOption}
            marketStats={marketOverallData ?? []}
            marketLoading={marketLoading}
          />
          <IndividualMarketCard
            marketTitle="All"
            tableData={allMarketProjects?.slice().sort((a, b) => b.rp - a.rp)}
            individualMarketBarOption={allMarketBarOption}
            individualSankeyOption={allSankeyOption}
            marketColumn={marketColumn}
          />

          {marketOverallData?.map((market: any) => (
            <IndividualMarketCard
              key={market?.id}
              marketTitle={getProjectsByMarket(market?.id)?.market_info?.name}
              marketFlag={getProjectsByMarket(market?.id)?.market_info?.flag}
              tableData={getProjectsByMarket(market?.id)?.sortedProjects}
              individualMarketBarOption={getIndividualMarketBarOption(
                market?.id
              )}
              individualSankeyOption={getIndividualSankeyOption(market?.id)}
              marketColumn={marketColumn}
            />
          ))}
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
