import DealerAgentsData from "@/features/Dealer/agents-data";
import DealerChart from "@/features/Dealer/dealer-chart";
import DealerInfo from "@/features/Dealer/dealer-info";
import DealerDevicesData from "@/features/Dealer/devices-data";
import DeviceModelsList from "@/features/Devices/details/models-list";
import useDealerDetail from "@/hooks/dealer/useDealerDetail.hook";
import { NextPageWithLayout } from "@/pages/_app";
import DateRangeFilter from "@/shared/components/date-range-filter";
import PageHeader from "@/shared/components/page-header";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import MainLayout from "@/shared/main-layout";
import { ListRestart, Search } from "lucide-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

const DealerDetail: NextPageWithLayout = () => {
  const {
    type,
    setType,
    dateRange,
    setDateRange,
    searchText,
    searchTextHandler,
    headerSearchTriggerHandler,
    headerResetHandler,
    resetHandler,
    searchTriggerHandler,
    perPage,
    perPageHandler,
    pageChangeHandler,
    deviceColumns,
    dealerTable,
    dealerTableLoading,
    chartOption,
    dealerChart,
    dealerChartLoading,
  } = useDealerDetail();

  return (
    <div className="px-8 py-6">
      <PageHeader title="Dealer Information" back backUrl="/?mapType=dealer">
        {/* Filters */}
        <div className="flex gap-2 items-end px-5 py-2 rounded-lg bg-zinc-200">
          <div className="max-w-[250px]">
            <Label>Select Date Range</Label>
            <DateRangeFilter
              dateRange={dateRange}
              setDateRange={setDateRange}
              disabled
            />
          </div>
          <div>
            <Label>Select Types</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent">Agents</SelectItem>
                <SelectItem value="device">Devices</SelectItem>
              </SelectContent>
            </Select>
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
          <DealerInfo />
        </div>
        <div className="col-span-6">
          {/* {type === "agents" ? <DealerAgentsData /> : <DealerDevicesData />} */}
          <div className="grid grid-cols-1 gap-4">
            <DealerChart
              loading={dealerChartLoading}
              chartOption={chartOption}
              type={dealerChart?.data[0]?.agents ? "agent" : "device"}
            />

            <DeviceModelsList
              searchText={searchText}
              searchTextHandler={searchTextHandler}
              searchTriggerHandler={searchTriggerHandler}
              resetHandler={resetHandler}
              columns={deviceColumns}
              deviceDetailTable={dealerTable}
              loading={dealerTableLoading}
              pageChangeHandler={pageChangeHandler}
              perPage={perPage}
              perPageHandler={perPageHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDetail;

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

DealerDetail.getLayout = (page) => <MainLayout>{page}</MainLayout>;
