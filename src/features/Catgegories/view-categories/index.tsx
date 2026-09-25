import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import ConfirmationModal from "@/shared/components/confirmation-modal";
import { useCategory } from "@/hooks/categories/useCategory.hook";

interface IProps {
  categoryList: any,
  categoryId: string,
  categoryName:string,
  deleteModalOpen: boolean,
  setDeleteModalOpen: any,
  deleteCategoryMutation: any
  loading:boolean
  columns:any
}

const ViewCategories = ({
  categoryList,
  categoryId,
  categoryName,
  deleteModalOpen,
  setDeleteModalOpen,
  deleteCategoryMutation,
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

       {/* Delete Confirmation modal */}
       <ConfirmationModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        title="Delete Category"
        description={`Are you sure you want to delete user ${categoryName}?`}
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
