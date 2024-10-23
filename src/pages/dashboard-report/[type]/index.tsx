import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import useDashboardReportDetail from "@/hooks/report/useDashboardReportDetail.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import PageHeader from "@/shared/components/page-header";
import FullTableSkeleton from "@/shared/components/skeleton-loading/dynamic-header-table-skeleton";
import { Skeleton } from "@/shared/components/ui/skeleton";

const DashboardReportDetail: NextPageWithLayout = () => {
  const {
    type,
    perPage,
    perPageHandler,
    pageChangeHandler,
    dashboardReportDetailData,
    dashboardReportDetailLoading,
    columns,
  } = useDashboardReportDetail();

  const getPageTitle = (type: string | string[] | undefined) => {
    switch (type) {
      case "activeDevice":
        return "Active Devices Report";
      case "inactiveDevice":
        return "Inactive Devices Report";
      case "totalDevice":
        return "Total Devices Report";
      case "gaCount":
        return "Registered Devices Report";
      case "gcCount":
        return "GC Count Report";
      case "gcDeviceCount":
        return "GC Devices Report";
      case "heartbeatDevice":
        return "Heartbeat Devices Report";
      case "noHeartbeatDevice":
        return "No Heartbeat Devices Report";
      default:
        return "Dashboard Report Detail";
    }
  };

  const pageTitle = getPageTitle(type);

  return (
    <div className="px-8 py-6">
      {dashboardReportDetailLoading ? (
        <div className="mb-8">
          <Skeleton className="w-40 h-10" />
        </div>
      ) : (
        <PageHeader title={pageTitle} />
      )}

      {dashboardReportDetailLoading ? (
        <FullTableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={dashboardReportDetailData?.data?.data?.results ?? []}
          loading={dashboardReportDetailLoading}
          loadingDataNum={10}
          border
          headerSticky
          height="max-h-[calc(100vh-200px)]"
        />
      )}

      <DataTablePagination
        currentPage={dashboardReportDetailData?.data?.data?.currentPage || 1}
        totalPages={dashboardReportDetailData?.data?.data?.totalPages || 1}
        setPerPage={perPageHandler}
        perPage={perPage}
        pageChange={pageChangeHandler}
      />
    </div>
  );
};

export default DashboardReportDetail;

export const getServerSideProps = async ({ query, locale }: any) => {
  const paths = [
    {
      params: {
        type: query?.type,
      },
      locale,
    },
  ];

  const translations = await serverSideTranslations(locale, ["common"]);

  return {
    props: {
      ...translations,
      paths,
      fallback: false,
    },
  };
};

DashboardReportDetail.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
