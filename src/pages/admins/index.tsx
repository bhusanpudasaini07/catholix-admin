import { ListRestart, Search } from "lucide-react";
import React, { use } from "react";

import useAdmin from "@/hooks/admins/useAdmin.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import MainLayout from "@/shared/main-layout";
import Plus from "@/shared/svg/plus";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";
import { Skeleton } from "@/shared/components/ui/skeleton";
import PageHeader from "@/shared/components/page-header";
import ConfirmationModal from "@/shared/components/confirmation-modal";
import AdminResetPasswordModal from "@/features/Admin/admin-reset-password-modal";
import { useRouter } from "next/router";
import { checkPermissions } from "@/shared/utils/permission-utils/check-permission-utils";
import { useCommonStore } from "@/store/common-store";

const Admins: NextPageWithLayout = () => {
  const router = useRouter();
  const { profileData } = useCommonStore();
  const {
    role,
    setRole,
    searchText,
    searchTextHandler,
    resetHandler,
    perPage,
    perPageHandler,
    pageChangeHandler,
    searchTriggerHandler,
    adminColumns,
    adminList,
    adminLoading,

    adminId,
    setAdminId,
    deleteModalOpen,
    setDeleteModalOpen,
    deleteUserMutation,
    adminName,
    resetPasswordModalOpen,
    setResetPasswordModalOpen,
  } = useAdmin();

  return (
    <div className="px-8 py-6">
      {/* Header */}
      <PageHeader
        title="Admins"
        subTitle="Manage data access for admin: Give or revoke admin regional and cms data access permissions."
        createUrl={
          checkPermissions(profileData, "/users", "post")
            ? "/admins/create"
            : ""
        }
        createBtnName="Add New Admin"
      />

      {/* Data Table */}
      <DataTable
        data={adminList?.data?.results ?? []}
        columns={adminColumns}
        loading={adminLoading}
        loadingDataNum={10}
        border
        height="max-h-[calc(100vh-270px)]"
        headerSticky
      >
        {/* Filter */}
        <div className="flex gap-1 justify-end items-center grow">
          {/* <Select value={role} onValueChange={(e) => setRole(e)}>
            <SelectTrigger className="max-w-[150px] h-10">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {rolesLoading
                ? Array.from({ length: 2 }, (_, index) => (
                    <Skeleton
                      key={index}
                      className="mb-1 w-full h-6 last:mb-0"
                    />
                  ))
                : rolesList?.data?.results?.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.name}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select> */}

          {/* Search */}
          <FilterSearch
            className="h-10 max-w-[500px]"
            searchText={searchText}
            setSearchText={searchTextHandler}
            handleClick={searchTriggerHandler}
          />
          <Button variant={"secondary"} onClick={resetHandler}>
            <ListRestart size={20} />
            Reset
          </Button>
          <Button variant={"primary"} onClick={searchTriggerHandler}>
            <Search size={20} />
            Search
          </Button>
        </div>
      </DataTable>

      <DataTablePagination
        currentPage={adminList?.data?.currentPage ?? 1}
        totalPages={
          (adminList &&
            Math.ceil(
              adminList?.data?.totalItems / adminList?.data?.pageSize
            )) ??
          1
        }
        perPage={perPage}
        pageChange={pageChangeHandler}
        setPerPage={perPageHandler}
      />
      {/* Delete Confirmation modal */}
      <ConfirmationModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        title="Delete Admin"
        description={`Are you sure you want to delete user ${adminName}?`}
        btnName="Delete"
        variant={"destructive"}
        key={`delete- ${adminId}`}
        btnFuntion={deleteUserMutation.mutate}
        disabled={deleteUserMutation.isLoading}
      />

      {/* Reset Password modal */}
      <AdminResetPasswordModal
        open={resetPasswordModalOpen}
        setOpen={setResetPasswordModalOpen}
        name={adminName}
        key={`resetPassword - ${adminId}`}
        id={adminId}
      />
    </div>
  );
};

export default Admins;
export const getStaticProps = getI18nProps;

Admins.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
