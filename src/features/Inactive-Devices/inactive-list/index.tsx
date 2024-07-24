import { IDeviceDetail, IDevicesData } from "@/interface/device-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, Search } from "lucide-react";
import React from "react";

interface IProps {
  pageChange: (value: number) => void;
  perPage: number;
  perPageChange: (value: number) => void;
  inactiveDeviceColumns: ColumnDef<IDeviceDetail>[];
  inactiveDevices: IDevicesData | undefined;
  inactiveDevicesLoading: boolean;
  searchText: string;
  searchTextHandler: (value: string) => void;
  searchTableTriggerHandler: () => void;
}

const InactiveDeviceList = ({
  pageChange,
  perPage,
  perPageChange,
  inactiveDeviceColumns,
  inactiveDevices,
  inactiveDevicesLoading,
  searchTextHandler,
  searchTableTriggerHandler,
  searchText,
}: IProps) => {
  return (
    <>
      <DataTable
        showManageColumn
        columns={inactiveDeviceColumns}
        data={inactiveDevices?.data?.results ?? []}
        loading={inactiveDevicesLoading}
        loadingDataNum={10}
        border
        height="max-h-[calc(100vh-330px)] 2xl:max-h-[calc(100vh-284px)]"
        headerSticky
        module="inactive_devices"
      >
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
              className="h-10 max-w-[300px]"
              setSearchText={searchTextHandler}
              searchText={searchText}
              handleClick={searchTableTriggerHandler}
            />
            <Button variant={"primary"} onClick={searchTableTriggerHandler}>
              <Search size={20} />
              Search
            </Button>
          </div>
        </div>
      </DataTable>

      <DataTablePagination
        perPage={perPage}
        currentPage={inactiveDevices?.data?.currentPage ?? 1}
        totalPages={inactiveDevices?.data?.totalPages ?? 1}
        setPerPage={perPageChange}
        pageChange={pageChange}
      />
    </>
  );
};

export default InactiveDeviceList;
