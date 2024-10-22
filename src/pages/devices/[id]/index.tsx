import { ListRestart, Search } from "lucide-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import DeviceInfo from "@/features/Devices/details/device-info";
import DeviceModelsList from "@/features/Devices/details/models-list";
import RegistrationChart from "@/features/Devices/details/registration-chart";
import useDeviceDetail from "@/hooks/devices/useDeviceDetail.hook";
import { NextPageWithLayout } from "@/pages/_app";
import DateRangeFilter from "@/shared/components/date-range-filter";
import PageHeader from "@/shared/components/page-header";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import MainLayout from "@/shared/main-layout";

const DeviceDetail: NextPageWithLayout = () => {
  const {
    dateRange,
    setDateRange,
    searchText,
    searchTextHandler,
    searchTriggerHandler,
    resetHandler,
    deviceDetailColumns,
    deviceDetailTable,
    deviceDetailTableLoading,
    headerResetHandler,
    headerSearchTriggerHandler,
    pageChangeHandler,
    perPageHandler,
    perPage,
    chartOption,
    deviceChartDataLoading,
    exportHandler,
    exportMutation,
  } = useDeviceDetail();
  return (
    <div className="px-8 py-6">
      <PageHeader title="Device Information" back backUrl="">
        {/* Filters */}
        <div className="flex gap-2 items-end px-5 py-2 rounded-lg bg-zinc-200">
          <div className="max-w-[250px]">
            <Label className="block mb-1.5 font-medium">
              Select Date Range
            </Label>
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
      </PageHeader>

      <div className="grid grid-cols-8 gap-8 max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="col-span-2">
          <DeviceInfo />
        </div>
        <div className="col-span-6">
          <div className="grid grid-cols-1 gap-4">
            <RegistrationChart
              chartOption={chartOption}
              loading={deviceChartDataLoading}
            />

            <DeviceModelsList
              exportHandler={exportHandler}
              exportLoading={exportMutation.isLoading}
              searchText={searchText}
              searchTextHandler={searchTextHandler}
              searchTriggerHandler={searchTriggerHandler}
              resetHandler={resetHandler}
              columns={deviceDetailColumns}
              deviceDetailTable={deviceDetailTable}
              perPage={perPage}
              loading={deviceDetailTableLoading}
              pageChangeHandler={pageChangeHandler}
              perPageHandler={perPageHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetail;

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

DeviceDetail.getLayout = (page) => <MainLayout>{page}</MainLayout>;
