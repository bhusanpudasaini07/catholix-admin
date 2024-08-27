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
  noHeartbeatDeviceColumns: ColumnDef<IDeviceDetail>[];
  noHeartbeatDevices: IDevicesData | undefined;
  noHeartbeatDevicesLoading: boolean;
  searchText: string;
  searchTextHandler: (value: string) => void;
  searchTableTriggerHandler: () => void;
  applyColumns: (columns: string) => void;
  exportHandler: () => void;
  exportLoading: boolean;
}

const NoHeartbeatDeviceList = ({
  pageChange,
  perPage,
  perPageChange,
  noHeartbeatDeviceColumns,
  noHeartbeatDevices,
  noHeartbeatDevicesLoading,
  searchTextHandler,
  searchTableTriggerHandler,
  searchText,
  applyColumns,
  exportHandler,
  exportLoading,
}: IProps) => {
  return (
    <>
      <DataTable
        showManageColumn
        columns={noHeartbeatDeviceColumns}
        data={noHeartbeatDevices?.data?.results ?? []}
        loading={noHeartbeatDevicesLoading}
        loadingDataNum={10}
        border
        height="max-h-[calc(100vh-320px)] 2xl:max-h-[calc(100vh-287px)]"
        headerSticky
        module="noheartbeat"
        applyColumns={applyColumns}
      >
        <div className="flex justify-between ml-2 grow">
          <Button
            variant={"white"}
            size={"md"}
            className="py-2.5 h-auto text-sm gap-2"
            onClick={exportHandler}
            disabled={
              exportLoading ||
              noHeartbeatDevices?.data?.results.length === 0 ||
              noHeartbeatDevicesLoading
            }
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
        currentPage={
          (noHeartbeatDevices?.data?.currentPage === 0
            ? 1
            : noHeartbeatDevices?.data?.currentPage) ?? 1
        }
        totalPages={
          (noHeartbeatDevices?.data?.totalPages === 0
            ? 1
            : noHeartbeatDevices?.data?.totalPages) ?? 1
        }
        setPerPage={perPageChange}
        pageChange={pageChange}
      />
    </>
  );
};

export default NoHeartbeatDeviceList;
