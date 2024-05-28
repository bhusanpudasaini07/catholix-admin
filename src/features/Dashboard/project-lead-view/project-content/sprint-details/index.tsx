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
import useProjectViewDashboard from "@/hooks/dashboard/project-lead/useDashboardProject.hook";
import { EChartsInstance, EChartsOption } from "echarts-for-react";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/utils";

interface IProps {
  projectSprints: IProjectSprint | undefined;
  loading: boolean;
  sprintId: string;
  setSprintId: (arg: string) => void;
  tabOptions: any;
  tabValue: string;
  setTabValue: (arg: string) => void;
  taskChart: EChartsOption;
  sprintBurndownOption: EChartsOption;
  statusOption: EChartsOption;
  chartRef: EChartsInstance;
}

const ProjectDashboardSprint = ({
  projectSprints,
  loading,
  sprintId,
  setSprintId,
  tabOptions,
  tabValue,
  setTabValue,
  taskChart,
  sprintBurndownOption,
  statusOption,
  chartRef,
}: IProps) => {
  return (
    <div className="p-6 h-full bg-light-white">
      <div className="mb-6">
        {loading ? (
          <Skeleton className="w-full h-9" />
        ) : (
          <Select defaultValue={sprintId} onValueChange={(e) => setSprintId(e)}>
            <SelectTrigger className="[&>span]:grow">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[310px] overflow-y-scroll">
              {projectSprints?.data
                ?.slice()
                .reverse()
                .map((sprint, i) => (
                  <SelectItem
                    value={sprint?.id}
                    key={`sprint-${sprint?.id}`}
                    className={cn(
                      i % 2 === 0 ? "bg-zinc-50" : "",
                      "[&>span]:grow py-3"
                    )}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div>
                        {sprint?.name}
                        {sprint?.id === sprintId && (
                          <span className="ml-1 text-zinc-500">
                            (Current Sprint)
                          </span>
                        )}
                      </div>
                      <Badge
                        variant={"outline"}
                        className={cn(
                          sprint.status === "active" &&
                            "border-blue-500 text-blue-500 bg-blue-50 ",
                          sprint.status === "closed" &&
                            "border-green-500 text-green-500 bg-green-50 ",
                          "capitalize border rounded-md"
                        )}
                      >
                        {sprint?.status === "active"
                          ? "In Progress"
                          : sprint?.status}
                      </Badge>
                    </div>
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
          <ProjectDashboardSprintStatus
            tabOptions={tabOptions}
            tabValue={tabValue}
            setTabValue={setTabValue}
            taskChart={taskChart}
            sprintDetail={projectSprints?.data?.find(
              (sprint) => sprint?.id === sprintId
            )}
            loading={loading}
            sprintBurndownOption={sprintBurndownOption}
            statusOption={statusOption}
            chartRef={chartRef}
          />
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
