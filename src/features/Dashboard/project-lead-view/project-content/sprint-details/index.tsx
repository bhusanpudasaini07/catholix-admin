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

const ProjectDashboardSprint = () => {
  return (
    <div className="p-6 h-full bg-light-white">
      <div className="mb-6">
        <Select defaultValue="sprint">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sprint">
              Sprint 5 <span className="text-zinc-500">(Current Sprint)</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="max-h-[calc(100vh-230px)] overflow-y-scroll no-scrollbar">
        <div className="grid grid-cols-1 gap-4">
          <ProjectDashboardSprintReport />
          <ProjectDashboardSprintStatus />
          <TeamTaskInsights />
          <TaskProgressStatus />
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboardSprint;
