import { ListRestart, Search } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

import NoHeartbeatDeviceStats from "@/features/NoHeartbeat-Devices/device-stats";
import NoHeartbeatDeviceList from "@/features/NoHeartbeat-Devices/noheartbeat-list";
import DateRangeFilter from "@/shared/components/date-range-filter";
import PageHeader from "@/shared/components/page-header";
import RegionalFilter from "@/shared/components/regional-filter";
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
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";
import useNoHeartbeatDevices from "@/hooks/devices/useNoHeartbeatDevices.hook";

const NoHeartbeatMapContent = dynamic(
  () => import("@/features/NoHeartbeat-Devices/noheartbeat-map"),
  {
    ssr: false,
  }
);

const NoHeartBeatDevices: NextPageWithLayout = () => {
  const {
    regionId,
    stateId,
    lga,
    setRegionId,
    setStateId,
    setLga,
    searchTriggerHandler,
    resetHandler,
    dateRange,
    setDateRange,
    timeFrame,
    setTimeFrame,
    perPage,
    noHeartbeatDeviceColumns,
    pageChangeHandler,
    perPageHandler,
    noHeartbeatDevices,
    noHeartbeatDevicesLoading,
    searchTextHandler,
    searchTableTriggerHandler,
    searchText,
    southWest,
    northEast,
    setSouthWest,
    setNorthEast,
    noHeartbeatDevicesMap,
    applyColumns,
    noHeartbeatDevicesMapLoading,
  } = useNoHeartbeatDevices();
  const timeFrameOptions = [
    { value: "all", label: "All" },
    { value: "2", label: "2 Days" },
    { value: "5", label: "5 Days" },
    { value: "7", label: "7 Days" },
    { value: "10", label: "10 Days" },
    { value: "15", label: "15 Days" },
    { value: "more_than_month", label: "More Than Months" },
  ];
  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title="No Heartbeat Devices" back backUrl="">
        <div className="flex gap-2 justify-end items-end px-5 py-2 ml-auto rounded-lg 2xl:w-auto bg-zinc-200">
          <div className="w-[240px]">
            <Label>Select Date Range</Label>
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
            searchTriggerHandler={searchTriggerHandler}
          />
          <div className="flex flex-col gap-2">
            <Label>Select Time Frame</Label>
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeFrameOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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

      <div className="grid grid-cols-12 gap-9 h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="col-span-2">
          <NoHeartbeatDeviceStats />
        </div>
        <div className="col-span-5">
          <NoHeartbeatMapContent
            loading={noHeartbeatDevicesMapLoading}
            southWest={southWest}
            northEast={northEast}
            setSouthWest={setSouthWest}
            setNorthEast={setNorthEast}
            inactiveDeviceData={noHeartbeatDevicesMap}
          />
        </div>
        <div className="col-span-5">
          <NoHeartbeatDeviceList
            pageChange={pageChangeHandler}
            perPage={perPage}
            perPageChange={perPageHandler}
            noHeartbeatDeviceColumns={noHeartbeatDeviceColumns}
            noHeartbeatDevices={noHeartbeatDevices}
            noHeartbeatDevicesLoading={noHeartbeatDevicesLoading}
            searchTextHandler={searchTextHandler}
            searchTableTriggerHandler={searchTableTriggerHandler}
            searchText={searchText}
            applyColumns={applyColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default NoHeartBeatDevices;
export const getStaticProps = getI18nProps;

NoHeartBeatDevices.getLayout = (page) => <MainLayout>{page}</MainLayout>;
