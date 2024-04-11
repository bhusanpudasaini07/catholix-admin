import React, { FC } from "react";

import { Card, CardContent } from "@/shared/components/ui/card";

import PercentageGraph from "../../../../../../shared/components/percentage-graph";
import { calculateTimeLog } from "@/shared/utils/rp-utils";

interface IProps {
  overallTime: string;
  overallUsedPercentage: string;
  overallEmptyPercentage: string;
  clientTime: string;
  clientUsedPercentage: string;
  clientEmptyPercentage: string;
}
const TimeUtilization: FC<IProps> = ({
  overallTime,
  clientUsedPercentage,
  clientEmptyPercentage,
  clientTime,
  overallUsedPercentage,
  overallEmptyPercentage,
}) => {
  const { hours, minutes } = calculateTimeLog(Number(clientTime));
  const { hours: overallHour, minutes: overallMinute } = calculateTimeLog(
    Number(overallTime)
  );
  return (
    <Card>
      <CardContent>
        <div className="flex gap-7 justify-start items-center mb-4">
          <p className="text-lg font-medium text-zinc-700">Time Utilization</p>
        </div>
        <div className="flex flex-wrap gap-7 justify-between items-center mt-10">
          <div className="flex gap-6 justify-start items-center grow">
            <div className="max-w-[150px]">
              <h3 className="text-4xl font-semibold text-zinc-800">
                {overallHour ? `${overallHour}H ` : ""}
                {overallMinute ? `${overallMinute}M` : ""}
              </h3>
              <p className="text-sm font-normal text-zinc-500">Overall Time</p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph
                fillPercentage={overallUsedPercentage}
                emptyPercentage={overallEmptyPercentage}
                fillLabel={" "}
                fillColor="#22C55E"
              />
            </div>
          </div>
          <div className="flex gap-6 justify-center items-center grow">
            <div className="max-w-[150px]">
              <h3 className="text-4xl font-semibold text-zinc-800">
                {hours ? `${hours}H ` : ""}
                {minutes ? `${minutes}M` : ""}
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
