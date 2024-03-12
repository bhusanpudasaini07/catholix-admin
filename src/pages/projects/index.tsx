import { Plus, X } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';

import ProjectFilters from '@/features/Projects/filters';
import NewProject from '@/features/Projects/new-project';
import ProfitLossCard from '@/features/Projects/profit-loss-card';
import useProjectFilter from '@/hooks/project/overall-filters/useProjectFilter.hook';
import useProjectListing from '@/hooks/project/useProjectListing.hook';
import { IProjectDetail } from '@/interface/project-interface';
import { DataTable } from '@/shared/components/data-table/data-table';
import { DataTablePagination } from '@/shared/components/data-table/data-table-pagination';
// CUSTOM
import FilterSearch from '@/shared/components/filter-search';
import NotFoundLottie from '@/shared/components/not-found';
import ProjectProfitViewSkeleton from '@/shared/components/skeleton-loading/project/project-profit-view-skeleton';
import ProjectTableSkeleton from '@/shared/components/skeleton-loading/project/project-table-skeleton';
// UI
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Dialog, DialogContent, DialogHeader } from '@/shared/components/ui/dialog';
import { Tabs, TabsContent } from '@/shared/components/ui/tabs';
import MainLayout from '@/shared/main-layout';
//language translator props
import { getI18nProps } from '@/shared/utils/i18n-utils/i18n.util';
import { useCommonStore } from '@/store/common-store';

// ROOT
import { NextPageWithLayout } from '../_app';

const Projects: NextPageWithLayout = () => {
  const { filterSaved } = useCommonStore();

  const {
    gitState,
    setGitState,
    setSearchText,
    perPage,
    setPerPage,
    sheetOpen,
    setSheetOpen,
    projectList,
    isLoading,
    handlePageChange,
    columns,
  } = useProjectListing();

  const { showFilterName, handleFilterRemoveAndUpdate } = useProjectFilter();

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
        <div className="flex items-end justify-between gap-3 px-8 py-6 border-b bg-light-white border-b-slate-100">
          <FilterSearch setSearchText={setSearchText} />
          <ProjectFilters />
        </div>

        {/* Show Applied filter */}
        {Object.keys(filterSaved).some((key) => filterSaved[key] !== "") && (
          <div className="flex items-center gap-6 px-8 py-6 border-b bg-light-white border-b-slate-100">
            <p className="border-r-2 border-r-gray-300 min-w-[120px] text-gray-500 py-1.5 pr-3">
              Applied Filters
            </p>
            <div className="flex flex-wrap items-center gap-4 ">
              {filterSaved?.date && filterSaved?.date_type !== "all_date" && (
                <div className="border rounded-sm border-zinc-200 py-1.5 px-3 flex items-center gap-2">
                  <span className="text-sm text-gray-500">Date:</span>{" "}
                  <div className="flex items-center gap-1 px-2 py-1 border rounded bg-slate-100">
                    <p className="text-xs font-medium capitalize">
                      {filterSaved?.date_type !== "all_date" &&
                        `${filterSaved?.date_type.replace(/_/g, " ")}: ${
                          filterSaved?.date
                        }`}
                    </p>
                    <Button
                      onClick={() => {
                        handleFilterRemoveAndUpdate("date", filterSaved?.date);
                        handleFilterRemoveAndUpdate(
                          "date_type",
                          filterSaved?.date_type
                        );
                      }}
                      variant={"ghost"}
                      className="h-auto p-0"
                    >
                      <X size={12} />
                    </Button>
                  </div>
                </div>
              )}
              {Object.entries(filterSaved)
                .filter(([key]) => key !== "date" && key !== "date_type")
                .map(([key, value]: any) => {
                  if (value) {
                    return (
                      <div
                        key={key}
                        className="border rounded-sm border-zinc-200 py-1.5 px-3 flex items-center gap-2"
                      >
                        <span className="text-sm text-gray-500 capitalize">
                          {key.split("_").join(" ")}:
                        </span>
                        {value?.split(",").map((val: string, index: number) => (
                          <div
                            key={index}
                            className="flex flex-wrap items-center gap-1 px-2 py-1 text-sm border rounded bg-slate-100"
                          >
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-medium">
                                {showFilterName(val, key)}
                              </p>
                              <Button
                                onClick={() => {
                                  handleFilterRemoveAndUpdate(key, val);
                                }}
                                variant={"ghost"}
                                className="h-auto p-0"
                              >
                                <X size={12} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        )}

        <div className="p-6">
          <TabsContent value="list_view">
            {isLoading ? (
              <ProjectTableSkeleton />
            ) : (
              <DataTable
                height="max-h-[70vh]"
                columns={columns}
                headerSticky={true}
                data={projectList?.data ?? []}
              />
            )}
          </TabsContent>

          <TabsContent value="profit_loss_view">
            {isLoading ? (
              <ProjectProfitViewSkeleton num={12} />
            ) : projectList?.data?.length > 0 ? (
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 mw1024:grid-cols-3 xl:grid-cols-4 max-h-[70vh] overflow-auto">
                {projectList?.data?.map((project: IProjectDetail) => (
                  <ProfitLossCard key={project?.project_id} data={project} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center">
                  <NotFoundLottie width={200} height={200} />
                </CardContent>
              </Card>
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
          key={gitState?.modalId}
          open={gitState?.modalOpen}
          onOpenChange={() => setGitState({ ...gitState, modalOpen: false })}
        >
          <DialogContent className="p-6">
            <DialogHeader className="text-lg font-bold text-color">
              Git URLs
            </DialogHeader>
            <div className="flex flex-col min-w-0 gap-2">
              {gitState?.url?.map((url: string, index) => (
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
