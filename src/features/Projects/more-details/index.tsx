import React from 'react';

import useProjectDetail from '@/hooks/project/detail/useProjectDetail.hook';

import MoreDetailBody from './detail-body';
import MoreDetailHeader from './detail-header';

const ProjectMoreDetailContent = () => {
  const { projectDetail, code } = useProjectDetail();
  return (
    <>
      <MoreDetailHeader
        title={projectDetail?.data?.project_title!}
        code={code}
      />
      <MoreDetailBody />
    </>
  );
};

export default ProjectMoreDetailContent;
