import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import PageHeader from "@/shared/components/page-header";
import { Label } from "@/shared/components/ui/label";
import DateRangeFilter from "@/shared/components/date-range-filter";
import RegionalFilter from "@/shared/components/regional-filter";
import { Button } from "@/shared/components/ui/button";
import { ExternalLink, ListRestart, Search } from "lucide-react";
import dynamic from "next/dynamic";
import FilterSearch from "@/shared/components/filter-search";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import usePasswordMismatch from "@/hooks/password-mismatch/usePasswordMisMatch.hook";

const PasswordMisMatchMapContent = dynamic(
  import("../../features/Password-MisMatch/map"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const PasswordMismatch: NextPageWithLayout = () => {
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
    passwordMisMatchData,
    passwordMisMatchLoading,
    perPage,
    perPageHandler,
    pageChangeHandler,
    southWest,
    setSouthWest,
    northEast,
    setNorthEast,
    passwordMisMatchMap,
    passwordMisMatchMapLoading,
    exportPasswordMismatchMutation,
    exportHandler,
    searchTextHandler,
    searchTableTriggerHandler,
    zoomLevel,
    setZoomLevel,
  } = usePasswordMismatch();

  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title="Password Mismatch">
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
            <PasswordMisMatchMapContent
              loading={passwordMisMatchMapLoading}
              southWest={southWest}
              northEast={northEast}
              setSouthWest={setSouthWest}
              setNorthEast={setNorthEast}
              passwordMisMatchMap={passwordMisMatchMap}
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
                  exportPasswordMismatchMutation.isLoading ||
                  passwordMisMatchData?.data?.results.length === 0 ||
                  passwordMisMatchLoading
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
              data={passwordMisMatchData?.data?.results ?? []}
              loading={passwordMisMatchLoading}
              loadingDataNum={10}
              border
              headerSticky
              height="max-h-[calc(100vh-280px)]"
            />
            <DataTablePagination
              currentPage={passwordMisMatchData?.data?.currentPage || 1}
              pageChange={pageChangeHandler}
              totalPages={passwordMisMatchData?.data?.totalPages || 1}
              perPage={perPage}
              setPerPage={perPageHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordMismatch;

export const getStaticProps = getI18nProps;

PasswordMismatch.getLayout = (page) => <MainLayout>{page}</MainLayout>;
