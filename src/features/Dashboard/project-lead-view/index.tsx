import React from "react";

import useProjectViewDashboard from "@/hooks/dashboard/project-lead/useDashbordProject.hook";

import ProjectDashboardDeadines from "./project-content/deadlines";
import ProjectDashboardTimeLog from "./project-content/member-time-log";
import DashboardProjectOverview from "./project-content/overview";
import ProjectDashboardSprint from "./project-content/sprint-details";
import ProjectSidebar from "./project-sidebar";

const ProjectDashboardView = () => {
  const {
    projectStatus,
    setProjectStatus,
    projectList,
    projectListLoading,
    projectCode,
    setProjectCode,
    sprintId,
    setSprintId,
    deadlineTab,
    setDeadlineTab,

    // Details
    projectDetail,
    projectDetailLoading,
    projectSprints,
    projectSprintLoading,
    memberTimeLogRevisedData,
    projectSprintTasks,
    projectSprintTaskLoading,
    filteredProjectSprintTasks,

    gaugeColor,

    timeLogSummaryColumn,
    deadlineColumn,
  } = useProjectViewDashboard();
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <ProjectSidebar
          projectList={projectList?.data ?? []}
          projectStatus={projectStatus}
          setProjectStatus={setProjectStatus}
          loading={projectListLoading}
          projectCode={projectCode}
          setProjectCode={setProjectCode}
        />
      </div>
      <div className="col-span-6">
        <div className="py-6 px-4 max-h-[calc(100vh-115px)] overflow-auto no-scrollbar">
          <div className="grid grid-cols-1 gap-4">
            <DashboardProjectOverview
              health={{
                task_completion_percentage:
                  projectDetail?.data?.health?.task_completion_percentage,
                rp_completion_percentage:
                  projectDetail?.data?.health?.rp_completion_percentage,
                time_completion_percentage:
                  projectDetail?.data?.health?.time_completion_percentage,
                grade: projectDetail?.data?.health?.grade,
              }}
              code={projectCode}
              gaugeColor={gaugeColor}
              loading={projectDetailLoading || projectListLoading}
            />
            <ProjectDashboardDeadines
              loading={
                projectDetailLoading ||
                projectListLoading ||
                projectSprintTaskLoading
              }
              projectSprints={projectSprints}
              sprintId={sprintId}
              setSprintId={setSprintId}
              projectSprintTasks={filteredProjectSprintTasks}
              projectSprintTaskLoading={projectSprintTaskLoading}
              deadlineColumn={deadlineColumn}
              deadlineTab={deadlineTab}
              setDeadlineTab={setDeadlineTab}
            />
            <ProjectDashboardTimeLog
              loading={projectDetailLoading || projectListLoading}
              column={timeLogSummaryColumn}
              data={memberTimeLogRevisedData}
            />
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <ProjectDashboardSprint
          projectSprints={projectSprints}
          loading={
            projectSprintLoading || projectDetailLoading || projectListLoading
          }
          sprintId={sprintId}
          setSprintId={setSprintId}
        />
      </div>
    </div>
  );
};

export default ProjectDashboardView;
