import React from "react";

import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";

import ProjectStoriesHeader from "./stories-header";
import ProjectStoriesOverview from "./stories-overview";
import ProjectStoriesTable from "./stories-table";
import UserStoryOccupancy from "./story-occupancy";
import UserStatusBugCount from "./status-bug-count";

const ProjectStoriesContent = () => {
  const { projectDetail, isLoading } = useProjectDetail();
  return (
    <>
      <ProjectStoriesHeader
        projectName={projectDetail?.data?.project_title ?? ""}
        loading={isLoading}
      />
      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 2xl:col-span-2">
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
                  bug_count_percentage: Number(
                    projectDetail?.data?.task?.bug_ratio_percentage ?? 0
                  ),
                }}
                time={{
                  estimated_time: Number(
                    projectDetail?.data?.time?.estimated_time
                  ),
                  used_time: Number(projectDetail?.data?.time?.used_time),
                }}
              />
            </div>

            <div className="col-span-3 2xl:col-span-1">
              <UserStoryOccupancy />
            </div>
          </div>

          {/* User status and bug count charts */}
          <UserStatusBugCount />

          <ProjectStoriesTable />
        </div>
      </div>
    </>
  );
};

export default ProjectStoriesContent;
