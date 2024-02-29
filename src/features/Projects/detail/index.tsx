import React from "react";
import DetailHeader from "./detail-header";
import DetailBody from "./detail-body";
import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";
import useProjectSales from "@/hooks/project/detail/useProjectSales.hook";

const ProjectDetailContent = () => {
  const {
    projectDetail,
    isLoading,
    code,
    setGitModalOpen,
    setOpenLeadSheet,
    setMemberModalOpen,
    staffDetails,
    memberModalOpen,
    openLeadSheet,
    gitModalOpen,
  } = useProjectDetail();

  return (
    <>
      <DetailHeader
        projectDetail={projectDetail?.data}
        setGitModalOpen={setGitModalOpen}
        setOpenLeadSheet={setOpenLeadSheet}
        setMemberModalOpen={setMemberModalOpen}
        loading={isLoading}
        code={code}
        staffDetails={staffDetails}
        memberModalOpen={memberModalOpen}
        openLeadSheet={openLeadSheet}
        gitModalOpen={gitModalOpen}
      />
      <DetailBody />
    </>
  );
};

export default ProjectDetailContent;
