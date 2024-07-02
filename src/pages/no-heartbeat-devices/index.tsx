import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import PageHeader from "@/shared/components/page-header";
import RegionalFilter from "@/shared/components/regional-filter";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { ListRestart, Search } from "lucide-react";
import dynamic from "next/dynamic";
import NoHeartbeatDeviceStats from "@/features/NoHeartbeat-Devices/device-stats";
import NoHeartbeatDeviceList from "@/features/NoHeartbeat-Devices/noheartbeat-list";

const NoHeartbeatMapContent = dynamic(
  () => import("@/features/NoHeartbeat-Devices/noheartbeat-map"),
  {
    ssr: false,
  }
);

const NoHeartBeatDevices: NextPageWithLayout = () => {
  return (
    <div className="px-8 py-6">
      <PageHeader title="No Heartbeat Devices" back backUrl="">
        <div className="flex gap-2 items-end px-5 py-2 rounded-lg bg-zinc-200">
          {/* <div>
        <Label>Select Date Range</Label>
        <DateRangeFilter
        //   dateRange={dateRange}
        //   setDateRange={setDateRange}
        />
      </div> */}
          <RegionalFilter
            setLga={() => {}}
            setStateId={() => {}}
            setRegionId={() => {}}
            lga={[]}
            stateId={""}
            regionId={""}
          />
          <div className="flex flex-col gap-2">
            <Label>Select Time Frame</Label>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* reset */}
          <Button
            variant={"white"}
            size={"sm"}
            className="gap-1 px-4 py-2 h-9"
            // onClick={resetHandler}
          >
            <ListRestart size={20} />
            Reset
          </Button>
          {/* Search */}
          <Button
            variant={"primary"}
            size={"sm"}
            className="gap-1 px-4 py-2 h-9"
            // onClick={searchTriggerHandler}
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
          <NoHeartbeatMapContent />
        </div>
        <div className="col-span-5">
          <NoHeartbeatDeviceList />
        </div>
      </div>
    </div>
  );
};

export default NoHeartBeatDevices;
export const getStaticProps = getI18nProps;

NoHeartBeatDevices.getLayout = (page) => <MainLayout>{page}</MainLayout>;
