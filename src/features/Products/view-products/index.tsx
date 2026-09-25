import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import ConfirmationModal from "@/shared/components/confirmation-modal";
import { useCategory } from "@/hooks/categories/useCategory.hook";

interface IProps {
  list: any,
  loading:boolean
  dataId: string,
  dataName:string,
  deleteModalOpen: boolean,
  setDeleteModalOpen: any,
  deleteCategoryMutation: any
  columns:any
}

const ViewProduct = ({
  list,
  dataId,
  dataName,
  deleteModalOpen,
  setDeleteModalOpen,
  deleteCategoryMutation,
  loading,
  columns

 
}: IProps) => {

  return (

    <>
   <DataTable
        data={list?.data ?? []}
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

       {/* Delete Confirmation modal */}
       <ConfirmationModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        title="Delete Category"
        description={`Are you sure you want to delete user ${dataName}?`}
        btnName="Delete"
        variant={"destructive"}
        key={`delete- ${dataId}`}
        btnFuntion={deleteCategoryMutation.mutate}
        disabled={deleteCategoryMutation.isLoading}
      />
    </>
  );
};

export default ViewProduct;
