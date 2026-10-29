import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";

interface IProps {
  userList: any;
  loading: boolean;
  columns: any;
  pageChangeHandler: (page: number) => void;
  perPageHandler: (perPage: number) => void;
  perPage: number;
}

const UserList = ({
  userList,
  loading,
  columns,
  pageChangeHandler,
  perPageHandler,
  perPage,
}: IProps) => {
  const items = Array.isArray(userList)
    ? userList
    : userList?.items ?? userList?.data?.items ?? userList?.data ?? [];

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
        currentPage={userList?.page || userList?.data?.page || 1}
        pageChange={pageChangeHandler}
        totalPages={userList?.totalPages || userList?.data?.totalPages || 1}
        perPage={userList?.perPage || userList?.data?.perPage || perPage}
        setPerPage={perPageHandler}
      />
    </>
  );
};

export default UserList;
