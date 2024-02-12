// ROOT
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

//language translator props
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import { Tabs, TabsContent } from "@/shared/components/ui/tabs";
import ProfitLossCard from "@/features/Projects/profit-loss-card";
import { IProjectDetail } from "@/interface/project-interface";
import ProjectTableSkeleton from "@/shared/components/skeleton-loading/project/project-table-skeleton";
import ProjectProfitViewSkeleton from "@/shared/components/skeleton-loading/project/project-profit-view-skeleton";

const Projects: NextPageWithLayout = () => {
  const {
    gitModalOpen,
    setGitModalOpen,
    gitModalId,
    gitUrl,
    setSearchText,
    perPage,
    setPerPage,
    sheetOpen,
    setSheetOpen,
    projectList,
    isLoading,
    handlePageChange,
    columns,
    columnVisibility,
    setColumnVisibility,
  } = useProjectListing();

  return (
    <div>
      <Tabs defaultValue="list_view">
        {/* Page heading */}
        <div className="flex items-end justify-between px-8 py-6 border-b bg-light-white border-b-slate-100">
          <div>
            <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
              All projects
            </h1>
            <p className="text-base text-zinc-500">
              The complete dashboard to get insights and overview of the
              projects.
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
          <TabsContent value="list_view">
            {isLoading ? (
              <ProjectTableSkeleton />
            ) : (
              <DataTable
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
                columns={columns}
                data={projectList?.data ?? []}
              />
            )}
          </TabsContent>

          <TabsContent value="profit_loss_view">
            {isLoading ? (
              <ProjectProfitViewSkeleton num={12} />
            ) : projectList?.data.length > 0 ? (
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
                {projectList?.data?.map((project: IProjectDetail) => (
                  <ProfitLossCard key={project?.project_id} data={project} />
                ))}
              </div>
            ) : (
              <p className="text-base text-center text-zinc-700">No Data</p>
            )}
          </TabsContent>

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
                    className="text-sm truncate transition text-primary"
                  >
                    {url}
                  </Link>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </Tabs>
    </div>
  );
};

export default Projects;
export const getStaticProps = getI18nProps;

Projects.getLayout = (page) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
