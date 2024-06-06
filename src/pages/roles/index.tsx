import { useRouter } from "next/router";
import React from "react";

import PageHeader from "@/shared/components/page-header";
import { Button } from "@/shared/components/ui/button";
import MainLayout from "@/shared/main-layout";
import Plus from "@/shared/svg/plus";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import FilterSearch from "@/shared/components/filter-search";
import { ListRestart, Search } from "lucide-react";
import useRoles from "@/hooks/roles/useRoles.hook";
import ConfirmationModal from "@/shared/components/confirmation-modal";

const Roles: NextPageWithLayout = () => {
  const router = useRouter();

  const {
    searchText,
    searchTextHandler,
    resetHandler,
    searchTriggerHandler,
    rolesList,
    rolesLoading,
    roleColumns,
    perPageHandler,
    pageChangeHandler,
    perPage,
    deleteModalOpen,
    setDeleteModalOpen,
    roleId,
    roleName,
    deleteRoleMutation,
  } = useRoles();
  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title="Roles"
          subTitle="CMS permissions, and setting their status as active"
        />
        <Button
          variant={"primary"}
          size={"lg"}
          className="gap-2"
          onClick={() => router.push("/roles/create")}
        >
          <Plus size={20} />
          Create Role
        </Button>
      </div>

      <div>
        <DataTable
          data={rolesList?.data?.results ?? []}
          columns={roleColumns}
          loading={rolesLoading}
          border
          headerSticky
          loadingDataNum={10}
          height="max-h-[calc(100vh-260px)]"
        >
          {/* Filter */}
          <div className="flex gap-1 justify-end items-center grow">
            {/* Search */}
            <FilterSearch
              className="h-10 max-w-[500px]"
              searchText={searchText}
              setSearchText={searchTextHandler}
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
          currentPage={rolesList?.data?.currentPage ?? 1}
          totalPages={
            (rolesList &&
              Math.ceil(
                rolesList?.data?.totalItems / rolesList?.data?.pageSize
              )) ??
            1
          }
          setPerPage={perPageHandler}
          perPage={perPage}
          pageChange={pageChangeHandler}
        />
      </div>

      {/* Delete Confirmation modal */}
      <ConfirmationModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        title="Delete Role"
        description={`Are you sure you want to delete '${roleName}' role ?`}
        btnName="Delete"
        variant={"destructive"}
        key={`delete- ${roleId}`}
        btnFuntion={deleteRoleMutation.mutate}
      />
    </div>
  );
};

export default Roles;
export const getStaticProps = getI18nProps;

Roles.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
