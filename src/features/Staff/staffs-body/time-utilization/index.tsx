import React, { FC } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { calculateUsedAndUnusedRpPercentage } from "@/shared/utils/rp-utils";
import PercentageGraph from "@/shared/components/percentage-graph";
interface IProps {
  spentTime: string;
  clientTimePercentage: string;
  clientEmptyPercentage: string;
  clientTime: string;
  spentTimePercentage: string;
  emptyTimePercentage: string;
}
const TimeUtilization: FC<IProps> = ({
  spentTime,
  spentTimePercentage,
  emptyTimePercentage,
  clientTime,
  clientTimePercentage,
  clientEmptyPercentage,
}) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start mb-4 gap-7">
          <p className="text-lg font-medium text-zinc-700">Time Utilization</p>
        </div>
        <div className="flex flex-wrap items-center justify-between mt-10 gap-7">
          <div className="flex items-center justify-center gap-6 grow">
            <div className="">
              <h3 className="text-4xl font-semibold text-zinc-800">
                {spentTime}
              </h3>
              <p className="text-sm font-normal text-zinc-500">Spent Time</p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph
                fillPercentage={"30"}
                fillLabel={" "}
                emptyPercentage={"70"}
                fillColor="#22C55E"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 grow">
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
                fillPercentage={"40"}
                emptyPercentage={"60"}
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
