import React, { FC } from "react";

import PercentageGraph from "@/shared/components/percentage-graph";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  calculateTimeLog,
  calculateUsedAndUnusedRpPercentage,
} from "@/shared/utils/rp-utils";

interface IProps {
  spentTime: string | number | undefined | null;
  clientTimePercentage: string | number | undefined | null;
  clientEmptyPercentage: string | number | undefined | null;
  clientTime: string | number | undefined | null;
  spentTimePercentage: string | number | undefined | null;
  emptyTimePercentage: string | number | undefined | null;
}
const TimeUtilization: FC<IProps> = ({
  spentTime,
  spentTimePercentage,
  emptyTimePercentage,
  clientTime,
  clientTimePercentage,
  clientEmptyPercentage,
}) => {
  const { hours, minutes } = calculateTimeLog(Number(clientTime));
  const { hours: spentHour, minutes: spentMinute } = calculateTimeLog(
    Number(spentTime)
  );
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start mb-4 gap-7">
          <p className="text-lg font-medium text-zinc-700">Time Utilization</p>
        </div>
        <div className="flex flex-wrap items-center justify-between mt-10 gap-7">
          <div className="flex items-center gap-6 grow">
            <div className="">
              <h3 className="text-4xl font-semibold text-zinc-800">
                {spentHour ? `${spentHour}H ` : ""}
                {spentMinute}M
              </h3>
              <p className="text-sm font-normal text-zinc-500">Spent Time</p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph
                fillPercentage={spentTimePercentage}
                fillLabel={" "}
                emptyPercentage={emptyTimePercentage}
                fillColor="#22C55E"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 grow">
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
                fillPercentage={clientTimePercentage}
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
