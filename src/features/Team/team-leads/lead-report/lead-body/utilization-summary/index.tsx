import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { FC } from "react";
import UtilizationSankey from "./utilization-sankey";
import MarketResource from "./market-resource";
import { IProject } from "@/interface/team-lead-report-interface";
import { changeNumberFormat } from "@/shared/utils/rp-utils";

interface UtilizationData {
  available_rp: number;
  commercial_rp: number;
  inhouse_rp: number;
}

interface IProps {
  data: UtilizationData;
  projects: IProject[];
}
const UtilizationSummary: FC<IProps> = ({ data, projects }) => {
  const available = data?.available_rp;
  const spent = ((data?.commercial_rp ?? 0) + (data?.inhouse_rp ?? 0)).toFixed(
    2
  );
  const loss = (available - parseFloat(spent)).toFixed(2);
  const lossPercentage = ((parseFloat(loss) / available) * 100).toFixed(1);
  const spentPercentage = ((parseFloat(spent) / available) * 100).toFixed(1);

  return (
    <Card className="col-span-2">
      <CardContent>
        <div className="flex gap-7 justify-between items-center mb-4">
          <div className="flex gap-6 justify-start items-center">
            <p className="text-lg font-medium text-zinc-700">
              Utilization Summary
            </p>
            <Button variant={"white"} size={"sm"}>
              View Trendline
            </Button>
          </div>
          {/* <div className="">
            <Button variant={"white"} size={"sm"}>
              Dropdown here
            </Button>
          </div> */}
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="flex flex-col gap-4 justify-center items-center">
            <Card className="w-full bg-slate-50 border-slate-200">
              <CardContent>
                <p className="mb-3 text-base font-medium text-zinc-700">
                  Budget Utilization
                </p>
                <div className="flex flex-wrap gap-3 justify-between items-center">
                  <div className="">
                    <p className="flex mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#5470C6] before:me-2">
                      Available Budget
                    </p>
                    <div className="ms-[18px] flex items-center">
                      <p className="text-3xl font-medium text-zinc-700">
                        {changeNumberFormat(Math.round(available))}
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p className="flex mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#91CC75] before:me-2">
                      Spent Budget
                    </p>
                    <div className="ms-[18px] flex items-center">
                      <p className="text-3xl font-medium text-zinc-700">
                        {changeNumberFormat(Math.round(Number(spent)))}
                      </p>
                      <p className="text-2xl font-medium text-zinc-500 ms-2">
                        | {spentPercentage}%
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p className="flex mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#EE6666] before:me-2">
                      Loss Budget
                    </p>
                    <div className="ms-[18px] flex items-center">
                      <p className="text-3xl font-medium text-zinc-700">
                        {changeNumberFormat(Math.round(Number(loss)))}
                      </p>
                      <p className="text-2xl font-medium text-zinc-500 ms-2">
                        | {lossPercentage}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <MarketResource data={projects} />
          </div>
          <div className="">
            <UtilizationSankey data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UtilizationSummary;
