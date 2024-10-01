import useActivityLog from "@/hooks/report/useActivityLog.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import FilterSearch from "@/shared/components/filter-search";
import PageHeader from "@/shared/components/page-header";
import { Button } from "@/shared/components/ui/button";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import { ListRestart, Search } from "lucide-react";
import React from "react";

const UserActivityLog = () => {
  const {
    searchText,
    searchTextHandler,
    resetHandler,
    searchHandler,
    perPageHandler,
    pageChangeHandler,
    perPage,
    activityLogColumns,
    activityLogList,
    activityLogListLoading,
  } = useActivityLog();
  return (
    <div className="px-8 py-6">
      <PageHeader title={"User Activity Log"} />

      <DataTable
        columns={activityLogColumns}
        data={activityLogList?.data?.results || []}
        loading={activityLogListLoading}
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
            searchText={searchText}
            setSearchText={searchTextHandler}
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
        currentPage={activityLogList?.data?.currentPage || 1}
        totalPages={activityLogList?.data?.totalPages || 1}
        setPerPage={perPageHandler}
        perPage={perPage}
        pageChange={pageChangeHandler}
      />
    </div>
  );
};

export default UserActivityLog;

export const getStaticProps = getI18nProps;

UserActivityLog.getLayout = (page: React.ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};
