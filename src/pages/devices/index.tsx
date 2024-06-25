import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import PageHeader from "@/shared/components/page-header";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { ListRestart, Search } from "lucide-react";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import useDevices from "@/hooks/devices/useDevices.hook";

const DevicesData: NextPageWithLayout = () => {
  const {
    searchText,
    perPage,
    resetHandler,
    searchHandler,
    searchTextHandler,
    perPageHandler,
    pageChangeHandler,
    devicesColumns,
    dummyData,
  } = useDevices();

  return (
    <div className="px-8 py-6">
      {/* Header */}
      <PageHeader title="Devices Data" />

      <DataTable
        columns={devicesColumns}
        data={dummyData ?? []}
        showManageColumn
        loading={false}
        border
        headerSticky
        loadingDataNum={10}
        height="max-h-[calc(100vh-270px)]"
        module="devices"
        
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
        // currentPage={rolesList?.data?.currentPage ?? 1}
        currentPage={1}
        totalPages={10}
        // totalPages={
        //   (rolesList &&
        //     Math.ceil(
        //       rolesList?.data?.totalItems / rolesList?.data?.pageSize
        //     )) ??
        //   1
        // }
        setPerPage={perPageHandler}
        perPage={perPage}
        pageChange={pageChangeHandler}
      />
    </div>
  );
};

export default DevicesData;

export const getStaticProps = getI18nProps;

DevicesData.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
