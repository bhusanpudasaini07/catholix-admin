import React from "react";
import MoreDetailHeader from "./detail-header";
import MoreDetailBody from "./detail-body";
import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";

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
