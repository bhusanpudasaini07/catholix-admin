import { ListRestart, Search } from "lucide-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import React from "react";

import AgentDataList from "@/features/Agents/details/agent-data-list";
import AgentInfo from "@/features/Agents/details/agent-info";
import TransactionPerformanceChart from "@/features/Agents/details/transaction-performance-chart";
import { NextPageWithLayout } from "@/pages/_app";
import DateRangeFilter from "@/shared/components/date-range-filter";
import PageHeader from "@/shared/components/page-header";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { misMatched } from "@/shared/lib/image-config";
import MainLayout from "@/shared/main-layout";
import useAgentDetail from "@/hooks/agent/useAgentDetail.hook";

const AgentDetail: NextPageWithLayout = () => {
  const {
    dateRange,
    setDateRange,
    searchText,
    searchTextHandler,
    searchTriggerHandler,
    headerResetHandler,
    headerSearchTriggerHandler,
    agentChartDataLoading,
    chartOption,
    agentDetailTable,
    agentDetailTableLoading,
    pageChangeHandler,
    perPageHandler,
    perPage,
    agentDetailColumns,
    resetHandler,
  } = useAgentDetail();
  return (
    <div className="px-8 py-6">
      <PageHeader title="Agent Information" back backUrl="">
        {/* Filters */}
        <div className="flex justify-end items-start ml-3 grow">
          {/* <div className="flex gap-2 items-center">
            <Badge variant={"destructiveLight"} size={"lg"}>
              <Image
                src={misMatched.imei}
                alt="IMEI Mis-matched"
                width={24}
                height={24}
              />
              IMEI Mis-matched
            </Badge>
            <Badge variant={"warningDark"} size={"lg"}>
              <Image
                src={misMatched.password}
                alt="Password Mis-matched"
                width={24}
                height={24}
              />
              Password Mis-matched
              <div className="bg-red-50 py-0.5 px-2 rounded-md text-xs">5</div>
            </Badge>
          </div> */}
          <div className="flex gap-2 items-end px-5 py-2 rounded-lg bg-zinc-200">
            <div className="max-w-[250px]">
              <Label>Select Date Range</Label>
              <DateRangeFilter
                dateRange={dateRange}
                disabled
                setDateRange={setDateRange}
              />
            </div>
            {/* reset */}
            <Button
              variant={"white"}
              size={"sm"}
              className="gap-1 px-4 py-2 h-9"
              onClick={headerResetHandler}
            >
              <ListRestart size={20} />
              Reset
            </Button>
            {/* Search */}
            <Button
              variant={"primary"}
              size={"sm"}
              className="gap-1 px-4 py-2 h-9"
              onClick={headerSearchTriggerHandler}
            >
              <Search size={20} />
              Search
            </Button>
          </div>
        </div>
      </PageHeader>

      <div className="grid grid-cols-8 gap-8 max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="col-span-2">
          <AgentInfo />
        </div>
        <div className="col-span-6">
          <div className="grid grid-cols-1 gap-4">
            <TransactionPerformanceChart
              chartOption={chartOption}
              loading={agentChartDataLoading}
            />

            <AgentDataList
              searchText={searchText}
              searchTextHandler={searchTextHandler}
              searchTriggerHandler={searchTriggerHandler}
              resetHandler={resetHandler}
              columns={agentDetailColumns}
              agentDetailTable={agentDetailTable}
              loading={agentDetailTableLoading}
              pageChangeHandler={pageChangeHandler}
              perPageHandler={perPageHandler}
              perPage={perPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;

export const getServerSideProps = async ({ query, locale }: any) => {
  const paths = [
    {
      params: {
        id: query?.id,
      },
      locale,
    },
  ];

  const translations = await serverSideTranslations(locale, ["common"]); // Pass the locale argument to serverSideTranslations

  return {
    props: {
      ...translations,
      paths,
      fallback: false,
    },
  };
};

AgentDetail.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
