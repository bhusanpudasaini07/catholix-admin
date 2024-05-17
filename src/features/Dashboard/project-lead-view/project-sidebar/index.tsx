import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useCommonStore } from "@/store/common-store";
import React from "react";
import ProjectSidebarCard from "./project-card";
import { IProjectDetail } from "@/interface/project-interface";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Separator } from "@/shared/components/ui/separator";
import ProjectListSkeleton from "@/shared/components/skeleton-loading/dashboard/project-view/project-list-skeleton";

interface IProps {
  projectStatus: string;
  setProjectStatus: (arg: string) => void;
  projectList: IProjectDetail[];
  loading: boolean;
  setProjectCode: (arg: string) => void;
  projectCode: string;
}

const ProjectSidebar = ({
  projectStatus,
  setProjectStatus,
  projectList,
  loading,
  projectCode,
  setProjectCode,
}: IProps) => {
  const { filterConfig } = useCommonStore();
  return (
    <div className="p-6 h-full bg-light-white">
      <div className="mb-6">
        <Select
          defaultValue={projectStatus}
          onValueChange={(e) => setProjectStatus(e)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {filterConfig?.project_status?.map((status: any) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 max-h-[calc(100vh-230px)] overflow-y-scroll pr-2">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <ProjectListSkeleton key={index} />
            ))
          : projectList?.map((project) => (
              <ProjectSidebarCard
                projectCode={projectCode}
                setProjectCode={setProjectCode}
                code={project?.code}
                key={project?.project_id}
                project_title={project?.project_title}
                health={project?.health?.grade ?? "B"}
                deadline={project?.dates?.deadline}
                start_date={project?.dates?.start_date}
                status={project?.status}
              />
            ))}
      </div>
    </div>
  );
};

export default ProjectSidebar;
