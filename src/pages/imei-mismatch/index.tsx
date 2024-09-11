import { ExternalLink, ListRestart, Search } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

import useImeiMismatch from "@/hooks/imei-mismatch/useImeiMismatch.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import DateRangeFilter from "@/shared/components/date-range-filter";
import FilterSearch from "@/shared/components/filter-search";
import PageHeader from "@/shared/components/page-header";
import RegionalFilter from "@/shared/components/regional-filter";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";

const ImeiMisMatchMapContent = dynamic(
  import("../../features/Imei-MisMatch/map"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const ImeiMismatch: NextPageWithLayout = () => {
  const {
    dateRange,
    setDateRange,
    regionId,
    setRegionId,
    stateId,
    setStateId,
    lga,
    setLga,
    resetHandler,
    searchTriggerHandler,
    searchText,
    setSearchText,
    columns,
    imeiMisMatchData,
    imeiMisMatchLoading,
    perPage,
    perPageHandler,
    pageChangeHandler,
    southWest,
    setSouthWest,
    northEast,
    setNorthEast,
    imeiMisMatchMap,
    imeiMisMatchMapLoading,
    exportImeiMismatchMutation,
    exportHandler,
    searchTextHandler,
    searchTableTriggerHandler,
    zoomLevel,
    setZoomLevel,
  } = useImeiMismatch();
  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title="IMEI Mismatch">
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
            <ImeiMisMatchMapContent
              loading={imeiMisMatchMapLoading}
              southWest={southWest}
              setSouthWest={setSouthWest}
              northEast={northEast}
              setNorthEast={setNorthEast}
              imeiMisMatchMap={imeiMisMatchMap}
              zoomLevel={zoomLevel}
              setZoomLevel={setZoomLevel}
            />
          </div>
          {/* Table Filters */}
          <div>
            <div className="flex gap-2 items-center">
              <Button
                variant={"white"}
                size={"md"}
                onClick={exportHandler}
                disabled={
                  exportImeiMismatchMutation.isLoading ||
                  imeiMisMatchData?.data?.results.length === 0 ||
                  imeiMisMatchLoading
                }
                className="py-2.5 h-auto text-sm gap-2 "
              >
                <ExternalLink size={20} />
                Export
              </Button>

              <div className="flex gap-1 justify-end items-center ml-2 grow">
                <FilterSearch
                  className="h-10 max-w-[300px]"
                  setSearchText={searchTextHandler}
                  searchText={searchText}
                  handleClick={searchTableTriggerHandler}
                />
                <Button variant={"primary"} onClick={searchTableTriggerHandler}>
                  <Search size={20} />
                  Search
                </Button>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={imeiMisMatchData?.data?.results ?? []}
              loading={imeiMisMatchLoading}
              loadingDataNum={10}
              border
              height="max-h-[calc(100vh-280px)]"
            />
            <DataTablePagination
              currentPage={imeiMisMatchData?.data?.currentPage || 1}
              pageChange={pageChangeHandler}
              totalPages={imeiMisMatchData?.data?.totalPages || 1}
              perPage={perPage}
              setPerPage={perPageHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = getI18nProps;

export default ImeiMismatch;

ImeiMismatch.getLayout = (page) => <MainLayout>{page}</MainLayout>;
