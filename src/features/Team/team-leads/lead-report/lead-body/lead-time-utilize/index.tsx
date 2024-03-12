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
        <div className="flex items-center justify-start mb-4 gap-7">
          <p className="text-lg font-medium text-zinc-700">Time Utilization</p>
        </div>
        <div className="flex items-center justify-between mt-10 gap-7 flex-wrap">
          <div className="flex items-center justify-center grow gap-6">
            <div className="">
              <h3 className="text-4xl font-semibold text-zinc-800">
                {overallHour ? `${overallHour}H ` : ""}
                {overallMinute}M
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
                {hours ? `${hours}H ` : ""}
                {minutes}M
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
