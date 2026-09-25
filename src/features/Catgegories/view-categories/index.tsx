import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";

interface IProps {
  categoryList: any,
  loading:boolean
  columns:any
}

const ViewCategories = ({
  categoryList,
  loading,
  columns

 
}: IProps) => {
  return (
    <>
   <DataTable
        data={categoryList?.data ?? []}
        columns={columns}
        loading={loading}
        loadingDataNum={10}
        border
        height="max-h-[calc(100vh-270px)]"
        headerSticky
      ></DataTable> 

      {/* <DataTablePagination
        perPage={perPage}
        currentPage={agentDetailTable?.data?.currentPage || 1}
        totalPages={agentDetailTable?.data?.totalPages || 1}
        pageChange={pageChangeHandler}
        setPerPage={perPageHandler}
      /> */}
    </>
  );
};

export default ViewCategories;
