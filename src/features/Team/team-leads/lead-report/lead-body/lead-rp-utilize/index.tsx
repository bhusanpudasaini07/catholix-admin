import React from "react";
import PercentageGraph from "../../../../../../shared/components/percentage-graph";
import { Card, CardContent } from "@/shared/components/ui/card";

const RpUtilization = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start mb-4 gap-7">
          <p className="text-lg font-medium text-zinc-700">RP Utilization</p>
        </div>
        <div className="flex items-center justify-between mt-10 gap-7 flex-wrap">
          <div className="flex items-center justify-center grow gap-6">
            <div className="">
              <h3 className="text-4xl font-semibold text-zinc-800">
                42,632.28
              </h3>
              <p className="text-sm font-normal text-zinc-500">Overall RP</p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph fillPercentage={43} emptyPercentage={57} />
            </div>
          </div>
          <div className="flex items-center justify-center grow gap-6">
            <div className="">
              <h3 className="text-4xl font-semibold text-zinc-800">
                42,632.28
              </h3>
              <p className="text-sm font-normal text-zinc-500">
                Client’s Project RP
              </p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph
                fillPercentage={43}
                emptyPercentage={57}
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
