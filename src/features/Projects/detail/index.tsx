import React from "react";
import DetailHeader from "./detail-header";
import DetailBody from "./detail-body";
import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";

const ProjectDetailContent = () => {
  const { projectDetail, code } = useProjectDetail();
  return (
    <>
      <DetailHeader title={projectDetail?.data?.project_title!} code={code} />
      <DetailBody />
    </>
  );
};

export default ProjectDetailContent;
