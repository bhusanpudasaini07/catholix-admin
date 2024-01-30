import { Button } from "@/shared/components/ui/button";
import { FormLine } from "@/shared/lib/image-config";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

interface IProps {
  stepCounter: number;
}

const steps = [
  { title: "Vendor Basics", stepNumber: 1 },
  { title: "Vendor Address", stepNumber: 2 },
  { title: "Contacts", stepNumber: 3 },
  { title: "Banking Details", stepNumber: 4 },
  { title: "Additional Info", stepNumber: 5 },
];

const VendorSteps = ({ stepCounter }: IProps) => {
  return (
    <div className="flex items-center gap-6 mb-12">
      {steps.map(({ title, stepNumber }) => (
        <div key={title} className="flex items-start gap-2">
          <Button
            type="button"
            variant={stepCounter >= stepNumber ? "default" : "outline"}
            className="rounded-md border w-[32px] p-0 h-[32px]"
          >
            {stepCounter > stepNumber ? <Check width={16} /> : stepNumber}
          </Button>
          <div>
            <div className="flex items-center gap-4">
              <p className="text-base text-black/80">{title}</p>
              {stepNumber < steps.length && (
                <Image src={FormLine} width={49} height={2} alt="Form Line" />
              )}
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

export default VendorSteps;
