import { Card, CardContent } from "@/shared/components/ui/card";
import React, { FC } from "react";
import PercentageGraph from "../../../../../../shared/components/percentage-graph";

interface IProps {
  overallTime: string;
  overallUsedPercentage: number;
  overallEmptyPercentage: number;
  clientTime: string;
  clientUsedPercentage: number;
  clientEmptyPercentage: number;
}
const TimeUtilization: FC<IProps> = ({
  overallTime,
  clientUsedPercentage,
  clientEmptyPercentage,
  clientTime,
  overallUsedPercentage,
  overallEmptyPercentage,
}) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start mb-4 gap-7">
          <p className="text-lg font-medium text-zinc-700">Time Utilization</p>
        </div>
        <div className="flex items-center justify-between mt-10 gap-7 flex-wrap">
          <div className="flex items-center justify-center grow gap-6">
            <div className="">
              <h3 className="text-4xl font-semibold text-zinc-800">
                {overallTime}
              </h3>
              <p className="text-sm font-normal text-zinc-500">Overall Time</p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph
                fillPercentage={overallUsedPercentage}
                emptyPercentage={overallEmptyPercentage}
                fillColor="#22C55E"
              />
            </div>
          </div>
          <div className="flex items-center justify-center grow gap-6">
            <div className="">
              <h3 className="text-4xl font-semibold text-zinc-800">
                {clientTime}
              </h3>
              <p className="text-sm font-normal text-zinc-500">
                Client’s Project Time
              </p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph
                fillPercentage={clientUsedPercentage}
                emptyPercentage={clientEmptyPercentage}
                fillLabel={" "}
                fillColor="#22C55E"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeUtilization;
