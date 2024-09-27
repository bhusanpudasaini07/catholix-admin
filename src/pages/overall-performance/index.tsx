import { ExternalLink, ListRestart, Search } from "lucide-react";
import React from "react";

import useOverallPerformanceHook from "@/hooks/overall-performance/useOverallPerformance.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import DateRangeFilter from "@/shared/components/date-range-filter";
import PageHeader from "@/shared/components/page-header";
import RegionalFilter from "@/shared/components/regional-filter";
import FullTableSkeleton from "@/shared/components/skeleton-loading/dynamic-header-table-skeleton";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";

const OverallPerformance: NextPageWithLayout = () => {
  const {
    columns,
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
    overallPerformanceData,
    overallPerformanceLoading,
    exportMutation,
    exportHandler,
  } = useOverallPerformanceHook();

  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title="Overall Performance">
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
        {overallPerformanceLoading ? (
          <FullTableSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={overallPerformanceData?.data?.data?.results || []}
            headerSticky
            border
            height="max-h-[calc(100vh-230px)]"
            loading={overallPerformanceLoading}
            loadingDataNum={10}
          />
        )}
        <div className="flex justify-between items-center">
          <Button
            variant={"white"}
            size={"md"}
            onClick={exportHandler}
            disabled={
              exportMutation.isLoading ||
              overallPerformanceData?.data?.data?.results?.length === 0 ||
              overallPerformanceLoading
            }
            className="py-2.5 h-auto text-sm gap-2 mt-6 "
          >
            <ExternalLink size={20} />
            Export
          </Button>
          <DataTablePagination
            currentPage={overallPerformanceData?.data?.data?.currentPage || 1}
            pageChange={pageChangeHandler}
            totalPages={overallPerformanceData?.data?.data?.totalPages || 1}
            perPage={perPage}
            setPerPage={perPageHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default OverallPerformance;

export const getStaticProps = getI18nProps;

OverallPerformance.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
