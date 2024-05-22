import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import ProjectDashboardSprintReport from "./sprint-report";
import ProjectDashboardSprintStatus from "./sprint-burndown-status";
import TeamTaskInsights from "./team-task-insights";
import TaskProgressStatus from "./task-progress-status";
import { IProjectSprint } from "@/interface/project-interface";
import { Skeleton } from "@/shared/components/ui/skeleton";
import useProjectViewDashboard from "@/hooks/dashboard/project-lead/useDashbordProject.hook";

interface IProps {
  projectSprints: IProjectSprint | undefined;
  loading: boolean;
  sprintId: string;
  setSprintId: (arg: string) => void;
}

const ProjectDashboardSprint = ({
  projectSprints,
  loading,
  sprintId,
  setSprintId,
}: IProps) => {
  return (
    <div className="p-6 h-full bg-light-white">
      <div className="mb-6">
        {loading ? (
          <Skeleton className="w-full h-9" />
        ) : (
          <Select defaultValue={sprintId} onValueChange={(e) => setSprintId(e)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {projectSprints?.data
                ?.slice()
                .reverse()
                .map((sprint) => (
                  <SelectItem value={sprint?.id} key={`sprint-${sprint?.id}`}>
                    {sprint?.name}
                    {sprint?.status === "active" && (
                      <span className="ml-1 text-zinc-500">
                        (Current Sprint)
                      </span>
                    )}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="max-h-[calc(100vh-230px)] overflow-y-scroll no-scrollbar">
        <div className="grid grid-cols-1 gap-4">
          <ProjectDashboardSprintReport
            sprintDetail={projectSprints?.data?.find(
              (sprint) => sprint?.id === sprintId
            )}
            loading={loading}
          />
          <ProjectDashboardSprintStatus />
          <TeamTaskInsights
            sprintDetail={projectSprints?.data?.find(
              (sprint) => sprint?.id === sprintId
            )}
            loading={loading}
          />
          <TaskProgressStatus />
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboardSprint;
