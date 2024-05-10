import React from "react";

import useReport from "@/hooks/team/team-leads/useReport.hook";

import ReportSummaryBody from "./report-body";
import ReportSummaryHeader from "./report-header";

const ReportSummaryContent = () => {
  const {
    dateRange,
    setDateRange,
    setDateRangeOpen,
    dateRangeOpen,
    columns,
    isLoading,
    leadReportSummary,
    totalRP,
    totalCommercialRP,
    totalInhouseRP,
    rpOptions,
    countryOptions,
    staffRPLoading,
    leadDetail,
    rpChartRef,
    countryChartRef,
    leadId,
    projectTypeColumn,
    countryProjectData,
    projectMarketColumn,
    leadData,
    budgetUtilizationOption,
  } = useReport();
  return (
    <>
      <ReportSummaryHeader
        dateRange={dateRange}
        setDateRange={setDateRange}
        dateRangeOpen={dateRangeOpen}
        setDateRangeOpen={setDateRangeOpen}
      />
      <ReportSummaryBody
        rpChartRef={rpChartRef}
        countryChartRef={countryChartRef}
        totalRp={totalRP}
        totalCommercialRp={totalCommercialRP}
        totalInhouseRP={totalInhouseRP}
        columns={columns}
        data={leadReportSummary?.data}
        loading={isLoading}
        rpOptions={rpOptions}
        countryOptions={countryOptions}
        staffRPLoading={staffRPLoading}
        leadDetail={leadDetail}
        leadId={leadId}
        projectTypeColumn={projectTypeColumn}
        projectMarketColumn={projectMarketColumn}
        countryProjectData={countryProjectData ?? []}
        projectTypeData={leadData ?? []}
        budgetUtilizationOption={budgetUtilizationOption}
      />
    </>
  );
};

export default ReportSummaryContent;
