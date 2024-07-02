import { ListRestart, Search } from "lucide-react";
import React from "react";

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
import InactiveDeviceStats from "@/features/Inactive-Devices/device-stats";
import InactiveDeviceList from "@/features/Inactive-Devices/inactive-list";
import dynamic from "next/dynamic";

const InactiveMapContent = dynamic(
  () => import("@/features/Inactive-Devices/inactive-map"),
  {
    ssr: false,
  }
);

const InactiveDevices: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title="Inactive Devices" back backUrl="">
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

      <div className="grid overflow-auto grid-cols-12 gap-9 grow no-scrollbar">
        <div className="col-span-2">
          <InactiveDeviceStats />
        </div>
        <div className="col-span-5">
          <InactiveMapContent />
        </div>
        <div className="col-span-5">
          <InactiveDeviceList />
        </div>
      </div>
    </div>
  );
};

export default InactiveDevices;

export const getStaticProps = getI18nProps;

InactiveDevices.getLayout = (page) => <MainLayout>{page}</MainLayout>;
