import React from "react";
import {
  ExternalLink,
  ListRestart,
  MoveDownRight,
  MoveUpRight,
  Search,
} from "lucide-react";

import useAgentPerformance from "@/hooks/conversion-report/useAgentPerformance.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import DateRangeFilter from "@/shared/components/date-range-filter";
import PageHeader from "@/shared/components/page-header";
import RegionalFilter from "@/shared/components/regional-filter";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import { NextPageWithLayout } from "../_app";
import FullTableSkeleton from "@/shared/components/skeleton-loading/dynamic-header-table-skeleton";

const ConversionRateAgentPerformance: NextPageWithLayout = () => {
  const {
    highColumns,
    lowColumns,
    perPage,
    perPageHandler,
    pageChangeHandler,
    searchHandler,
    resetHandler,
    regionId,
    stateId,
    setRegionId,
    setStateId,
    lga,
    setLga,
    dateRange,
    setDateRange,
    agentPerformanceData,
    agentPerformanceLoading,
    exportMutation,
    exportHandler,
  } = useAgentPerformance();

  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title="Conversion Performance">
        {/* Filters */}
        <div className="flex gap-2 items-end px-5 py-2 rounded-lg bg-zinc-200">
          <div className="max-w-[250px]">
            <Label className="block mb-1.5 font-medium">
              Select Date Range
            </Label>
            <DateRangeFilter
              dateRange={dateRange}
              setDateRange={setDateRange}
              disabled
            />
          </div>

          <RegionalFilter
            regionId={regionId}
            stateId={stateId}
            setRegionId={setRegionId}
            setStateId={setStateId}
            lga={lga}
            setLga={setLga}
            searchTriggerHandler={searchHandler}
          />

          {/* reset */}
          <Button
            variant={"white"}
            size={"sm"}
            className="gap-1 px-4 py-2 h-9"
            onClick={resetHandler}
          >
            <ListRestart size={20} />
            Reset
          </Button>
          {/* Search */}
          <Button
            variant={"primary"}
            size={"sm"}
            className="gap-1 px-4 py-2 h-9"
            onClick={searchHandler}
          >
            <Search size={20} />
            Search
          </Button>
        </div>
      </PageHeader>

      <div className="overflow-y-auto grow no-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-green-400">
            <h3 className="flex gap-2 items-center px-4 py-4 -mb-6 text-base font-medium bg-green-100">
              High Conversion Agents
              <MoveUpRight size={20} className="text-green-700" />
            </h3>
            {agentPerformanceLoading ? (
              <FullTableSkeleton />
            ) : (
              <DataTable
                columns={highColumns}
                data={
                  agentPerformanceData?.data?.data?.high_conversion_agent || []
                }
                headerSticky
                border
                height="max-h-[calc(100vh-280px)]"
                loading={agentPerformanceLoading}
                loadingDataNum={5}
              />
            )}
          </div>
          <div className="border border-red-400">
            <h3 className="flex gap-2 items-center px-4 py-4 -mb-6 text-base font-medium bg-red-100">
              Less Conversion Agents
              <MoveDownRight size={20} className="text-red-600" />
            </h3>
            {agentPerformanceLoading ? (
              <FullTableSkeleton />
            ) : (
              <DataTable
                columns={lowColumns}
                data={
                  agentPerformanceData?.data?.data?.less_conversion_agent || []
                }
                headerSticky
                border
                height="max-h-[calc(100vh-280px)]"
                loading={agentPerformanceLoading}
                loadingDataNum={5}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Button
            variant={"white"}
            size={"md"}
            onClick={exportHandler}
            disabled={
              exportMutation.isLoading ||
              (!agentPerformanceData?.data?.data?.high_conversion_agent
                ?.length &&
                !agentPerformanceData?.data?.data?.less_conversion_agent
                  ?.length) ||
              agentPerformanceLoading
            }
            className="py-2.5 h-auto text-sm gap-2 mt-6 "
          >
            <ExternalLink size={20} />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversionRateAgentPerformance;

export const getStaticProps = getI18nProps;

ConversionRateAgentPerformance.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
