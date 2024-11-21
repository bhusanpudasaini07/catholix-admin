import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { ListRestart, Search } from "lucide-react";
import PageHeader from "@/shared/components/page-header";
import { Button } from "@/shared/components/ui/button";
import DatePicker from "@/shared/components/ui/date-picker";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import useMultipleLocations from "@/hooks/security/useMultipleLocation.hook";
import CommonModal from "@/shared/components/common-modal";

const MultipleLocations = () => {
  const {
    multipleLocationsData,
    multipleLocationsLoading,
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
    combinedModalOpen,
    closeCombinedModal,
    selectedRow,
    combinedColumns,
  } = useMultipleLocations();
  return (
    <div className="px-8 py-6">
      {/* Header */}
      <PageHeader
        title="Multiple Locations"
        subTitle={`Total Device Count: ${
          multipleLocationsData?.data?.totalItems || 0
        }`}
      />

      <DataTable
        columns={columns}
        data={multipleLocationsData?.data?.results ?? []}
        loading={multipleLocationsLoading}
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
        currentPage={multipleLocationsData?.data?.currentPage || 1}
        totalPages={multipleLocationsData?.data?.totalPages || 1}
        setPerPage={perPageHandler}
        perPage={perPage}
        pageChange={pageChangeHandler}
      />

      <CommonModal
        open={combinedModalOpen}
        onClose={closeCombinedModal}
        className="max-w-2xl"
      >
        <div>
          <p className="mb-0 text-lg font-semibold">
            GA Locations - {selectedRow?.name}
          </p>
          <DataTable
            columns={combinedColumns}
            data={selectedRow?.combined_locations ?? []}
            loading={false}
            border
            headerSticky
            height="max-h-[500px]"
          />
        </div>
      </CommonModal>
    </div>
  );
};
export const getStaticProps = getI18nProps;

export default MultipleLocations;

MultipleLocations.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
