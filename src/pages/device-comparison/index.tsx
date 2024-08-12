import React from "react";

import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";
import PageHeader from "@/shared/components/page-header";
import DateComparisonFilter from "@/shared/components/date-comparison";
import RegionalFilter from "@/shared/components/regional-filter";
import { Button } from "@/shared/components/ui/button";
import { ExternalLink, ListRestart, Search } from "lucide-react";
import GCPercentChart from "@/features/Device-Performance/gc-percent-chart";
import GANumberChart from "@/features/Device-Performance/ga-number-chart";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import useDeviceComparison from "@/hooks/device-comparison/useDeviceComparison.hook";
import { Skeleton } from "@/shared/components/ui/skeleton";

const DeviceComparison: NextPageWithLayout = () => {
  const {
    from,
    to,
    setFrom,
    setTo,
    lga,
    setLga,
    regionId,
    setRegionId,
    stateId,
    setStateId,
    resetHandler,
    searchTriggerHandler,
    deviceComparisonColumns,
    deviceComparisonData,
    deviceComparisonLoading,
    perPage,
    pageChangeHandler,
    perPageHandler,
    deviceComparisonChartOption,
    deviceComparisonChartLoading,
    exportHandler,
  } = useDeviceComparison();
  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title="Device Comparison">
        {/* Filter */}
        <div className="flex gap-2 items-end px-5 py-2 rounded-lg bg-zinc-200">
          <DateComparisonFilter
            setFrom={setFrom}
            setTo={setTo}
            from={from}
            to={to}
          />

          <RegionalFilter
            regionId={regionId}
            setRegionId={setRegionId}
            stateId={stateId}
            setStateId={setStateId}
            setLga={setLga}
            lga={lga}
            hideLga
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
      <div className="overflow-y-auto grow no-scrollbar">
        <div className="grid grid-cols-5 gap-4">
          <GCPercentChart option={{}} />

          {deviceComparisonChartLoading ? (
            <div className="col-span-2">
              <Skeleton className="w-full h-[250px]" />
            </div>
          ) : (
            <GANumberChart option={deviceComparisonChartOption} />
          )}
        </div>

        <DataTable
          columns={deviceComparisonColumns}
          data={deviceComparisonData?.data?.results ?? []}
          loading={deviceComparisonLoading}
          loadingDataNum={10}
          border
        />

        <div className="flex justify-between items-center">
          <Button
            variant={"white"}
            size={"md"}
            className="py-2.5 h-auto text-sm gap-2 mt-6"
            onClick={exportHandler}
          >
            <ExternalLink size={20} />
            Export
          </Button>

          <DataTablePagination
            currentPage={deviceComparisonData?.data?.currentPage ?? 1}
            pageChange={pageChangeHandler}
            totalPages={deviceComparisonData?.data?.totalPages ?? 1}
            perPage={perPage}
            setPerPage={perPageHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default DeviceComparison;

export const getStaticProps = getI18nProps;

DeviceComparison.getLayout = (page) => <MainLayout>{page}</MainLayout>;
