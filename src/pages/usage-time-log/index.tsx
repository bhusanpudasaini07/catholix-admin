import useUsageTimeLog from "@/hooks/report/useUsageTimeLog.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import FilterSearch from "@/shared/components/filter-search";
import PageHeader from "@/shared/components/page-header";
import { Button } from "@/shared/components/ui/button";
import DatePicker from "@/shared/components/ui/date-picker";
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
    date,
    dateChangeHandler,
  } = useUsageTimeLog();
  return (
    <div className="px-8 py-6">
      <PageHeader title={"Usage Time Log"}>
        <DatePicker
          date={date}
          setDate={(e: Date) => dateChangeHandler(e)}
          mode="single"
          className="text-sm"
        />
      </PageHeader>

      <DataTable
        columns={usageTimeLogColumns}
        data={usageTimeLogList?.data?.results || []}
        loading={usageTimeLogListLoading}
        loadingDataNum={10}
        border
        headerSticky
        height="max-h-[calc(100vh-270px)]"
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
