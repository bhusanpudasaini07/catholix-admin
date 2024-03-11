import React from "react";
import BudgetUtilization from "./budget-utilization";
import TimeUtilization from "./time-utilization";
import RpSummary from "./rp-summary";
import ProjectsOverview from "./projects-overview";
import StaffsProjectSummary from "./projects-summary";
import LogTable from "./log-table";
import AllTimeProjects from "./all-time-projects";

const StaffsBody = () => {
  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <BudgetUtilization
          spentBudget="1000"
          spentBudgetPercentage="40"
          emptyBudgetPercentage="60"
          clientBudget="500"
          clientBudgetPercentage="55"
          clientEmptyPercentage="45"
        />
        <TimeUtilization
          spentTime="2000"
          emptyTimePercentage="80"
          spentTimePercentage="20"
          clientTime="3000"
          clientEmptyPercentage="70"
          clientTimePercentage="20"
        />
        <RpSummary />
        <ProjectsOverview />
        <div className=" xl:col-span-2">
          <StaffsProjectSummary staffDataLoading staffRpSummaryData={[]} />
        </div>
        <div className="xl:col-span-2">
          <LogTable staffDataLoading staffRpSummaryData={[]} dateRange={""} />
        </div>
        <div className="xl:col-span-2">
          <AllTimeProjects
            staffDataLoading
            staffRpSummaryData={[]}
            dateRange={""}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default StaffsBody;
