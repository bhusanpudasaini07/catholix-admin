import React from 'react';

import useLeadReport from '@/hooks/team/team-leads/useLeadReport.hook';
import { ICountryProjectDetails } from '@/interface/team-lead-report-interface';

import ProjectCountryTable from './project-country-table';

const ProjectRPConsumptionBody = () => {
  const {
    staffDataLoading,
    countryWiseGroupProject,
    countryProjectColumn,
    searchText,
    setSearchText,
  } = useLeadReport();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {countryWiseGroupProject &&
        Object?.entries(countryWiseGroupProject)?.map(
          ([country, projects], index) => (
            <ProjectCountryTable
              key={index}
              country={country}
              projects={projects}
              countryProjectColumn={countryProjectColumn}
              searchText={searchText}
              setSearchText={setSearchText}
              staffDataLoading={staffDataLoading}
            />
          )
        )}
    </div>
  );
};

export default ProjectRPConsumptionBody;
