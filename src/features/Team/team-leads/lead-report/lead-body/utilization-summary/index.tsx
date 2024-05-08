import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { FC } from "react";
import UtilizationSankey from "./utilization-sankey";
import MarketResource from "./market-resource";
import { IProject } from "@/interface/team-lead-report-interface";

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
        <div className="flex items-center justify-between mb-4 gap-7">
          <div className="flex items-center justify-start gap-6">
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
          <div className=" flex justify-center items-center gap-4 flex-col">
            <Card className="bg-slate-50 border-slate-200 w-full">
              <CardContent>
                <p className="text-zinc-700 text-base font-medium mb-3">
                  Budget Utilization
                </p>
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div className="">
                    <p className="flex mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#5470C6] before:me-2">
                      Available Budget
                    </p>
                    <div className="ms-[18px] flex items-center">
                      <p className="text-zinc-700 text-3xl font-medium">
                        {available}
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p className="flex mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#91CC75] before:me-2">
                      Spent Budget
                    </p>
                    <div className="ms-[18px] flex items-center">
                      <p className="text-zinc-700 text-3xl font-medium">
                        {spent}
                      </p>
                      <p className="text-zinc-500 text-2xl font-medium ms-2">
                        | {spentPercentage}%
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p className="flex mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#EE6666] before:me-2">
                      Loss Budget
                    </p>
                    <div className="ms-[18px] flex items-center">
                      <p className="text-zinc-700 text-3xl font-medium">
                        {loss}
                      </p>
                      <p className="text-zinc-500 text-2xl font-medium ms-2">
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
