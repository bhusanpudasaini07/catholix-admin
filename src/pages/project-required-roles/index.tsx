import useProjectRequiredRoles from "@/hooks/project-required-roles/useProjectRequiredRoles.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import ProjectTableSkeleton from "@/shared/components/skeleton-loading/project/project-table-skeleton";

import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import React from "react";

const ProjectRequiredRolePage = () => {
  const { columns, searchText, setSearchText, isLoading, requiredRolesList } =
    useProjectRequiredRoles();

  return (
    <div>
      <div className="flex justify-between items-end px-8 py-6 border-b bg-light-white border-b-slate-100">
        <div>
          <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
            Project Required Roles
          </h1>
          <p className="text-base text-zinc-500">
            List of Projects to increase the efficiency of the project.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 justify-end items-end px-8 py-6 border-b bg-light-white border-b-slate-100">
        <FilterSearch searchText={searchText} setSearchText={setSearchText} />
      </div>

      <div className="p-6 font-medium text-zinc-700">
        {isLoading ? (
          <ProjectTableSkeleton />
        ) : (
          <DataTable
            height="max-h-[calc(100vh-290px)]"
            columns={columns}
            headerSticky
            border
            data={requiredRolesList?.data ?? []}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectRequiredRolePage;

export const getStaticProps = getI18nProps;

ProjectRequiredRolePage.getLayout = (page: any) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
