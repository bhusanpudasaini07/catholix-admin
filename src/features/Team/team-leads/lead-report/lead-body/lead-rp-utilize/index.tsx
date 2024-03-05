import React, { FC } from "react";
import PercentageGraph from "../../../../../../shared/components/percentage-graph";
import { Card, CardContent } from "@/shared/components/ui/card";
import { calculateUsedAndUnusedRpPercentage } from "@/shared/utils/rp-utils";
interface IProps {
  overallRP: string;
  overallUsedPercentage: string;
  overallEmptyPercentage: string;
  clientRP: string;
  clientUsedPercentage: string;
  clientEmptyPercentage: string;
}
const RpUtilization: FC<IProps> = ({
  overallRP,
  clientUsedPercentage,
  clientEmptyPercentage,
  clientRP,
  overallUsedPercentage,
  overallEmptyPercentage,
}) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start mb-4 gap-7">
          <p className="text-lg font-medium text-zinc-700">
            Budget Utilization
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between mt-10 gap-7">
          <div className="flex items-center justify-center gap-6 grow">
            <div className="">
              <h3 className="text-4xl font-semibold text-zinc-800">
                {overallRP}
              </h3>
              <p className="text-sm font-normal text-zinc-500">
                Overall Budget
              </p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph
                fillPercentage={overallUsedPercentage}
                emptyPercentage={overallEmptyPercentage}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 grow">
            <div className="">
              <h3 className="text-4xl font-semibold text-zinc-800">
                {clientRP}
              </h3>
              <p className="text-sm font-normal text-zinc-500">
                Client’s Project Budget
              </p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph
                fillPercentage={clientUsedPercentage}
                emptyPercentage={clientEmptyPercentage}
                fillLabel={" "}
                fillColor="#FD850A"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RpUtilization;
