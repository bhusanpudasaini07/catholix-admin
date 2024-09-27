import MainLayout from "@/shared/main-layout";
import React from "react";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import PageHeader from "@/shared/components/page-header";
import MonthlySummary from "@/features/Summary-Report/monthly-summary";
import DevicesSummary from "@/features/Summary-Report/devices";
import SummaryTopTable from "@/features/Summary-Report/top-table";
import useSummaryReport from "@/hooks/report/useSummaryReport.hook";

const SummaryReport = () => {
  const {
    dealerColumns,
    agentColumns,
    regionColumns,
    stateColumns,
    lgaColumns,
    dummyData,
    tabValue,
    setTabValue,
    summaryData,
    summaryLoading,
    topData,
    topLoading,
  } = useSummaryReport();
  return (
    <div className="flex flex-col h-screen">
      <div className="px-8 pt-8 border-b">
        <PageHeader title={"Summary Report"} />
      </div>

      <div className="overflow-auto px-8 py-4 grow">
        <MonthlySummary
          tabValue={tabValue}
          setTabValue={setTabValue}
          gaGcData={summaryData?.data?.gaAndGc}
          summaryLoading={summaryLoading}
        />

        <div className="grid grid-cols-2 gap-4 mt-6 2xl:grid-cols-3">
          <DevicesSummary
            devices={summaryData?.data?.devices}
            loading={summaryLoading}
            tabValue={tabValue}
          />

          <SummaryTopTable
            data={topData?.data?.topDealers || []}
            title={"Top 5 Dealer"}
            columns={dealerColumns}
            loading={topLoading}
          />
          <SummaryTopTable
            data={topData?.data?.topAgents || []}
            title={"Top 5 Agent"}
            columns={agentColumns}
            loading={topLoading}
          />
          <SummaryTopTable
            data={topData?.data?.topRegions || []}
            title={"Top 5 Region"}
            columns={regionColumns}
            loading={topLoading}
          />
          <SummaryTopTable
            data={topData?.data?.topStates || []}
            title={"Top 5 State"}
            columns={stateColumns}
            loading={topLoading}
          />
          <SummaryTopTable
            data={topData?.data?.topLgas || []}
            title={"Top 5 LGA"}
            columns={lgaColumns}
            loading={topLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;

export const getStaticProps = getI18nProps;

SummaryReport.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
