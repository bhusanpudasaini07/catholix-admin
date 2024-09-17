import { ExternalLink, ListRestart, Search } from "lucide-react";
import React from "react";

import useConversionRateDealer from "@/hooks/conversion-report/useConversionRateDealer.hook";
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

const ConversionRateDealers: NextPageWithLayout = () => {
  const {
    columns,
    perPage,
    page,
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
    conversionRateData,
    conversionRateLoading,
    exportMutation,
    exportHandler,
  } = useConversionRateDealer();

  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title="Conversion Rate Dealers">
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
        <DataTable
          columns={columns}
          data={conversionRateData?.data?.data?.results ?? []}
          loading={conversionRateLoading}
          loadingDataNum={10}
          headerSticky
          border
          height="max-h-[calc(100vh-230px)]"
        />
        <div className="flex justify-between items-center">
          <Button
            variant={"white"}
            size={"md"}
            className="py-2.5 h-auto text-sm gap-2 mt-6 "
            onClick={exportHandler}
            disabled={
              exportMutation.isLoading ||
              conversionRateData?.data?.data?.results.length === 0 ||
              conversionRateLoading
            }
          >
            <ExternalLink size={20} />
            Export
          </Button>
          <DataTablePagination
            currentPage={conversionRateData?.data?.data?.currentPage || 1}
            pageChange={pageChangeHandler}
            totalPages={conversionRateData?.data?.data?.totalPages || 1}
            perPage={perPage}
            setPerPage={perPageHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ConversionRateDealers;

export const getStaticProps = getI18nProps;

ConversionRateDealers.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
