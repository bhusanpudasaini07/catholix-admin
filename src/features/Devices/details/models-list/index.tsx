import { ExternalLink, ListRestart, Search } from "lucide-react";
import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  searchText: string;
  searchTextHandler: (value: string) => void;
  searchTriggerHandler: () => void;
}

const DeviceModelsList = ({
  searchText,
  searchTextHandler,
  searchTriggerHandler,
}: IProps) => {
  return (
    <>
      <DataTable columns={[]} data={[]} showManageColumn border>
        {/* Filters */}
        <div className="flex justify-between items-center ml-4 grow">
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
            <Button
              variant={"secondary"}

              // onClick={resetHandler}
            >
              <ListRestart size={20} />
              Reset
            </Button>
            <Button
              variant={"primary"}
              // onClick={searchTriggerHandler}
            >
              <Search size={20} />
              Search
            </Button>
          </div>
        </div>
      </DataTable>

      <DataTablePagination
        perPage={10}
        currentPage={1}
        totalPages={10}
        pageChange={() => {}}
        setPerPage={() => {}}
      />
    </>
  );
};

export default DeviceModelsList;
