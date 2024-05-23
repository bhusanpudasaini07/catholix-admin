import React, { FC, useState } from "react";
import StaffUtilizationSankey from "./utilization-sankey";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { changeNumberFormat, hourTimeFormatter } from "@/shared/utils/rp-utils";

interface StaffUtilizationData {
  available_rp: number;
  available_time: number;
  client_rp: number;
  client_time: number;
  total_rp: number;
  total_time: number;
}

interface IProps {
  data: StaffUtilizationData;
}
const UtilizationSummary: FC<IProps> = ({ data }) => {
  const [tab, setTab] = useState<string>("budget");
  const loss_time = (data?.available_time - data?.total_time).toFixed(2);
  const loss_rp = (data?.available_rp - data?.total_rp).toFixed(2);

  const lossRpPercentage = (
    (parseFloat(loss_rp) / data?.available_rp) *
    100
  ).toFixed(1);
  const lossTimePercentage = (
    (parseFloat(loss_time) / data?.available_time) *
    100
  ).toFixed(1);
  const spentRpPercentage = (
    (data?.total_rp / data?.available_rp) *
    100
  ).toFixed(1);
  const spentTimePercentage = (
    (data?.total_time / data?.available_time) *
    100
  ).toFixed(1);
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center gap-2">
          <div className="">zxc</div>
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
        <div className="grid grid-cols-2 gap-4 ">
          <div className="">
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
                          ? changeNumberFormat(Math.round(data?.available_rp))
                          : hourTimeFormatter(data?.available_time)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="flex justify-start mb-2 before:content-[''] before:h-[24px] before:w-[8px] before:block before:bg-[#91CC75] before:me-2">
                      Spent {tab === "budget" ? "Budget" : "Time"}
                    </p>
                    <div className="ms-[18px] flex items-center">
                      <p className="text-3xl font-medium text-zinc-700">
                        {tab === "budget"
                          ? changeNumberFormat(
                              Math.round(Number(data?.total_rp))
                            )
                          : hourTimeFormatter(data?.total_time)}
                      </p>
                      <p className="text-2xl font-medium text-zinc-500 ms-2">
                        |{" "}
                        {tab === "budget"
                          ? spentRpPercentage
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
                          ? changeNumberFormat(Math.round(Number(loss_rp)))
                          : hourTimeFormatter(Number(loss_time))}
                      </p>
                      <p className="text-2xl font-medium text-zinc-500 ms-2">
                        |{" "}
                        {tab === "budget"
                          ? lossRpPercentage
                          : lossTimePercentage}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <StaffUtilizationSankey data={data} tab={tab} />
        </div>
        {/* <StaffUtilizationSunburst data={data} tab={""} /> */}
      </CardContent>
    </Card>
  );
};

export default UtilizationSummary;
