import React from "react";

import useLeadReport from "@/hooks/team/team-leads/useLeadReport.hook";
import { ICountryProjectDetails } from "@/interface/team-lead-report-interface";

import ProjectCountryTable from "./project-country-table";
import ProjectRPConsumptionSkeleton from "@/shared/components/skeleton-loading/lead-report/project-rp-consumption-skeleton";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  countryProjectColumn: ColumnDef<ICountryProjectDetails>[];
  staffDataLoading: boolean;
  countryWiseGroupProject: any;
}

const ProjectRPConsumptionBody = ({staffDataLoading, countryWiseGroupProject, countryProjectColumn}:IProps) => {


  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {staffDataLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <ProjectRPConsumptionSkeleton
              key={index}
              column={countryProjectColumn}
            />
          ))
        : countryWiseGroupProject &&
          Object?.entries(countryWiseGroupProject)?.map(
            ([country, projects], index) => (
              <ProjectCountryTable
                key={index}
                country={country}
                projects={projects}
                countryProjectColumn={countryProjectColumn}
                staffDataLoading={staffDataLoading}
              />
            )
          )}
    </div>
  );
};

export default ProjectRPConsumptionBody;
