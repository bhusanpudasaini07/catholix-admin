import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { FC, useState } from "react";
import UtilizationSankey from "./utilization-sankey";
import MarketResource from "./market-resource";
import { IProject } from "@/interface/team-lead-report-interface";
import {
  changeNumberFormat,
  hourTimeFormatter,
  timeFormatter,
} from "@/shared/utils/rp-utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import UtilizationSunburst from "./utilizarion-sunbrust";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useRouter } from "next/router";

interface UtilizationData {
  available_rp: number;
  commercial_rp: number;
  inhouse_rp: number;
  available_time: number;
  commercial_time: number;
  inhouse_time: number;
  total_time: number;
  all_projects_count: number;
  commercial_projects_count: number;
  inhouse_projects_count: number;
  total_rp: number;
}

interface IProps {
  data: UtilizationData;
  projects: IProject[];
}
const UtilizationSummary: FC<IProps> = ({ data, projects }) => {
  const router = useRouter();
  const current_id = router.query?.lead_id || "all";
  const [chart, setChart] = useState<string>("sankey");
  const [tab, setTab] = useState<string>("budget");
  const available = data?.available_rp;
  const spent = ((data?.commercial_rp ?? 0) + (data?.inhouse_rp ?? 0)).toFixed(
    2
  );
  const loss = (available - parseFloat(spent)).toFixed(2);
  const lossPercentage = ((parseFloat(loss) / available) * 100).toFixed(1);
  const spentPercentage = ((parseFloat(spent) / available) * 100).toFixed(1);

  const lossTime = data?.available_time - data?.total_time;
  const spentTimePercentage = (
    (data?.total_time / data?.available_time) *
    100
  ).toFixed(1);
  const lossTimePercentage = ((lossTime / data?.available_time) * 100).toFixed(
    1
  );
  return (
    <Card className="col-span-2">
      <CardContent>
        <div className="flex gap-7 justify-between items-center mb-4">
          <div className="flex gap-4 justify-start items-center">
            <p className="text-lg font-medium text-zinc-700">
              Utilization Summary
            </p>
            <Button
              onClick={() =>
                router.push(
                  `/team-leads/lead-report/trending-graph?lead_id=${current_id}`
                )
              }
              variant={"white"}
              size={"sm"}
            >
              View Trendline
            </Button>
          </div>
          <div className="flex justify-end items-center gap-2">
            <Select onValueChange={(value) => setChart(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sankey Chart" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="sankey">Sankey Chart</SelectItem>
                  <SelectItem value="sunburst">Sunburst Chart</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Tabs
              defaultValue="budget"
              onValueChange={(value) => setTab(value)}
              className=""
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="budget">Budget Utilization</TabsTrigger>
                <TabsTrigger value="time">Time Utilization</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="flex flex-col gap-4 justify-center items-center">
            <Card className="w-full bg-slate-50 border-slate-200">
              <CardContent>
                <p className="mb-3 text-base font-medium text-zinc-700">
                  Budget Utilization
                </p>
                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <div className="">
                    <p className="flex mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#5470C6] before:me-2">
                      Available {tab === "budget" ? "Budget" : "Time"}
                    </p>
                    <div className="ms-[18px] flex items-center">
                      <p className="text-3xl font-medium text-zinc-700">
                        {tab === "budget"
                          ? changeNumberFormat(Math.round(available))
                          : hourTimeFormatter(data?.available_time)}
                      </p>
                    </div>
                  </div>
                  <div className="]">
                    <p className="flex justify-start mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#91CC75] before:me-2">
                      Spent {tab === "budget" ? "Budget" : "Time"}
                    </p>
                    <div className="ms-[18px] flex items-center">
                      <p className="text-3xl font-medium text-zinc-700">
                        {tab === "budget"
                          ? changeNumberFormat(Math.round(Number(spent)))
                          : hourTimeFormatter(data?.total_time)}
                      </p>
                      <p className="text-2xl font-medium text-zinc-500 ms-2">
                        |{" "}
                        {tab === "budget"
                          ? spentPercentage
                          : spentTimePercentage}
                        %
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p className="flex mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#EE6666] before:me-2">
                      Loss {tab === "budget" ? "Budget" : "Time"}
                    </p>
                    <div className="ms-[18px] flex items-center">
                      <p className="text-3xl font-medium text-zinc-700">
                        {tab === "budget"
                          ? changeNumberFormat(Math.round(Number(loss)))
                          : hourTimeFormatter(lossTime)}
                      </p>
                      <p className="text-2xl font-medium text-zinc-500 ms-2">
                        |{" "}
                        {tab === "budget" ? lossPercentage : lossTimePercentage}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <MarketResource data={projects} />
          </div>
          <div>
            {chart === "sankey" ? (
              <UtilizationSankey data={data} tab={tab} />
            ) : (
              <UtilizationSunburst projects={projects} data={data} tab={tab} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UtilizationSummary;
