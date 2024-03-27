import React, { FC } from "react";

import PercentageGraph from "@/shared/components/percentage-graph";
import { Card, CardContent } from "@/shared/components/ui/card";
import { changeNumberFormat } from "@/shared/utils/rp-utils";

interface IProps {
  spentBudget: string | number | undefined | null;
  clientBudgetPercentage: string | number | undefined | null;
  clientEmptyPercentage: string | number | undefined | null;
  clientBudget: string | number | undefined | null;
  spentBudgetPercentage: string | number | undefined | null;
  emptyBudgetPercentage: string | number | undefined | null;
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
          <div className="flex items-center gap-6 grow">
            <div className="">
              <h3 className="text-4xl font-semibold text-zinc-800">
                {changeNumberFormat(Number(spentBudget))}
              </h3>
              <p className="text-sm font-normal text-zinc-500">
                Overall Budget
              </p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph
                fillColor={"#22C55E"}
                fillPercentage={spentBudgetPercentage}
                fillLabel={" "}
                emptyPercentage={emptyBudgetPercentage}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 grow">
            <div className="">
              <h3 className="text-4xl font-semibold text-zinc-800">
                {changeNumberFormat(Number(clientBudget))}
              </h3>
              <p className="text-sm font-normal text-zinc-500">
                Client’s Project Budget
              </p>
            </div>
            <div className=" min-w-[120px]">
              <PercentageGraph
                fillColor="#22C55E"
                fillPercentage={clientBudgetPercentage}
                emptyPercentage={clientEmptyPercentage}
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
