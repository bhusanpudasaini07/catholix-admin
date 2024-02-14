import React from "react";
import ProjectStoriesHeader from "./stories-header";
import ProjectStoriesOverview from "./stories-overview";
import ProjectStoriesTable from "./stories-table";
import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";

const ProjectStoriesContent = () => {
  const { projectDetail, isLoading } = useProjectDetail();
  return (
    <>
      <ProjectStoriesHeader
        projectName={projectDetail?.data?.project_title ?? ""}
        loading={isLoading}
      />
      <div className="p-8">
        <div className="grid grid-cols-1 gap-6">
          <ProjectStoriesOverview
            task={{
              open_task_count: Number(
                projectDetail?.data?.task?.open_task_count ?? 0
              ),
              closed_task_count: Number(
                projectDetail?.data?.task?.closed_task_count ?? 0
              ),
              all_task_count: Number(
                projectDetail?.data?.task?.all_task_count ?? 0
              ),
              bug_count: Number(projectDetail?.data?.task?.bug_count ?? 0),
            }}
          />
          <ProjectStoriesTable />
        </div>
      </div>
    </>
  );
};

export default ProjectStoriesContent;
