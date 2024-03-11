import React, { FC } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { calculateUsedAndUnusedRpPercentage } from "@/shared/utils/rp-utils";
import PercentageGraph from "@/shared/components/percentage-graph";
interface IProps {
  spentBudget: string;
  clientBudgetPercentage: string;
  clientEmptyPercentage: string;
  clientBudget: string;
  spentBudgetPercentage: string;
  emptyBudgetPercentage: string;
}
const BudgetUtilization: FC<IProps> = ({
  spentBudget,
  spentBudgetPercentage,
  emptyBudgetPercentage,
  clientBudget,
  clientBudgetPercentage,
  clientEmptyPercentage,
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
                {spentBudget}
              </h3>
              <p className="text-sm font-normal text-zinc-500">
                Overall Budget
              </p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph
                fillColor="#22C55E"
                fillPercentage={"30"}
                fillLabel={" "}
                emptyPercentage={"70"}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 grow">
            <div className="">
              <h3 className="text-4xl font-semibold text-zinc-800">
                {clientBudget}
              </h3>
              <p className="text-sm font-normal text-zinc-500">
                Client’s Project Budget
              </p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph
                fillColor="#22C55E"
                fillPercentage={"40"}
                emptyPercentage={"60"}
                fillLabel={" "}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetUtilization;
