import { ListRestart, Search } from "lucide-react";
import React from "react";

import useSSP from "@/hooks/ssp/useSSP.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import FilterSearch from "@/shared/components/filter-search";
import PageHeader from "@/shared/components/page-header";
import { Button } from "@/shared/components/ui/button";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";

const SSPData: NextPageWithLayout = () => {
  const {
    searchText,
    perPage,
    resetHandler,
    searchHandler,
    searchTextHandler,
    sspColumns,
    perPageHandler,
    pageChangeHandler,
    sspList,
    sspListLoading,
    applyColumns,
  } = useSSP();

  return (
    <div className="px-8 py-6">
      {/* Header */}
      <PageHeader title="SSP Data" />

      <DataTable
        columns={sspColumns}
        data={sspList?.data?.results ?? []}
        showManageColumn
        loading={sspListLoading}
        loadingDataNum={10}
        border
        headerSticky
        height="max-h-[calc(100vh-270px)]"
        module="ssp"
        applyColumns={applyColumns}
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
        currentPage={sspList?.data?.currentPage || 1}
        totalPages={sspList?.data?.totalPages || 1}
        setPerPage={perPageHandler}
        perPage={perPage}
        pageChange={pageChangeHandler}
      />
    </div>
  );
};

export default SSPData;

export const getStaticProps = getI18nProps;

SSPData.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
