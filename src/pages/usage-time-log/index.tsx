import useUsageTimeLog from "@/hooks/report/useUsageTimeLog.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import DateRangeFilter from "@/shared/components/date-range-filter";
import FilterSearch from "@/shared/components/filter-search";
import PageHeader from "@/shared/components/page-header";
import RegionalFilter from "@/shared/components/regional-filter";
import FullTableSkeleton from "@/shared/components/skeleton-loading/dynamic-header-table-skeleton";
import { Button } from "@/shared/components/ui/button";
import DatePicker from "@/shared/components/ui/date-picker";
import { Label } from "@/shared/components/ui/label";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import { ListRestart, Search } from "lucide-react";
import React from "react";

const UsageTimeLog = () => {
  const {
    searchTerm,
    searchTermHandler,
    resetHandler,
    searchHandler,
    perPageHandler,
    pageChangeHandler,
    perPage,
    usageTimeLogColumns,
    usageTimeLogList,
    usageTimeLogListLoading,
    dateRange,
    setDateRange,
    region,
    setRegion,
    state,
    setState,
    lga,
    setLga,
    transformedData,
  } = useUsageTimeLog();
  return (
    <div className="px-8 py-6">
      <PageHeader title={"Usage Time Log"}>
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
            regionId={region}
            stateId={state}
            setRegionId={setRegion}
            setStateId={setState}
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
        {/* <DateRangeFilter
          dateRange={dateRange}
          setDateRange={setDateRange}
          disabled
        />
        <RegionalFilter
          regionId={region}
          setRegionId={setRegion}
          stateId={state}
          setStateId={setState}
          lga={lga}
          setLga={setLga}
          searchTriggerHandler={searchHandler}
        /> */}
      </PageHeader>

      {usageTimeLogListLoading ? (
        <FullTableSkeleton />
      ) : (
        <DataTable
          columns={usageTimeLogColumns}
          data={transformedData || []}
          loading={usageTimeLogListLoading}
          loadingDataNum={10}
          border
          headerSticky
          height="max-h-[calc(100vh-280px)]"
        >
          {/* Filter */}
          <div className="flex gap-1 justify-end items-center grow">
            {/* Search */}
            <FilterSearch
              className="h-10 max-w-[500px]"
              searchText={searchTerm}
              setSearchText={searchTermHandler}
              handleClick={searchHandler}
            />
            <Button variant={"secondary"} onClick={resetHandler}>
              <ListRestart size={20} />
              Reset
            </Button>
            <Button variant={"primary"} onClick={searchHandler}>
              <Search size={20} />
              Search
            </Button>
          </div>
        </DataTable>
      )}

      <DataTablePagination
        currentPage={usageTimeLogList?.data?.currentPage || 1}
        totalPages={usageTimeLogList?.data?.totalPages || 1}
        setPerPage={perPageHandler}
        perPage={perPage}
        pageChange={pageChangeHandler}
      />
    </div>
  );
};

export default UsageTimeLog;

export const getStaticProps = getI18nProps;

UsageTimeLog.getLayout = (page: React.ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};
