import { ExternalLink, ListRestart, Search } from "lucide-react";
import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import {
  IDeviceDetailTable,
  IRegisteredDevice,
} from "@/interface/device-interface";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  searchText: string;
  searchTextHandler: (value: string) => void;
  searchTriggerHandler: () => void;
  resetHandler: () => void;
  columns: ColumnDef<IRegisteredDevice>[];
  deviceDetailTable: IDeviceDetailTable | any;
  loading: boolean;
  pageChangeHandler: (page: number) => void;
  perPageHandler: (pageSize: number) => void;
  perPage: number;
}

const DeviceModelsList = ({
  searchText,
  searchTextHandler,
  searchTriggerHandler,
  resetHandler,
  columns,
  deviceDetailTable,
  loading,
  pageChangeHandler,
  perPageHandler,
  perPage,
}: IProps) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={deviceDetailTable?.data?.results ?? []}
        border
        loading={loading}
        loadingDataNum={10}
        lottieHeight={150}
      >
        {/* Filters */}
        <div className="flex justify-between items-center grow">
          <Button
            variant={"white"}
            size={"md"}
            className="py-2.5 h-auto text-sm gap-2"
          >
            <ExternalLink size={20} />
            Export
          </Button>

          <div className="flex gap-1 justify-end items-center grow">
            <FilterSearch
              className="h-10 max-w-[500px]"
              searchText={searchText}
              setSearchText={searchTextHandler}
              handleClick={searchTriggerHandler}
            />
            <Button variant={"secondary"} onClick={resetHandler}>
              <ListRestart size={20} />
              Reset
            </Button>
            <Button variant={"primary"} onClick={searchTriggerHandler}>
              <Search size={20} />
              Search
            </Button>
          </div>
        </div>
      </DataTable>

      <DataTablePagination
        perPage={perPage}
        currentPage={deviceDetailTable?.data?.currentPage ?? 1}
        totalPages={deviceDetailTable?.data?.totalPages ?? 1}
        pageChange={pageChangeHandler}
        setPerPage={perPageHandler}
      />
    </>
  );
};

export default DeviceModelsList;
