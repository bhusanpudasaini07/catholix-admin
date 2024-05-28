import React from "react";

import DHMemberLogSummary from "@/features/Dashboard/dh-view/dh-view-content/dh-member-log-summary";
import DHMemberLogUtilization from "@/features/Dashboard/dh-view/dh-view-content/dh-member-log-utilization";
import DHMissedDeadlines from "@/features/Dashboard/dh-view/dh-view-content/dh-missed-deadlines";
import DHProjectPerformance from "@/features/Dashboard/dh-view/dh-view-content/dh-project-performace";
import DHTaskMissedDeadlines from "@/features/Dashboard/dh-view/dh-view-content/dh-task-missed-deadlines";
import DHTeamOverview from "@/features/Dashboard/dh-view/dh-view-content/dh-team-overview";
import DashboardDHHeader from "@/features/Dashboard/dh-view/dh-view-header";
import ProjectPerformanceDetail from "@/features/Team/team-leads/lead-report/lead-body/project-performance-detail";
import useDhDashboard from "@/hooks/dashboard/dh/useDhDashboard.hook";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";

const DHDashboard: NextPageWithLayout = () => {
  const {
    dateRange,
    setDateRange,
    departmentHead,
    setDepartmentHead,

    // API
    staffTimeLog,
    staffTimeLogLoading,
    teamLeadDataLoading,

    // Column
    missedDeadlineColumns,
    memberTimeLogSummaryColumns,
    taskMissedDeadlinesColumns,

    // Chart
    teamOverviewOption,

    // REF
    chartRef,
  } = useDhDashboard();
  return (
    <>
      <DashboardDHHeader
        departmentHead={departmentHead}
        setDepartmentHead={setDepartmentHead}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <DHTeamOverview
              chartRef={chartRef}
              option={teamOverviewOption}
              loading={staffTimeLogLoading || teamLeadDataLoading}
            />
            <DHMemberLogUtilization
              members={staffTimeLog?.data?.staff?.length ?? 0}
              utilization_range={
                staffTimeLog?.data?.summary?.utilization_range!
              }
              loading={staffTimeLogLoading || teamLeadDataLoading}
            />
            <DHMissedDeadlines columns={missedDeadlineColumns} />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <DHMemberLogSummary columns={memberTimeLogSummaryColumns} />
            <DHTaskMissedDeadlines columns={taskMissedDeadlinesColumns} />
          </div>

          <DHProjectPerformance />
        </div>
      </div>
    </>
  );
};

export default DHDashboard;
export const getStaticProps = getI18nProps;
DHDashboard.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
