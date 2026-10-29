import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";

interface IProps {
  bundleList: any;
  loading: boolean;
  columns: any;
  pageChangeHandler: (page: number) => void;
  perPageHandler: (perPage: number) => void;
  perPage: number;
}

const BundleList = ({
  bundleList,
  loading,
  columns,
  pageChangeHandler,
  perPageHandler,
  perPage,
}: IProps) => {
  const items = Array.isArray(bundleList)
    ? bundleList
    : bundleList?.items ?? bundleList?.data?.items ?? bundleList?.data ?? [];

  return (
    <>
      <DataTable
        data={Array.isArray(items) ? items : []}
        columns={columns}
        loading={loading}
        loadingDataNum={10}
        border
        height="max-h-[calc(100vh-270px)]"
        headerSticky
      />
      <DataTablePagination
        currentPage={bundleList?.page || bundleList?.data?.page || 1}
        pageChange={pageChangeHandler}
        totalPages={bundleList?.totalPages || bundleList?.data?.totalPages || 1}
        perPage={bundleList?.perPage || bundleList?.data?.perPage || perPage}
        setPerPage={perPageHandler}
      />
    </>
  );
};

export default BundleList;
