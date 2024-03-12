import React from 'react';

import useLeadReport from '@/hooks/team/team-leads/useLeadReport.hook';

import ProjectRPConsumptionBody from './project-rp-body';
import ProjectRPConsumptionHeader from './project-rp-header';

const ProjectRPConsumptionContent = () => {
  return (
    <>
      <ProjectRPConsumptionHeader />

      <div className="p-6 max-h-[calc(100vh-170px)] overflow-auto">
        <ProjectRPConsumptionBody />
      </div>
    </>
  );
};

export default ProjectRPConsumptionContent;
