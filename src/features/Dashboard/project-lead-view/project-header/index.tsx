import { IProjectDetail } from "@/interface/project-interface";
import { ComboBox } from "@/shared/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Separator } from "@/shared/components/ui/separator";
import { useCommonStore } from "@/store/common-store";
import React from "react";

interface IProps {
  projectList: IProjectDetail[];
  projectStatus: string;
  setProjectStatus: (arg: string) => void;
  setProjectCode: (arg: string) => void;
  projectCode: string;

  projectLeadId: string;
  setProjectLeadId: (arg: string) => void;
  projectType: string;
  setProjectType: (arg: string) => void;
}
interface IConfigProps {
  fullname: string;
  id: string;
}
const ProjectLeadDashboardHeader = ({
  projectList,
  projectStatus,
  setProjectStatus,
  setProjectCode,
  projectCode,

  projectLeadId,
  setProjectLeadId,
  projectType,
  setProjectType,
}: IProps) => {
  const { filterConfig, profileData } = useCommonStore();
  const projectLeadsList = [
    ...(filterConfig?.project_leads?.map(({ fullname, id }: IConfigProps) => ({
      title: fullname,
      value: id,
    })) || []),
  ];

  const projectListArray = [
    ...(projectList?.map(({ project_title, code }: any) => ({
      title: project_title,
      value: code,
    })) || []),
  ];
  return (
    <div className="flex justify-between items-end px-8 py-6 border-b bg-light-white border-b-slate-100">
      <div>
        <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
          Project Lead Dashboard
        </h1>
        <p className="text-base text-zinc-500">
          Welcome back, get insights and overview of all the activities.
        </p>
      </div>

      <div className="flex gap-4 justify-end items-center grow">
        {/* <Select>
          <SelectTrigger className="max-w-[220px]">
            <SelectValue placeholder="All Project Lead" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lead">Lead</SelectItem>
          </SelectContent>
        </Select> */}
        {/* Lead */}
        {profileData?.is_team_lead === "Yes" && (
          <div>
            <ComboBox
              selectables={projectLeadsList}
              value={projectLeadId}
              setValue={setProjectLeadId}
              module="Project Lead"
            />
          </div>
        )}

        {/* Type */}
        <Select onValueChange={(e) => setProjectType(e)}>
          <SelectTrigger className="max-w-[150px] h-10">
            <SelectValue placeholder="Project Type" />
          </SelectTrigger>
          <SelectContent>
            {filterConfig?.project_sources?.map((source: string) => (
              <SelectItem value={source} key={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status */}
        <Select
          defaultValue={projectStatus}
          onValueChange={(e) => setProjectStatus(e)}
        >
          <SelectTrigger className="max-w-[150px] h-10">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Status</SelectItem>
            <Separator className="my-2" />
            {filterConfig?.project_status?.map((status: any) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-[250px] min-w-0">
          <ComboBox
            selectables={projectListArray}
            value={projectCode}
            setValue={setProjectCode}
            module="Project"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectLeadDashboardHeader;
