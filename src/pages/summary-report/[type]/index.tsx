import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import useSummaryReportDetail from "@/hooks/report/useSummaryReportDetail.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import PageHeader from "@/shared/components/page-header";
import FullTableSkeleton from "@/shared/components/skeleton-loading/dynamic-header-table-skeleton";
import { Skeleton } from "@/shared/components/ui/skeleton";
import MainLayout from "@/shared/main-layout";

const SummaryReportType = () => {
  const {
    type,
    perPage,
    perPageHandler,
    pageChangeHandler,
    summaryReportDetailData,
    summaryReportDetailLoading,
    columns,
  } = useSummaryReportDetail();

  const getPageTitle = (type: string | string[] | undefined) => {
    switch (type) {
      case "ga":
        return "GA Report";
      case "gc":
        return "GC Report";
      case "total_devices":
        return "Total Devices Report";
      case "inactive_devices":
        return "Inactive Devices Report";
      case "active_devices":
        return "Active Devices Report";
      case "active_agents":
        return "Active Agents Report";
      case "gc_devices":
        return "GC Devices Report";
      default:
        return "Report";
    }
  };

  const pageTitle = getPageTitle(type);

  return (
    <div className="px-8 py-6">
      {/* Header */}
      {summaryReportDetailLoading ? (
        <div className="mb-8">
          <Skeleton className="w-40 h-10" />
        </div>
      ) : (
        <PageHeader title={pageTitle} back backUrl={"/summary-report"} />
      )}

      {summaryReportDetailLoading ? (
        <FullTableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={summaryReportDetailData?.data?.data?.results ?? []}
          loading={summaryReportDetailLoading}
          loadingDataNum={10}
          border
          headerSticky
          height="max-h-[calc(100vh-200px)]"
        />
      )}

      <DataTablePagination
        currentPage={summaryReportDetailData?.data?.data?.currentPage || 1}
        totalPages={summaryReportDetailData?.data?.data?.totalPages || 1}
        setPerPage={perPageHandler}
        perPage={perPage}
        pageChange={pageChangeHandler}
      />
    </div>
  );
};

export default SummaryReportType;

export const getServerSideProps = async ({ query, locale }: any) => {
  const paths = [
    {
      params: {
        type: query?.type,
      },
      locale,
    },
  ];

  const translations = await serverSideTranslations(locale, ["common"]); // Pass the locale argument to serverSideTranslations

  return {
    props: {
      ...translations,
      paths,
      fallback: false,
    },
  };
};

SummaryReportType.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
