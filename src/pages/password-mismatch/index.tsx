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
import usePasswordMisMatch from "@/hooks/password-mismatch/usePasswordMisMatch.hook";
import dynamic from "next/dynamic";
import FilterSearch from "@/shared/components/filter-search";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";

const PasswordMisMatchMapContent = dynamic(
  import("../../features/LGA-Performance/lga-performance-map"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const PasswordMisMatch: NextPageWithLayout = () => {
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
  } = usePasswordMisMatch();
  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title="Password Mismatch">
        <div className="flex gap-2 items-end px-5 py-2 rounded-lg bg-zinc-200">
          <div className="w-[250px]">
            <Label className="block mb-2 font-medium">Select Date Range</Label>
            <DateRangeFilter
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
          <RegionalFilter
            regionId={regionId}
            setRegionId={setRegionId}
            stateId={stateId}
            setStateId={setStateId}
            setLga={setLga}
            lga={lga}
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
            <PasswordMisMatchMapContent />
          </div>
          {/* Table Filters */}
          <div>
            <div className="flex gap-2 items-center">
              <Button
                variant={"white"}
                size={"md"}
                className="py-2.5 h-auto text-sm gap-2 "
              >
                <ExternalLink size={20} />
                Export
              </Button>

              <FilterSearch
                className="max-w-[400px] ml-auto"
                searchText={searchText}
                setSearchText={setSearchText}
              />
            </div>
            <DataTable columns={columns} data={[]} border />
            <DataTablePagination
              currentPage={1}
              pageChange={() => {}}
              totalPages={10}
              perPage={10}
              setPerPage={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordMisMatch;

export const getStaticProps = getI18nProps;

PasswordMisMatch.getLayout = (page) => <MainLayout>{page}</MainLayout>;
