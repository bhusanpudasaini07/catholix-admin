// ROOT
import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import Link from "next/link";
// UI
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import { Plus } from "lucide-react";

// CUSTOM
import FilterSearch from "@/shared/components/filter-search";
import ProjectFilters from "@/features/Projects/filters";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import useProjectListing from "@/hooks/project/useProjectListing.hook";
import NewProject from "@/features/Projects/new-project";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

const Projects: NextPageWithLayout = () => {
  const {
    gitModalOpen,
    setGitModalOpen,
    gitModalId,
    setGitModalId,
    gitUrl,
    setGitUrl,
    searchText,
    setSearchText,
    pageNumber,
    setPageNumber,
    perPage,
    setPerPage,
    sheetOpen,
    setSheetOpen,
    projectList,
    isLoading,
    handlePageChange,
    SerialNumberCell,
    showGitUrl,
    columns,
  } = useProjectListing();
  return (
    <div>
      {/* Page heading */}
      <div className="flex items-end justify-between px-8 py-6 border-b bg-light-white border-b-slate-100">
        <div>
          <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
            All projects
          </h1>
          <p className="text-base text-zinc-500">
            The complete dashboard to get insights and overview of the projects.
          </p>
        </div>
        <Button onClick={() => setSheetOpen(true)}>
          <Plus width={20} height={20} />
          <span>Add New Project</span>
        </Button>

        <NewProject sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} />
        {/* <ProjectForm /> */}
      </div>

      {/* Filters */}
      <div className="flex items-end justify-between px-8 py-6 border-b bg-light-white border-b-slate-100">
        <FilterSearch setSearchText={setSearchText} />
        <ProjectFilters />
      </div>

      <div className="p-8">
        <DataTable columns={columns} data={projectList?.data ?? []} />
        <DataTablePagination
          currentPage={projectList?.pagination?.page}
          totalPages={projectList?.pagination?.total_page}
          perPage={perPage}
          setPerPage={setPerPage}
          pageChange={handlePageChange}
        />
      </div>

      {/* Git modal */}
      <Dialog
        key={gitModalId}
        open={gitModalOpen}
        onOpenChange={setGitModalOpen}
      >
        <DialogContent className="p-6">
          <DialogHeader className="text-lg font-bold text-color">
            Git URLs
          </DialogHeader>
          <div className="min-w-0">
            {gitUrl?.map((url: string, index) => (
              <div
                key={index}
                className="flex items-start gap-4 mb-3 [&:last-child]:mb-0"
              >
                <p className="text-sm font-medium text-color min-w-[80px] text-end">
                  URL {index + 1} -
                </p>
                <Link
                  href={url}
                  target="_blank"
                  className="text-sm truncate transition hover:text-primary"
                >
                  {url}
                </Link>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
export const getStaticProps = getI18nProps;

Projects.getLayout = (page) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
