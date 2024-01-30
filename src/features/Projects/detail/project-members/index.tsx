import { IProjectDetails } from "@/interface/project-interface";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

interface IProjectDetailProps {
  projectDetails: IProjectDetails;
}
const ProjectMembers = ({ projectDetails }: IProjectDetailProps) => {
  return (
    <Card className="p-6 bg-purple-70 border-purple-80">
      <CardContent className="p-0">
        <h5 className="mb-3 text-2xl font-medium text-color">
          Project Members ({projectDetails?.project_members.length})
        </h5>
        <div className="flex flex-wrap mt-8 gap-x-10 gap-y-7">
          {projectDetails?.project_members.length > 0
            ? projectDetails?.project_members.map((member) => (
                <div className="flex items-center gap-4" key={member?.email}>
                  <Button type="button" className="w-[48px] h-[48px]">
                    {member?.first_name[0]}
                    {member?.last_name[0]}
                  </Button>
                  <p>
                    {member?.first_name} {member?.last_name}
                  </p>
                </div>
              ))
            : "No Members found"}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectMembers;
