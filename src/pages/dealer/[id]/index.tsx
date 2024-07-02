import DealerAgentsData from "@/features/Dealer/agents-data";
import DealerInfo from "@/features/Dealer/dealer-info";
import DealerDevicesData from "@/features/Dealer/devices-data";
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
  const [type, setType] = useState("agents");
  return (
    <div className="px-8 py-6">
      <PageHeader title="Dealer Information" back backUrl="">
        {/* Filters */}
        <div className="flex gap-2 items-end px-5 py-2 rounded-lg bg-zinc-200">
          <div>
            <Label>Select Date Range</Label>
            {/* <DateRangeFilter
              dateRange={dateRange}
              setDateRange={setDateRange}
            /> */}
          </div>
          <div>
            <Label>Select Types</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agents">Agents</SelectItem>
                <SelectItem value="devices">Devices</SelectItem>
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

      <div className="grid grid-cols-8 gap-8 max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="col-span-2">
          <DealerInfo />
        </div>
        <div className="col-span-6">
          {type === "agents" ? <DealerAgentsData /> : <DealerDevicesData />}
          <div className="grid grid-cols-1 gap-4">
            {/* <TransactionPerformanceChart />

            <AgentDataList
              searchText={searchText}
              searchTextHandler={searchTextHandler}
              searchTriggerHandler={searchTriggerHandler}
            /> */}
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
