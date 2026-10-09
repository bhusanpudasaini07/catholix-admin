import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import ConfirmationModal from "@/shared/components/confirmation-modal";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";

interface IProps {
  categoryList: any,
  categoryId: string,
  categoryName:string,
  deleteModalOpen: boolean,
  setDeleteModalOpen: any,
  deleteCategoryMutation: any
  loading:boolean
  columns:any
  pageChangeHandler: (page: number) => void
  perPageHandler: (perPage: number) => void
  page: number
  setPage: (page: number) => void
  perPage: number
  setPerPage: (perPage: number) => void
  search: string
  handleSearch: (search: string) => void
}

const ViewCategories = ({
  categoryList,
  categoryId,
  categoryName,
  deleteModalOpen,
  setDeleteModalOpen,
  deleteCategoryMutation,
  loading,
  columns,
  pageChangeHandler,
  perPageHandler,
  perPage
}: IProps) => {

  return (

    <>
   <DataTable
        data={categoryList?.items ?? []}
        columns={columns}
        loading={loading}
        loadingDataNum={10}
        border
        height="max-h-[calc(100vh-270px)]"
        headerSticky
      ></DataTable> 

      <DataTablePagination
       currentPage={categoryList?.data?.page || 1}
       pageChange={pageChangeHandler}
       totalPages={categoryList?.data?.totalPages || 1}
       perPage={categoryList?.data?.perPage || perPage}
       setPerPage={perPageHandler}
      />

      {/* Delete Confirmation modal */}
       <ConfirmationModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        title="Delete Category"
        description={`Are you sure you want to delete category ${categoryName}?`}
        btnName="Delete"
        variant={"destructive"}
        key={`delete- ${categoryId}`}
        btnFuntion={deleteCategoryMutation.mutate}
        disabled={deleteCategoryMutation.isLoading}
      />
    </>
  );
};

export default ViewCategories;
