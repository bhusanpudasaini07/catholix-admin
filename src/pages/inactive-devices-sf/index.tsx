import PageHeader from "@/shared/components/page-header";
import { DataTable } from "@/shared/components/data-table/data-table";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";
import { Button } from "@/shared/components/ui/button";
import FilterSearch from "@/shared/components/filter-search";
import { ListRestart, Search } from "lucide-react";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import useInactiveDevicesSf from "@/hooks/security/useInactiveDevicesSf.hook";
import DatePicker from "@/shared/components/ui/date-picker";

const InactiveDevicesSF = () => {
  const {
    inactiveDevicesSfData,
    inactiveDevicesSfLoading,
    columns,
    searchText,
    searchTextHandler,
    resetHandler,
    searchHandler,
    perPageHandler,
    pageChangeHandler,
    perPage,
    date,
    setDate,
  } = useInactiveDevicesSf();
  return (
    <div className="px-8 py-6">
      {/* Header */}
      <PageHeader
        title="Inactive Devices From ScaleFusion"
        subTitle={`Total Device Count: ${
          inactiveDevicesSfData?.data?.totalItems || 0
        }`}
      />

      <DataTable
        columns={columns}
        data={inactiveDevicesSfData?.data?.results ?? []}
        loading={inactiveDevicesSfLoading}
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
          <DatePicker
            date={date}
            setDate={setDate}
            className="h-10 text-sm w-[220px]"
            mode="single"
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
        currentPage={inactiveDevicesSfData?.data?.currentPage || 1}
        totalPages={inactiveDevicesSfData?.data?.totalPages || 1}
        setPerPage={perPageHandler}
        perPage={perPage}
        pageChange={pageChangeHandler}
      />
    </div>
  );
};

export default InactiveDevicesSF;

export const getStaticProps = getI18nProps;

InactiveDevicesSF.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
