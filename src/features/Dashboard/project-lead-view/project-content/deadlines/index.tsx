import React from "react";

import {
  IProjectSprint,
  IProjectSprintTaskDetails,
  IProjectSprintTasks,
} from "@/interface/project-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  loading: boolean;
  projectSprints: IProjectSprint | undefined;
  projectSprintTasks: IProjectSprintTaskDetails[] | undefined;
  projectSprintTaskLoading: boolean;
  deadlineColumn: ColumnDef<IProjectSprintTaskDetails>[];
  sprintId: string;
  setSprintId: (arg: string) => void;
  deadlineTab: string;
  setDeadlineTab: (arg: string) => void;
}

const ProjectDashboardDeadines = ({
  loading,
  projectSprints,
  projectSprintTasks,
  deadlineColumn,
  sprintId,
  setSprintId,
  deadlineTab,
  setDeadlineTab,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-7">
          <div className="flex gap-3 justify-start items-center">
            <p className="text-lg font-medium text-zinc-700">Deadlines</p>
          </div>
          <div className="flex gap-4 justify-end items-center grow">
            <Select
              defaultValue={sprintId}
              onValueChange={(e) => setSprintId(e)}
            >
              <SelectTrigger className="max-w-[140px]">
                <SelectValue placeholder="Select Sprint">
                  {projectSprints
                    ? projectSprints.data?.find(
                        (sprint) => sprint?.id === sprintId
                      )?.name
                    : "Select Sprint"}
                </SelectValue>
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

            <Tabs
              defaultValue={deadlineTab}
              onValueChange={(e) => setDeadlineTab(e)}
            >
              <TabsList>
                <TabsTrigger value="all">All Deadline</TabsTrigger>
                <TabsTrigger value="today">Todays Deadline</TabsTrigger>
                <TabsTrigger value="missed">Missed Deadline</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <DataTable
          data={projectSprintTasks ?? []}
          columns={deadlineColumn}
          loading={loading}
          loadingDataNum={10}
          height="max-h-[400px]"
          border
          headerSticky
          lottieHeight={120}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectDashboardDeadines;
