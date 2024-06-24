import { ListRestart, Search } from "lucide-react";
import React from "react";

import useDLCM from "@/hooks/dlcm/useDLCM.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import FilterSearch from "@/shared/components/filter-search";
import PageHeader from "@/shared/components/page-header";
import { Button } from "@/shared/components/ui/button";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";

const DLCMData: NextPageWithLayout = () => {
  const {
    searchText,
    perPage,
    resetHandler,
    searchHandler,
    searchTextHandler,
    perPageHandler,
    pageChangeHandler,
    dlcmColumns,
    dlcmData,
    dlcmLoading,
  } = useDLCM();

  return (
    <div className="px-8 py-6">
      {/* Header */}
      <PageHeader title="DLCM Data" />

      <DataTable
        columns={dlcmColumns}
        data={dlcmData?.data?.results ?? []}
        showManageColumn
        loading={dlcmLoading}
        border
        headerSticky
        loadingDataNum={10}
        height="max-h-[calc(100vh-270px)]"
        module="dlcm"
      >
        {/* Filter */}
        <div className="flex gap-1 justify-end items-center grow">
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
        currentPage={dlcmData?.data?.currentPage ?? 1}
        totalPages={
          (dlcmData &&
            Math.ceil(
              Number(dlcmData?.data?.totalItems) / dlcmData?.data?.pageSize
            )) ??
          1
        }
        setPerPage={perPageHandler}
        perPage={perPage}
        pageChange={pageChangeHandler}
      />
    </div>
  );
};

export default DLCMData;

export const getStaticProps = getI18nProps;

DLCMData.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
