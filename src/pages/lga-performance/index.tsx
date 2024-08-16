import { ExternalLink, ListRestart, Search } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

import useLgaPerformance from "@/hooks/lga-performance/useLgaPerformance.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import FilterSearch from "@/shared/components/filter-search";
import PageHeader from "@/shared/components/page-header";
import RegionalFilter from "@/shared/components/regional-filter";
import { Button } from "@/shared/components/ui/button";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";
import DateRangeFilter from "@/shared/components/date-range-filter";
import { Label } from "@/shared/components/ui/label";

const LGAMapContent = dynamic(
  import("../../features/LGA-Performance/lga-performance-map"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const LGAPerformance: NextPageWithLayout = () => {
  const {
    dateRange,
    setDateRange,
    regionId,
    setRegionId,
    stateId,
    setStateId,
    perPage,
    lga,
    setLga,
    resetHandler,
    pageChangeHandler,
    perPageHandler,
    lgaPerformanceColumns,
    searchText,
    setSearchText,
    setSouthWest,
    setNorthEast,

    searchTriggerHandler,
    lgaPerformanceData,
    lgaPerformanceLoading,
    exportHandler,
    exportPerformanceLgaMutation,
    lgaPerformanceMap,
    lgaPerformanceMapLoading,
  } = useLgaPerformance();

  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title="Performance by LGA">
        {/* Filter */}
        <div className="flex gap-2 items-end px-5 py-2 rounded-lg bg-zinc-200">
          <div className="w-[250px]">
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
            setRegionId={setRegionId}
            stateId={stateId}
            setStateId={setStateId}
            setLga={setLga}
            lga={lga}
            searchTriggerHandler={searchTriggerHandler}
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
            onClick={searchTriggerHandler}
          >
            <Search size={20} />
            Search
          </Button>
        </div>
      </PageHeader>

      <div className="grow">
        <div className="grid grid-cols-2 gap-4 h-full">
          {/* Map */}
          <div>
            <LGAMapContent
              loading={lgaPerformanceMapLoading}
              lgaPerformanceMap={lgaPerformanceMap}
              setSouthWest={setSouthWest}
              setNorthEast={setNorthEast}
            />
          </div>
          {/* Table Filters */}
          <div>
            <div className="flex gap-2 items-center">
              <Button
                variant={"white"}
                size={"md"}
                className="py-2.5 h-auto text-sm gap-2 "
                onClick={exportHandler}
                disabled={exportPerformanceLgaMutation.isLoading}
              >
                <ExternalLink size={20} />
                Export
              </Button>

              <FilterSearch
                className="max-w-[400px] ml-auto"
                searchText={searchText}
                setSearchText={setSearchText}
              />
            </div>
            <DataTable
              columns={lgaPerformanceColumns}
              data={lgaPerformanceData?.data.results ?? []}
              border
              loading={lgaPerformanceLoading}
              loadingDataNum={10}
              headerSticky
              height="max-h-[calc(100vh-280px)]"
            />
            <DataTablePagination
              currentPage={lgaPerformanceData?.data.currentPage ?? 1}
              pageChange={pageChangeHandler}
              totalPages={lgaPerformanceData?.data.totalPages ?? 1}
              perPage={perPage}
              setPerPage={perPageHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LGAPerformance;

export const getStaticProps = getI18nProps;

LGAPerformance.getLayout = (page) => <MainLayout>{page}</MainLayout>;
