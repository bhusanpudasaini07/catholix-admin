import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { IProjectDetails } from "@/interface/project-interface";
import { format } from "date-fns";

interface IProjectDetailProps {
  projectDetails: IProjectDetails;
}

const ProjectDetailCard = ({ projectDetails }: IProjectDetailProps) => {
  return (
    <Card className="p-8">
      <CardContent className="flex flex-col p-0">
        {/* Project Details */}
        <h5 className="mb-3 text-2xl font-medium text-color">
          Project Details
        </h5>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Project Name :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {projectDetails?.name}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Project Code :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {projectDetails?.code}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Project Manager :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {projectDetails?.project_manager
                ? projectDetails?.project_manager
                : "-"}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Project Account Group :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {projectDetails?.pag ? projectDetails?.pag : "-"}
            </p>
          </div>

          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Budget Estimate :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {projectDetails?.bill_amount ? projectDetails?.bill_amount : "-"}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Bill Count :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {projectDetails?.bill_count ? projectDetails?.bill_count : "-"}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Start Date :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {projectDetails?.start_date
                ? format(new Date(projectDetails?.start_date), "PPP")
                : "-"}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              End Date :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {" "}
              {projectDetails?.end_date
                ? format(new Date(projectDetails?.end_date), "PPP")
                : "-"}
            </p>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Project Status :
            </p>
            <Badge
              className={`rounded-sm h-6 ${
                projectDetails?.status === "pending" &&
                "bg-[#FBE19F] text-[#DC9E00]"
              } 
                ${
                  projectDetails?.status === "completed" &&
                  "bg-[#C3F8DA] text-[#349D62]"
                }  
                ${
                  projectDetails?.status === "delay" &&
                  "bg-[#BAE4ED] text-[#0080DC]"
                } ${
                projectDetails?.status === "hold" &&
                "bg-[#F9D2DC] text-[#E94774]"
              }  capitalize border-none`}
            >
              {projectDetails?.status}
            </Badge>
          </div>
          <div className="flex items-start gap-16">
            <p className="text-sm leading-8 text-gray-260 min-w-[218px]">
              Description :
            </p>
            <p className="text-sm font-medium leading-8 text-color break-all">
              {projectDetails?.description ? projectDetails.description : "-"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDetailCard;
