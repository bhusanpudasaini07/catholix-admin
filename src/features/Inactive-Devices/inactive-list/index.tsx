import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { ExternalLink, Search } from "lucide-react";
import React from "react";

const InactiveDeviceList = () => {
  return (
    <>
      <DataTable columns={[]} data={[]} showManageColumn border>
        <div className="flex justify-between ml-2 grow">
          <Button
            variant={"white"}
            size={"md"}
            className="py-2.5 h-auto text-sm gap-2"
          >
            <ExternalLink size={20} />
            Export
          </Button>
          <div className="flex gap-1 justify-end items-center ml-2 grow">
            <FilterSearch
              className="h-10 max-w-[500px]"
              setSearchText={() => {}}
              searchText=""
            />
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
        setPerPage={() => {}}
        pageChange={() => {}}
      />
    </>
  );
};

export default InactiveDeviceList;
