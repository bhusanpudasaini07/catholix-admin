import React from "react";

import useLeadReport from "@/hooks/team/team-leads/useLeadReport.hook";

import ProjectRPConsumptionBody from "./project-rp-body";
import ProjectRPConsumptionHeader from "./project-rp-header";

const ProjectRPConsumptionContent = () => {
  const {
    staffDataLoading,
    countryWiseGroupProject,
    countryProjectColumn,
    dateRange,
    dateRangeOpen,
    setDateRangeOpen,
    setDateRange,
    handleChange,
    selected,
    setSelected,
    weeklyData,
  } = useLeadReport();
  return (
    <>
      <ProjectRPConsumptionHeader
        dateRange={dateRange}
        dateRangeOpen={dateRangeOpen}
        setDateRangeOpen={setDateRangeOpen}
        setDateRange={setDateRange}
        handleChange={handleChange}
        selected={selected}
        setSelected={setSelected}
        weeklyData={weeklyData}
      />

      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <ProjectRPConsumptionBody
          countryProjectColumn={countryProjectColumn}
          staffDataLoading={staffDataLoading}
          countryWiseGroupProject={countryWiseGroupProject}
        />
      </div>
    </>
  );
};

export default ProjectRPConsumptionContent;
