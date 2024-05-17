import React from "react";

import useProjectViewDashboard from "@/hooks/dashboard/project-lead/useDashbordProject.hook";

import ProjectSidebar from "./project-sidebar";
import DashboardProjectOverview from "./project-content/overview";
import ProjectDashboardDeadines from "./project-content/deadlines";
import ProjectDashboardTimeLog from "./project-content/member-time-log";
import { Select } from "@/shared/components/ui/select";
import ProjectDashboardSprint from "./project-content/sprint-details";

const ProjectDashboardView = () => {
  const {
    projectStatus,
    setProjectStatus,
    projectList,
    projectListLoading,
    projectCode,
    setProjectCode,

    // Details
    projectDetail,
    projectDetailLoading,

    gaugeColor,

    deadlineColumn,
    timeLogSummaryColumn,
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
              loading={projectDetailLoading || projectListLoading}
              column={deadlineColumn}
            />
            <ProjectDashboardTimeLog
              loading={projectDetailLoading || projectListLoading}
              column={timeLogSummaryColumn}
            />
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <ProjectDashboardSprint />
      </div>
    </div>
  );
};

export default ProjectDashboardView;
