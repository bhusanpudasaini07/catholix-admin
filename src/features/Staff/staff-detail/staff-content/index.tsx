import React from "react";
import StaffDetailOverview from "./details-overview";
import RPAllocation from "./rp-allocation";
import ProjectsOverview from "./projects-overiew";
import StaffProjectsList from "./projects-list";
import DailyRPUtilization from "./rp-utilization/daily";
import MonthlyRPUtilization from "./rp-utilization/monthly";
import AllTimeProjects from "./all-time-projects";

const StaffContent = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <StaffDetailOverview />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RPAllocation />
        <ProjectsOverview />
      </div>
      <StaffProjectsList />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DailyRPUtilization />
        <MonthlyRPUtilization />
      </div>
      <AllTimeProjects />
    </div>
  );
};

export default StaffContent;
