import { ExternalLink, ListRestart, Search } from "lucide-react";
import React from "react";

import useDashboardReport from "@/hooks/report/useDashboardReport.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import DateRangeFilter from "@/shared/components/date-range-filter";
import PageHeader from "@/shared/components/page-header";
import FullTableSkeleton from "@/shared/components/skeleton-loading/dynamic-header-table-skeleton";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

const DashboardReport = () => {
  const {
    perPage,
    page,
    setPerPage,
    setPage,
    dateRange,
    setDateRange,
    searchHandler,
    resetHandler,
    exportHandler,
    pageChangeHandler,
    perPageHandler,
    dashboardReportLoading,
    transformedData,
    exportMutation,
  } = useDashboardReport();
  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title="Dashboard Report">
        {/* Filters */}
        <div className="flex gap-2 items-end px-5 py-2 rounded-lg bg-zinc-200">
          <div className="max-w-[250px]">
            <Label className="block mb-1.5 font-medium">
              Select Date Range
            </Label>
            <DateRangeFilter
              dateRange={dateRange}
              setDateRange={setDateRange}
              beforeDisabled={30} // Assuming an average month length
              disabled
            />
          </div>

          {/* reset */}
          <Button
            variant={"white"}
            size={"sm"}
            className="gap-1 px-4 py-2 h-9"
            onClick={resetHandler}
          >
            <ListRestart size={20} />
            Reset
          </Button>
          {/* Search */}
          <Button
            variant={"primary"}
            size={"sm"}
            className="gap-1 px-4 py-2 h-9"
            onClick={searchHandler}
          >
            <Search size={20} />
            Search
          </Button>
        </div>
      </PageHeader>
      <div className="overflow-y-auto grow no-scrollbar">
        <div className="flex justify-between items-center">
          <Button
            variant={"white"}
            size={"md"}
            className="py-2.5 h-auto text-sm gap-2"
            onClick={exportHandler}
            disabled={
              exportMutation.isLoading ||
              transformedData?.data?.length === 0 ||
              dashboardReportLoading
            }
          >
            <ExternalLink size={20} />
            Export
          </Button>
        </div>
        {dashboardReportLoading ? (
          <FullTableSkeleton />
        ) : (
          <DataTable
            columns={transformedData?.columns}
            data={transformedData?.data || []}
            loading={dashboardReportLoading}
            loadingDataNum={10}
            headerSticky
            border
            height="max-h-[calc(100vh-230px)]"
          />
        )}
      </div>
    </div>
  );
};

export default DashboardReport;

export const getStaticProps = getI18nProps;

DashboardReport.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
