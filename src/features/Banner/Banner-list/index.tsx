import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import ConfirmationModal from "@/shared/components/confirmation-modal";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";

interface IProps {
  bannerList: any,
  bannerId: string,
  bannerTitle: string,
  deleteModalOpen: boolean,
  setDeleteModalOpen: any,
  deleteBannerMutation: any
  loading: boolean
  columns: any
  pageChangeHandler: (page: number) => void
  perPageHandler: (perPage: number) => void
  page: number
  setPage: (page: number) => void
  perPage: number
  setPerPage: (perPage: number) => void
  search: string
  handleSearch: (search: string) => void
}

const BannerList = ({
  bannerList,
  bannerId,
  bannerTitle,
  deleteModalOpen,
  setDeleteModalOpen,
  deleteBannerMutation,
  loading,
  columns,
  pageChangeHandler,
  perPageHandler,
  perPage
}: IProps) => {
  const items = Array.isArray(bannerList)
    ? bannerList
    : bannerList?.items ?? bannerList?.data ?? [];

  return (
    <>
      <DataTable
        data={items}
        columns={columns}
        loading={loading}
        loadingDataNum={10}
        border
        height="max-h-[calc(100vh-270px)]"
        headerSticky
      ></DataTable>

      <DataTablePagination
        currentPage={bannerList?.page || 1}
        pageChange={pageChangeHandler}
        totalPages={bannerList?.totalPages || 1}
        perPage={bannerList?.perPage || perPage}
        setPerPage={perPageHandler}
      />

      <ConfirmationModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        title="Delete Banner"
        description={`Are you sure you want to delete banner ${bannerTitle}?`}
        btnName="Delete"
        variant={"destructive"}
        key={`delete-${bannerId}`}
        btnFuntion={deleteBannerMutation.mutate}
        disabled={deleteBannerMutation.isLoading}
      />
    </>
  );
};

export default BannerList;
