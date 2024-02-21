import React from "react";
import ReportSummaryHeader from "./report-header";
import ReportSummaryBody from "./report-body";
import useReport from "@/hooks/team/team-leads/useReport.hook";

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
        totalRp={totalRP}
        totalCommercialRp={totalCommercialRP}
        totalInhouseRP={totalInhouseRP}
        columns={columns}
        data={leadReportSummary?.data}
        loading={isLoading}
        rpOptions={rpOptions}
        countryOptions={countryOptions}
      />
    </>
  );
};

export default ReportSummaryContent;
