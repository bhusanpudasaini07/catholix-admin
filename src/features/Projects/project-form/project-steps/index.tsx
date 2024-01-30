import { Button } from "@/shared/components/ui/button";
import { Check } from "lucide-react";
import React from "react";
interface IProps {
  stepCounter: number;
}

const steps = [
  { title: "Project Details", stepNumber: 1 },
  { title: "Add Members", stepNumber: 2 },
];

const ProjectSteps = ({ stepCounter }: IProps) => {
  return (
    <div className="flex items-center gap-6 mb-12">
      {steps.map(({ title, stepNumber }) => (
        <div key={title} className="flex flex-1 items-start gap-2">
          <Button
            type="button"
            variant={stepCounter >= stepNumber ? "default" : "outline"}
            className={`rounded-md border w-[32px] p-0 h-[32px]`}
          >
            {stepCounter > stepNumber ? <Check width={16} /> : stepNumber}
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <p className="text-base text-black/80">{title}</p>
              <div className="flex-1 w-full bg-purple-60 h-[2px]"></div>
            </div>
            <p className="text-sm text-color">
              {stepCounter > stepNumber
                ? "Completed"
                : stepCounter === stepNumber
                ? "In progress"
                : "Waiting"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectSteps;
