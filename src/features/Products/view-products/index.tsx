import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import ConfirmationModal from "@/shared/components/confirmation-modal";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";

interface IProps {
  list: any,
  loading: boolean
  dataId: string,
  dataName: string,
  deleteModalOpen: boolean,
  setDeleteModalOpen: any,
  deleteProductMutation: any
  columns: any
  perPage: number
  pageChangeHandler: (page: number) => void
  perPageHandler: (perPage: number) => void
}

const ViewProduct = ({
  list,
  dataId,
  dataName,
  deleteModalOpen,
  setDeleteModalOpen,
  deleteProductMutation,
  loading,
  columns,
  pageChangeHandler,
  perPageHandler,
  perPage

}: IProps) => {

  return (

    <>
   
    
      <DataTable
        data={list?.data?.items ?? []}
        columns={columns}
        loading={loading}
        loadingDataNum={10}
        border
        height="max-h-[calc(100vh-270px)]"
        headerSticky
      ></DataTable>

      <DataTablePagination
        currentPage={list?.data?.page || 1}
        pageChange={pageChangeHandler}
        totalPages={list?.data?.totalPages || 1}
        perPage={list?.data?.perPage || perPage}
        setPerPage={perPageHandler}
      />

      {/* Delete Confirmation modal */}
      <ConfirmationModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        title="Delete Product"
        description={`Are you sure you want to delete product ${dataName}?`}
        btnName="Delete"
        variant={"destructive"}
        key={`delete- ${dataId}`}
        btnFuntion={deleteProductMutation.mutate}
        disabled={deleteProductMutation.isLoading}
      />
    </>
  );
};

export default ViewProduct;
