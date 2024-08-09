import { ExternalLink, ListRestart, Search } from "lucide-react";
import React from "react";

import GANumberChart from "@/features/Device-Performance/ga-number-chart";
import GCPercentChart from "@/features/Device-Performance/gc-percent-chart";
import useDevicePerformance from "@/hooks/device-performance/useDevicePerformance.hook";
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

const DevicePerformance: NextPageWithLayout = () => {
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
    perPageHandler,
    pageChangeHandler,
    devicePerformanceColumns,
    devicePerformanceTable,
    devicePerformanceTableLoading,
    resetHandler,
    searchTriggerHandler,
    gaChartOption,
  } = useDevicePerformance();
  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title="Device Performance">
        {/* Filter */}
        <div className="flex gap-2 items-end px-5 py-2 rounded-lg bg-zinc-200">
          <div className="max-w-[250px]">
            <Label className="font-normal">Select Date Range</Label>
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
            hideLga
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
          <GANumberChart option={gaChartOption} />
        </div>

        <DataTable
          columns={devicePerformanceColumns}
          data={devicePerformanceTable?.data?.results ?? []}
          border
          loadingDataNum={10}
          loading={devicePerformanceTableLoading}
        />

        <div className="flex justify-between items-center">
          <Button
            variant={"white"}
            size={"md"}
            className="py-2.5 h-auto text-sm gap-2 mt-6"
          >
            <ExternalLink size={20} />
            Export
          </Button>

          <DataTablePagination
            currentPage={devicePerformanceTable?.data?.currentPage ?? 1}
            pageChange={pageChangeHandler}
            totalPages={devicePerformanceTable?.data?.totalPages ?? 1}
            perPage={perPage}
            setPerPage={perPageHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default DevicePerformance;

export const getStaticProps = getI18nProps;

DevicePerformance.getLayout = (page) => <MainLayout>{page}</MainLayout>;
